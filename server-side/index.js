const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 5000;

// middleware
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

const SSLCommerzPayment = require("sslcommerz-lts");
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASS;
const is_live = false; //true for live, false for sandbox

const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res
      .status(401)
      .send({ error: true, message: "unauthorized access" });
  }
  // bearer token
  const token = authorization.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ error: true, message: "unauthorized access" });
    }
    req.decoded = decoded;
    next();
  });
};

// Distance Calculator Function
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;

  const lat1Rad = (lat1 * Math.PI) / 180;
  const lon1Rad = (lon1 * Math.PI) / 180;
  const lat2Rad = (lat2 * Math.PI) / 180;
  const lon2Rad = (lon2 * Math.PI) / 180;

  const deltaLat = lat2Rad - lat1Rad;
  const deltaLon = lon2Rad - lon1Rad;

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;

  return distance;
}

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { addMinutes, format, isTomorrow } = require("date-fns");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8vqv4om.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const database = client.db("airbliss");
    const flightsCollection = database.collection("flights");
    const bookingsCollection = database.collection("bookings");
    const seatsCollection = database.collection("seats");
    const usersCollection = database.collection("users");

    app.post("/jwt", (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });

      res.send({ token });
    });

    // Flights Get
    app.get("/flights", async (req, res) => {
      const result = await flightsCollection.find().toArray();
      res.send(result);
    });

    app.get("/flights", async (req, res) => {
      const result = await flightsCollection.find().toArray();
      res.send(result);
    });

    app.post("/add_flight/:id", async (req, res) => {
      const id = req.params.id;
      const formAirportCode = req.query.airportCode;
      const newFlightObject = req.body;

      try {
        const findFlight = await flightsCollection.find().toArray();
        const singleFlight = findFlight.find(
          (flight) => flight._id.toString() === id
        );

        if (!singleFlight) {
          return res.status(404).send("Flight not found");
        }

        if (!(formAirportCode in singleFlight)) {
          return res.status(400).send("Invalid airport code");
        }

        singleFlight[formAirportCode].push(newFlightObject);

        const result = await flightsCollection.updateOne(
          {
            [formAirportCode]: {
              $exists: true,
            },
          },

          { $push: { [formAirportCode]: newFlightObject } } // removed unnecessary template string
        );

        console.log("Single Flight:", singleFlight);

        res.send(result);
      } catch (error) {
        console.error("Error:", error);
        res.status(500).send("An error occurred");
      }
    });

    // Searching Flights using by destination
    app.get("/flights/search", async (req, res) => {
      const { fromCity, toCity, departureDate } = req.query;
      if (!fromCity || !toCity || !departureDate) {
        return res.json("Not found proper url!");
      }
      const flightsResult = [];

      try {
        const fromCityData = await flightsCollection.findOne({
          [fromCity]: { $exists: true },
        });

        const toCityData = await flightsCollection.findOne({
          [toCity]: { $exists: true },
        });

        if (!fromCityData || !toCityData) {
          return res
            .status(404)
            .json({ error: "Flights not found for the specified city code." });
        }

        const relevantFields = [
          "_id",
          "airlineLogo",
          "airlineName",
          "passengerType",
          "stopType",
          "refundableStatus",
          "flightInfo",
          "cancellationRules",
          "dateChangeRules",
          "notes",
        ];

        for (const flight of fromCityData[fromCity]) {
          const relevantFlightData = {};
          for (const field of relevantFields) {
            relevantFlightData[field] = flight[field];
          }

          // Calculate fare summary
          const distance = calculateDistance(
            flight.details.latitude,
            flight.details.longitude,
            toCityData[toCity][0].details.latitude,
            toCityData[toCity][0].details.longitude
          );

          relevantFlightData.duration = parseInt(
            distance * parseFloat(flight.durationPerKm)
          );

          // Include "departure" data from fromCityData
          relevantFlightData.departure = {
            code: flight.details.code,
            time: flight.details.time,
            date: departureDate,
            city: flight.details.city,
            terminal: flight.details.terminal,
            airportName: flight.airportName,
            seats: flight.totalSeats,
          };

          // Include "arrival" data in relevantFlightData
          const departureDateTime = new Date(
            `${departureDate}T${flight.details.time}`
          );
          const arrivalTime = addMinutes(
            departureDateTime,
            relevantFlightData.duration
          );

          if (isTomorrow(arrivalTime)) {
            arrivalTime.setDate(departureDateTime.getDate() + 1);
          }
          relevantFlightData.arrival = {
            code: toCityData[toCity][0].details.code,
            time: format(arrivalTime, "HH:mm"),
            date: format(arrivalTime, "yyyy-MM-dd"),
            city: toCityData[toCity][0].details.city,
            airlineName: toCityData[toCity][0].airlineName,
            terminal: toCityData[toCity][0].details.terminal,
            airportName: toCityData[toCity][0].airportName,
          };
          const amountPerKm = flight.amountPerKm;
          const taxesAndFees = flight.taxesAndFees;

          const baseFare = (amountPerKm * distance).toFixed();
          const calculatedFees = (baseFare * taxesAndFees) / 100;
          const total = (
            parseFloat(baseFare) + parseFloat(calculatedFees)
          ).toFixed();
          relevantFlightData.fareSummary = {
            baseFare: baseFare,
            taxesAndFees: parseFloat(calculatedFees).toFixed(),
            total: total,
          };

          flightsResult.push(relevantFlightData);
        }

        // Respond with the flights data including fare summary
        res.json({ flights: flightsResult });
      } catch (error) {
        console.error("Error in /flights/search:", error);
        res
          .status(500)
          .json({ error: "An error occurred while processing your request." });
      }
    });

    // Store booking info when user successfully books a flight
    async function saveBookingInfoToDatabase(bookingInfo) {
      try {
        const bookingDate = bookingInfo.flight.departureDate;
        const airportCode = bookingInfo.flight.departureAirport;

        // check if the bookingDate exists
        const existingDateEntry = await bookingsCollection.findOne({
          [bookingDate]: { $exists: true },
        });

        if (existingDateEntry) {
          //if the airportCode exists in the existingDateEntry
          if (existingDateEntry[bookingDate][airportCode]) {
            // if the airportCode exists then push the new bookingInfo into the array
            existingDateEntry[bookingDate][airportCode].push(bookingInfo);
          } else {
            // if the airportCode does not exist then create a new array with bookingInfo
            existingDateEntry[bookingDate][airportCode] = [bookingInfo];
          }

          // update the existing entry in the collection
          await bookingsCollection.updateOne(
            { [bookingDate]: { $exists: true } },
            { $set: existingDateEntry }
          );
        } else {
          // if the bookingDate does not exist then create a new entry with bookingInfo
          const newEntry = {
            [bookingDate]: {
              [airportCode]: [bookingInfo],
            },
          };
          await bookingsCollection.insertOne(newEntry);
        }
        console.log("Booking info saved to database.");
      } catch (error) {
        console.error("Error saving booking info to database:", error);
      } finally {
        // Todo----client.close();
      }
    }

    // payment processing API
    app.post("/process-payment", async (req, res) => {
      const bookingInfo = req.body;
      const { user, flight } = bookingInfo;
      const transitionId = `tr${new ObjectId()}`;
      const data = {
        total_amount: parseFloat(flight.fareSummary.total),
        currency: "BDT",
        tran_id: transitionId,
        success_url: `http://localhost:5000/booking-confirmed/${bookingInfo.bookingReference}`,
        fail_url: "http://localhost:5000/booking-failed",
        cancel_url: "http://localhost:5000/booking-cancel",
        ipn_url: "http://localhost:5000/ipn",
        shipping_method: "Air Flights",
        product_name: "Airline Ticket",
        product_category: "Flights Tickets",
        product_profile: "Air Tickets",
        cus_name: `${user.first_name} ${user.last_name}`,
        cus_email: user.traveler_email,
        cus_add1: "none",
        cus_add2: "none",
        cus_city: "none",
        cus_state: "none",
        cus_postcode: "none",
        cus_country: user.country,
        cus_phone: user.phone_number,
        cus_fax: "none",
        ship_name: "none",
        ship_add1: "none",
        ship_add2: "none",
        ship_city: "none",
        ship_state: "none",
        ship_postcode: "none",
        ship_country: "none",
      };

      const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
      sslcz
        .init(data)
        .then((apiResponse) => {
          let GatewayPageURL = apiResponse.GatewayPageURL;
          res.send({ paymentUrl: GatewayPageURL });
        })
        .then(async () => {
          bookingInfo.transitionId = transitionId;
          bookingInfo.paymentStatus = "paid";
        });
      app.post("/booking-confirmed/:bookingId", async (req, res) => {
        await saveBookingInfoToDatabase(bookingInfo);
        res.redirect(
          `http://localhost:5173/booking-confirmed/${req.params.bookingId}`
        );
      });
    });

    // get user booking information
    app.get("/bookings/:bookingReference", async (req, res) => {
      const bookingReference = req.params.bookingReference;

      try {
        const bookings = await bookingsCollection.find().toArray();

        let foundBooking = null;

        for (const booking of bookings) {
          for (const dateKey in booking) {
            const airportCodes = booking[dateKey];
            for (const airportCodeKey in airportCodes) {
              const bookingsForAirport = airportCodes[airportCodeKey];
              const foundBookingObj = bookingsForAirport.find(
                (bookingObj) => bookingObj.bookingReference === bookingReference
              );
              if (foundBookingObj) {
                foundBooking = foundBookingObj;
                break;
              }
            }
            if (foundBooking) {
              break;
            }
          }
          if (foundBooking) {
            break;
          }
        }

        if (foundBooking) {
          res.json(foundBooking);
        } else {
          res.status(404).json({ message: "Booking not found" });
        }
      } catch (err) {
        console.error("Error fetching booking:", err);
        res.status(500).json({ error: "An error occurred" });
      }
    });

    // get all bookings
    app.get("/bookings", async (req, res) => {
      const result = await bookingsCollection.find().toArray();
      res.send(result);
    });

    app.post("/addNewFlights", async (req, res) => {
      const airportCode = req.body.airportCode;
      const newFlights = req.body.newFlights;

      try {
        // Check exists airport
        const existingAirport = await flightsCollection.findOne({
          [airportCode]: { $exists: true },
        });

        if (existingAirport) {
          // Add new flights in existing airport
          const result = await flightsCollection.updateOne(
            { [airportCode]: { $exists: true } },
            { $push: { [airportCode]: { $each: newFlights } } }
          );

          client.close();

          if (result.modifiedCount > 0) {
            res
              .status(200)
              .json({ message: "New flights added successfully." });
          } else {
            res.status(400).json({ message: "Failed to add new flights." });
          }
        } else {
          res.status(404).json({ message: "Airport code not found." });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
      }
    });

    // Save user
    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log(user);
      const query = { email: user.email };
      const existingUser = await usersCollection.findOne(query);
      console.log(existingUser, "existing user");
      if (existingUser) {
        return res.send({ message: "User already exists" });
      }
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    // get users
    app.get("/users", async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    app.patch("/users/:id", async (req, res) => {
      const id = req.params.id;
      const usersData = req.body.usersData; // No need for req.body.usersData

      console.log(usersData);

      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          ...usersData,
        },
      };
      const result = await usersCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 0 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("AirBliss Server is running..");
});

app.listen(port, () => {
  console.log(`AirBliss is running on port ${port}`);
});
