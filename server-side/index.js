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
    const bookingsManageCollection = database.collection("bookingsManage");
    const insuranceCollection = database.collection("insurance");
    const residualCollection = database.collection("residualBookings");
    const servicesCollection = database.collection("services");
    const specialDiscountCollection = database.collection("specialDiscount");
    const accordionData = database.collection("whyAirbliss");

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

    // API for Our Services
    app.get("/services", async (req, res) => {
      const result = await servicesCollection.find().toArray();
      res.send(result);
    });

    // API for Why choose Airbliss accordion Data
    app.get("/whyairbliss", async (req, res) => {
      const result = await accordionData.find().toArray();
      res.send(result);
    });

    app.get("/single_flights/:id", async (req, res) => {
      const id = req.params.id;
      const formAirportCode = req.query.airportCode;
      const findFlight = await flightsCollection.find().toArray();
      const singleFlight = findFlight.find(
        (flight) => flight._id.toString() === id
      );
      // const result = await flightsCollection.find().toArray();
      // res.send(result);
    });

    // Add Flight Api
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

        res.send(result);
      } catch (error) {
        console.error("Error:", error);
        res.status(500).send("An error occurred");
      }
    });

    // Manage Flight Api ========================================
    app.get("/manageAllFlights/:airportCode/:id", async (req, res) => {
      const { id, airportCode } = req.params;

      try {
        const findFlight = await flightsCollection.find().toArray();
        const singleFlight = findFlight.find(
          (flight) => flight._id.toString() === id
        );

        if (singleFlight && singleFlight[airportCode]) {
          const airportData = singleFlight[airportCode];
          res.send(airportData);
        } else {
          res.status(404).send("Airport data not found");
        }
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    });

    app.put("/update/:airportCode/:airportId/:flightId", async (req, res) => {
      try {
        const { airportCode, airportId, flightId } = req.params;
        const updateData = req.body;

        const airport = await flightsCollection.findOne({
          _id: airportId,
        });

        if (!airport) {
          return res.status(404).json({ message: "Airport not found" });
        }

        const flightIndex = airport[airportCode].findIndex(
          (flight) => flight._id === flightId
        );

        if (flightIndex === -1) {
          return res.status(404).json({ message: "Flight not found" });
        }

        const dynamicField = `${airportCode}`;

        airport[dynamicField][flightIndex].airportName = updateData.airportName;
        airport[dynamicField][flightIndex].airlineName = updateData.airlineName;
        airport[dynamicField][flightIndex].amountPerKm = updateData.amountPerKm;
        airport[dynamicField][flightIndex].taxesAndFees =
          updateData.taxesAndFees;
        airport[dynamicField][flightIndex].totalSeats = updateData.totalSeats;
        airport[dynamicField][flightIndex].airlineStatus =
          updateData.airlineStatus;
        airport[dynamicField][flightIndex].durationPerKm =
          updateData.durationPerKm;

        airport[dynamicField][flightIndex].flightInfo.aircraft =
          updateData.aircraft;
        airport[dynamicField][flightIndex].flightInfo.flightNumber =
          updateData.flightNumber;
        airport[dynamicField][flightIndex].flightInfo.baggage =
          updateData.baggage;
        airport[dynamicField][flightIndex].flightInfo.baggage =
          updateData.baggage;
        airport[dynamicField][flightIndex].flightInfo.checkIn =
          updateData.checkIn;
        airport[dynamicField][flightIndex].flightInfo.cabin = updateData.cabin;

        airport[dynamicField][flightIndex].details.code = updateData.code;
        airport[dynamicField][flightIndex].details.time = updateData.time;
        airport[dynamicField][flightIndex].details.latitude =
          updateData.latitude;
        airport[dynamicField][flightIndex].details.longitude =
          updateData.longitude;

        airport[dynamicField][flightIndex].dateChangeRules[0].amountPerKm =
          updateData.dateAmountPerKm;
        airport[dynamicField][flightIndex].cancellationRules[0].amountPerKm =
          updateData.cancelAmountPerKm;

        await flightsCollection.updateOne(
          {
            _id: airportId,
            [dynamicField + "._id"]: flightId,
          },
          { $set: airport }
        );

        console.log(airport);

        return res.status(200).json(airport);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
    });

    // ######################## Flights Search Methods #########################

    // Generate seat data model for specific flight
    async function generateSeatData(totalSeats, flightId, bookingDate) {
      // Check if the flightId already exists for the given date
      const existingDateEntry = await seatsCollection.findOne({
        [bookingDate]: { $elemMatch: { flightId: flightId } },
      });

      if (existingDateEntry) {
        console.log(
          `Seats for flight ${flightId} on ${bookingDate} already exist.`
        );
        return;
      }

      const rows = ["A", "B"];
      const seatsPerRow = Math.floor(totalSeats / rows.length);
      const remainderSeats = totalSeats % rows.length;

      const seatData = {
        flightId: flightId,
        totalSeat: totalSeats,
        available: totalSeats,
        seats: [],
      };

      let seatCounter = 0;

      for (let row of rows) {
        const rowSeats = seatsPerRow + (seatCounter < remainderSeats ? 1 : 0);

        for (let seatNumber = 1; seatNumber <= rowSeats; seatNumber++) {
          const seatNo = `${row}${seatNumber}`;

          seatData.seats.push({
            seatNo: seatNo,
            available: true,
          });

          seatCounter++;
        }
      }

      // Add the new seat data to the appropriate date
      const updateQuery = {
        $push: {
          [bookingDate]: seatData,
        },
      };

      await seatsCollection.updateOne({}, updateQuery, { upsert: true });
      console.log(
        `New seat data generated for flight ${flightId} on ${bookingDate}.`
      );
      // get available seat from this function
      return await availableSeats(flightId, bookingDate);
    }

    // find available seat for specific flight
    async function availableSeats(flightId, bookingDate) {
      try {
        const query = {};
        query[bookingDate] = { $exists: true };
        const flightsData = await seatsCollection.findOne(query);

        if (flightsData) {
          const flightInfo = flightsData[bookingDate].find(
            (flight) => flight.flightId === flightId
          );

          if (flightInfo) {
            return flightInfo;
          } else {
            console.log(
              "Flight not found for the given flightId and bookingDate."
            );
            return;
          }
        } else {
          console.log("No data found for the given bookingDate.");
          return;
        }
      } catch (error) {
        console.error("Error fetching available seats:", error);
        throw error;
      }
    }

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
          // check running flight
          if (flight.airlineStatus !== "running") {
            continue;
          }
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
          // get available seat for specific flight
          const availableSeat =
            (await availableSeats(flight._id, departureDate)) ||
            (await generateSeatData(
              flight.totalSeats,
              flight._id,
              departureDate
            ));
          relevantFlightData.availableSeats = availableSeat;

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

    // ###################################### Flight Booking Methods #########################################
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
      } catch (error) {
        console.error("Error saving booking info to database:", error);
      } finally {
        // Todo----client.close();
      }
    }

    // Select available seat form seat collection
    async function selectAvailableSeat(flightId, bookingDate, seatNo) {
      try {
        const query = {};
        query[bookingDate] = { $exists: true };
        const flightsData = await seatsCollection.findOne(query);

        if (!flightsData) {
          throw new Error("Flights not found for the specified date.");
        }

        const flightsOnDate = flightsData[bookingDate];
        const flightIndex = flightsOnDate.findIndex(
          (f) => f.flightId === flightId
        );

        if (flightIndex === -1) {
          throw new Error("Flight not found for the specified flightId.");
        }

        const flight = flightsOnDate[flightIndex];
        const seatIndex = flight.seats.findIndex(
          (seat) => seat.seatNo === seatNo
        );

        if (seatIndex === -1 || !flight.seats[seatIndex].available) {
          throw new Error("Seat not found or already booked.");
        }

        // Decrease available seat count for the flight
        flight.available--;

        // Mark the seat as unavailable
        flight.seats[seatIndex].available = false;

        // Update the seat availability and available seat count in the database
        await seatsCollection.updateOne(
          {
            _id: flightsData._id,
            [bookingDate]: { $elemMatch: { flightId: flightId } },
          },
          {
            $set: {
              [`${bookingDate}.$[flight].seats.${seatIndex}.available`]: false,
              [`${bookingDate}.$[flight].available`]: flight.available,
            },
          },
          {
            arrayFilters: [{ "flight.flightId": flightId }],
          }
        );

        return seatNo;
      } catch (error) {
        throw error;
      }
    }

    // payment processing API
    app.post("/process-payment", async (req, res) => {
      const bookingInfo = req.body;
      const { user, flight, insurance } = bookingInfo;

      const transitionId = `tr${new ObjectId()}`;
      // generate insurance information
      function generatePolicyNumber() {
        const prefix = "policy";
        const timestamp = Date.now().toString();
        const randomPart = Math.random().toString(36).substring(2, 8);
        const policyNumber = `${prefix}${timestamp}${randomPart}`;
        return policyNumber;
      }
      let insurancePolicy;
      if (insurance) {
        insurancePolicy = {
          policyNumber: generatePolicyNumber(),
          policyType: "Travel",
          startDate: flight.departureDate,
          endDate: flight.arrivalDate,
          claimedStatus: null,
          policyPremium: (
            0.05 * parseFloat(flight.fareSummary.total)
          ).toFixed(),
          coverageDetails: {
            tripCancellation: true,
            delayedFlight: true,
            lostLuggage: true,
            medicalCoverage: true,
          },
          claimedInsurance: {
            tripCancellation: { isClaimed: false, claimedPrice: 0 },
            delayedFlight: { isClaimed: false, claimedPrice: 0 },
            lostLuggage: { isClaimed: false, claimedPrice: 0 },
            medicalCoverage: { isClaimed: false, claimedPrice: 0 },
          },
        };
      } else {
        insurancePolicy = "Without Insurance";
      }
      // generate total amount value
      let totalAmount;
      if (insurance) {
        const baseFare = parseFloat(flight.fareSummary.total);
        const policyPremium = 0.05 * baseFare;
        totalAmount = (baseFare + policyPremium).toFixed();
      } else {
        totalAmount = parseFloat(flight.fareSummary.total);
      }

      // Backend Data

      const data = {
        total_amount: totalAmount,
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
          const { totalSeat, flightId, flight } = bookingInfo;
          bookingInfo.transitionId = transitionId;
          bookingInfo.paymentStatus = "paid";
          bookingInfo.bookingStatus = "confirmed";
          bookingInfo.requestStatus = "success";
          bookingInfo.insurancePolicy = insurancePolicy;
          bookingInfo.createdAt = new Date();

          await selectAvailableSeat(
            flightId,
            flight?.departureDate,
            user?.seatNo
          );

          // save booking information bookings database
          await saveBookingInfoToDatabase(bookingInfo);

          // save insurance information in insurance database
          if (insurance) {
            delete bookingInfo.insurance; // Delete insurance checking field
            delete bookingInfo?.insurancePolicy; // Delete insurance checking field
            const insuranceInfo = {
              ...insurancePolicy,
              bookingInfo,
            };
            await insuranceCollection.insertOne(insuranceInfo);
          }
        });
      app.post("/booking-confirmed/:bookingId", async (req, res) => {
        res.redirect(
          `http://localhost:5173/booking-confirmed/${req.params.bookingId}`
        );
      });
    });

    // ################### Booking Cancel/Refund Request ####################
    const addBookingOperation = async (bookingInfo, feedback) => {
      const newBookingStatus = "cancel";
      const newRequestStatus = "pending";
      const currentDateTime = format(new Date(), "yyyy-MM-dd HH:mm:ss");
      bookingInfo.bookingStatus = newBookingStatus;
      bookingInfo.requestStatus = newRequestStatus;

      const reqBookingInfo = {
        reqTime: currentDateTime,
        feedback: feedback,
        bookingInfo: bookingInfo,
      };

      try {
        const result = await bookingsManageCollection.insertOne(reqBookingInfo);
        if (result.insertedCount === 1) {
          return { message: "Booking operation added successfully" };
        } else {
          return { error: "Failed to add booking operation" };
        }
      } catch (err) {
        console.error("Error adding booking operation:", err);
        return { error: "An error occurred" };
      }
    };

    // Booking refund/cancel request (USER)
    app.patch(
      "/bookings/cancel/:date/:airportCode/:bookingReference",
      async (req, res) => {
        const date = req.params.date;
        const airportCode = req.params.airportCode;
        const bookingReference = req.params.bookingReference;
        const newBookingStatus = "cancel";
        const newRequestStatus = "pending";

        try {
          const path = `${date}.${airportCode}`;

          const result = await bookingsCollection.updateOne(
            {
              [path]: {
                $elemMatch: { bookingReference: bookingReference },
              },
            },
            {
              $set: {
                [path + ".$.bookingStatus"]: newBookingStatus,
                [path + ".$.requestStatus"]: newRequestStatus,
              },
            }
          );

          if (result.modifiedCount === 1) {
            // Call the addBookingOperation function here
            const { message, error } = await addBookingOperation(
              req.body.bookingInfo,
              req.body.feedback
            );

            if (error) {
              res.status(500).json({
                error: "An error occurred while adding booking operation",
              });
            } else {
              res.json({
                message: "Booking status updated successfully",
                bookingOperationMessage: message,
              });
            }
          } else {
            // If the document with the specified bookingReference was not found
            res.status(404).json({ message: "Booking not found" });
          }
        } catch (err) {
          console.error("Error updating booking status:", err);
          res.status(500).json({ error: "An error occurred" });
        }
      }
    );

    // Manage refund flight request (ADMIN)
    app.patch(
      "/refund/:status/:date/:airportCode/:bookingReference",
      async (req, res) => {
        const status = req.params.status;
        const date = req.params.date;
        const airportCode = req.params.airportCode;
        const bookingReference = req.params.bookingReference;
        const newBookingStatus = "cancel";
        let newRequestStatus;
        if (status === "approved") {
          newRequestStatus = "approved";
        } else {
          newRequestStatus = "denied";
        }

        try {
          const path = `${date}.${airportCode}`;

          // Define the updateObject for $set operation
          const updateObject = {
            $set: {
              [path + ".$.bookingStatus"]: newBookingStatus,
              [path + ".$.requestStatus"]: newRequestStatus,
            },
          };

          // If the status is "denied," add the "deniedFeedback" field
          if (status === "denied") {
            updateObject.$set[path + ".$.deniedFeedback"] = req.body.feedback;
          }

          // Update the booking document in bookingsCollection
          const result = await bookingsCollection.updateOne(
            {
              [path]: {
                $elemMatch: { bookingReference: bookingReference },
              },
            },
            updateObject
          );

          if (result.modifiedCount === 1) {
            // Update the booking status and request status in bookingsManageCollection
            const updateBookingManageObject = {
              $set: {
                bookingStatus: newBookingStatus,
                requestStatus: newRequestStatus,
              },
            };

            // If the status is "denied," add the "deniedFeedback" field to bookingsManageCollection
            if (status === "denied") {
              updateBookingManageObject.$set.deniedFeedback = req.body.feedback;
            }

            await bookingsManageCollection.updateOne(
              { bookingId: bookingReference },
              updateBookingManageObject
            );

            res.json({
              message: "Booking status updated successfully",
            });
          } else {
            // If the document with the specified bookingReference was not found
            res.status(404).json({ message: "Booking not found" });
          }
        } catch (err) {
          console.error("Error updating booking status:", err);
          res.status(500).json({ error: "An error occurred" });
        }
      }
    );

    //^ ################### Insurance System ####################
    // request to insurance premium //*(USER)
    app.patch(
      "/insuranceClaim/:date/:airportCode/:bookingReference",
      async (req, res) => {
        const date = req.params.date;
        const airportCode = req.params.airportCode;
        const bookingReference = req.params.bookingReference;
        const claimDoc = req.body.insuranceData;

        try {
          const path = `${date}.${airportCode}`;

          const result = await bookingsCollection.updateOne(
            {
              [path]: {
                $elemMatch: { bookingReference: bookingReference },
              },
            },
            {
              $set: {
                [path + ".$.insurancePolicy.claimedStatus"]: "pending",
                [path + ".$.insurancePolicy.requestedClaimInfo"]: claimDoc,
              },
            }
          );

          // update insurance database
          if (result.modifiedCount === 1) {
            await insuranceCollection.updateOne(
              { "bookingInfo.bookingReference": bookingReference },
              {
                $set: {
                  requestedClaimInfo: claimDoc,
                  claimedStatus: "pending",
                },
              }
            );
          } else if (result.matchedCount === 1) {
            res.status(404).json({ error: "You have already requested" });
          } else {
            // If the document with the specified bookingReference was not found
            res.status(404).json({ message: "Insurance policy not found" });
          }
        } catch (err) {
          console.error("Error updating booking status:", err);
          res.status(500).json({ error: "An error occurred" });
        }
      }
    );

    // manage insurance claim request //* (ADMIN)
    app.patch(
      "/insuranceClaimRequest/:status/:date/:airportCode/:bookingReference",
      async (req, res) => {
        const status = req.params.status;
        const date = req.params.date;
        const airportCode = req.params.airportCode;
        const bookingReference = req.params.bookingReference;
        const premiumUpdateInfo = req.body.insuranceData;
        const premiumType = premiumUpdateInfo?.premiumType;

        let newStatus = "denied";
        let isPremiumStatus = false;
        let claimedAmount = 0;
        let feedback = premiumUpdateInfo?.deniedFeedback;
        if (status === "approved") {
          newStatus = status;
          isPremiumStatus = true;
          claimedAmount = premiumUpdateInfo?.claimedAmount;
        }

        try {
          const path = `${date}.${airportCode}`;

          const updateQuery = {
            [path]: {
              $elemMatch: { bookingReference: bookingReference },
            },
          };

          const updateFields = {
            $set: {
              [path + ".$.insurancePolicy.claimedStatus"]: newStatus,
              [path +
              `.$.insurancePolicy.claimedInsurance.${premiumType}.claimedPrice`]:
                claimedAmount,
              [path +
              `.$.insurancePolicy.claimedInsurance.${premiumType}.isClaimed`]:
                isPremiumStatus,
            },
          };

          // Check if status is "denied" and add feedback field if needed
          if (status === "denied") {
            updateFields.$set[path + `.$.insurancePolicy.deniedFeedback`] =
              feedback;
          }

          const result = await bookingsCollection.updateOne(
            updateQuery,
            updateFields
          );
          // Construct the update object for the insuranceCollection
          const insuranceUpdate = {
            claimedStatus: newStatus,
          };

          if (premiumType) {
            insuranceUpdate[`claimedInsurance.${premiumType}.claimedPrice`] =
              claimedAmount;
            insuranceUpdate[`claimedInsurance.${premiumType}.isClaimed`] =
              isPremiumStatus;
          }

          if (feedback !== null) {
            insuranceUpdate.deniedFeedback = feedback;
          }

          if (result.modifiedCount === 1) {
            await insuranceCollection.updateOne(
              { "bookingInfo.bookingReference": bookingReference },
              { $set: insuranceUpdate }
            );
            res.status(200).json({ message: "Insurance policy updated" });
          } else if (result.matchedCount === 1) {
            res.status(404).json({ error: "You have already requested" });
          } else {
            // If the document with the specified bookingReference was not found
            res.status(404).json({ message: "Insurance policy not found" });
          }
        } catch (err) {
          console.error("Error updating booking status:", err);
          res.status(500).json({ error: "An error occurred" });
        }
      }
    );

    // Get all insurance bookings
    app.get("/allInsurance", async (req, res) => {
      const result = await insuranceCollection.find().toArray();
      res.send(result);
    });

    // ######################### Booking Residual #########################
    // Reusable specific seat value update function
    async function updateSeatAvailability(
      flightDate,
      flightId,
      seatNo,
      available
    ) {
      try {
        const updateResult = await seatsCollection.updateOne(
          {
            [flightDate]: {
              $elemMatch: {
                flightId: flightId,
                "seats.seatNo": seatNo,
                "seats.available": true,
              },
            },
          },
          {
            $set: {
              [`${flightDate}.$[flight].seats.$[seat].available`]: available,
            },
            $inc: {
              [`${flightDate}.$[flight].available`]: available ? 0 : -1, // Decrease available total seats by 1 if available is false
            },
          },
          {
            arrayFilters: [
              { "flight.flightId": flightId },
              { "seat.seatNo": seatNo },
            ],
          }
        );

        return updateResult.nModified > 0;
      } catch (error) {
        throw new Error(error.message);
      }
    }

    // send available seats
    app.get(
      "/rescheduleSeat/:flightId/:totalSeats/:departureDate",
      async (req, res) => {
        const { flightId, departureDate, totalSeats } = req.params;
        const availableSeat =
          (await availableSeats(flightId, departureDate)) ||
          (await generateSeatData(totalSeats, flightId, departureDate));
        if (availableSeat) {
          res.status(200).json({ availableSeat });
        } else {
          res.status(404).json({ message: "No available seats." });
        }
      }
    );

    // reschedule bookings request (USER)
    app.patch(
      "/reschedule/:date/:airportCode/:bookingReference",
      async (req, res) => {
        const { date, airportCode, bookingReference } = req.params;
        const { flightDate, flightId, seatNo } = req.body;
        const rescheduleStatus = "pending";
        const available = false;
        // const seatNo = "A20";

        try {
          // Construct the update query
          const updateQuery = {
            [`${date}.${airportCode}.bookingReference`]: bookingReference,
          };

          // Construct the update fields to set the residualStatus and seatNo
          const updateFields = {
            $set: {
              [`${date}.${airportCode}.$.residualStatus`]: rescheduleStatus,
              [`${date}.${airportCode}.$.user.seatNo`]: seatNo,
              [`${date}.${airportCode}.$.flight.departureDate`]: flightDate,
            },
          };

          // Update the booking with the residualStatus and seatNo
          const result = await bookingsCollection.updateOne(
            updateQuery,
            updateFields
          );

          if (result.modifiedCount === 1) {
            // Fetch the updated booking information after the update
            const updatedBookingInfo = await bookingsCollection.findOne({
              [`${date}.${airportCode}.bookingReference`]: bookingReference,
            });

            // Update seat availability
            await updateSeatAvailability(
              flightDate,
              flightId,
              seatNo,
              available
            );

            // Extract the updated booking info for the specific bookingReference
            const updatedBooking = updatedBookingInfo[date][airportCode].find(
              (booking) => booking.bookingReference === bookingReference
            );

            // Insert the updated booking into the residualCollection
            await residualCollection.insertOne({
              bookingInfo: updatedBooking,
            });

            res.json({
              message: "Booking updated with residualStatus and seatNo",
              updatedBookingInfo: updatedBooking,
            });
          } else {
            res.status(404).json({ message: "Booking not found" });
          }
        } catch (err) {
          console.error("Error updating booking:", err);
          res.status(500).json({ error: "An error occurred" });
        }
      }
    );

    // reschedule request manage (ADMIN)
    app.patch(
      "/rescheduleManage/:status/:date/:airportCode/:bookingReference",
      async (req, res) => {
        const { status, date, airportCode, bookingReference } = req.params;
        let rescheduleStatus = "denied";
        if (status === "approved") {
          rescheduleStatus = status;
        }

        try {
          // Construct the update query for user bookings collection
          const updateQuery = {
            [`${date}.${airportCode}.bookingReference`]: bookingReference,
          };

          // Construct the update fields to set the residualStatus and seatNo
          const updateFields = {
            $set: {
              [`${date}.${airportCode}.$.residualStatus`]: rescheduleStatus,
            },
          };

          // Update the booking with the residualStatus and seatNo
          const result = await bookingsCollection.updateOne(
            updateQuery,
            updateFields
          );

          if (result.modifiedCount === 1) {
            await residualCollection.updateOne(
              { "bookingInfo.bookingReference": bookingReference },
              {
                $set: {
                  "bookingInfo.residualStatus": rescheduleStatus,
                },
              }
            );

            res.json({
              message: "Booking updated with residualStatus",
            });
          } else {
            res.status(404).json({ message: "Booking not found" });
          }
        } catch (err) {
          console.error("Error updating booking:", err);
          res.status(500).json({ error: "An error occurred" });
        }
      }
    );

    // ##################### Get Today's Offer ######################
    app.get("/specialDiscount", async (req, res) => {
      const result = await specialDiscountCollection.find().toArray();
      res.send(result);
    });

    // ######################### Manage Bookings ############################
    // Get all request bookings
    app.get("/bookings-manage", async (req, res) => {
      const result = await bookingsManageCollection.find().toArray();
      res.send(result);
    });

    // #############################################################################
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

    // Get user's all booking by email----------
    app.get("/userBooking/:email", async (req, res) => {
      const traveler_email = req.params.email;
      let myBookings = [];
      try {
        const bookings = await bookingsCollection.find().toArray();

        for (let booking of bookings) {
          for (let dateKey in booking) {
            const airportCodes = booking[dateKey];
            for (let airportCodeKey in airportCodes) {
              const bookingsForAirport = airportCodes[airportCodeKey];
              const foundBookingObj = bookingsForAirport.filter(
                (bookingObj) =>
                  bookingObj.user.traveler_email === traveler_email
              );
              if (foundBookingObj) {
                myBookings = myBookings.concat(foundBookingObj);
              }
            }
          }
        }
        if (myBookings) {
          myBookings.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          res.json(myBookings);
        } else {
          res.status(404).json({ message: "Booking not found" });
        }
      } catch (err) {
        console.error("Error fetching booking:", err);
        res.status(500).json({ error: "An error occurred" });
      }
    });

    // Get all bookings
    app.get("/allBookings", async (req, res) => {
      try {
        const bookings = await bookingsCollection.find().toArray();

        // Initialize an array to store all bookings
        let allBookings = [];

        // Loop through the bookings
        for (let booking of bookings) {
          for (let dateKey in booking) {
            const airportCodes = booking[dateKey];
            for (let airportCodeKey in airportCodes) {
              const bookingsForAirport = airportCodes[airportCodeKey];

              // Check if bookingsForAirport is an array and not empty
              if (
                Array.isArray(bookingsForAirport) &&
                bookingsForAirport.length > 0
              ) {
                // Concatenate the found booking objects to allBookings
                allBookings = allBookings.concat(bookingsForAirport);
              }
            }
          }
        }

        // Check if any bookings were found
        if (allBookings.length > 0) {
          // Sort the bookings by createdAt value
          allBookings.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });

          res.json(allBookings);
        } else {
          res.status(404).json({ message: "No bookings found" });
        }
      } catch (err) {
        console.error("Error fetching booking:", err);
        res.status(500).json({ error: "An error occurred" });
      }
    });

    app.get("/bookings", async (req, res) => {
      const result = await residualCollection.find().toArray();
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
      const query = { email: user.email };
      const existingUser = await usersCollection.findOne(query);
      if (existingUser) {
        return; //res.send({ message: "User already exists" });
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
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          ...usersData,
        },
      };
      const result = await usersCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
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
