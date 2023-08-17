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
    const usersCollection = database.collection("users");
    const bookingsCollection = database.collection("bookings");

    app.post("/jwt", (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });

      res.send({ token });
    });

    // Searching Flights using by destination
    app.get("/flights/search", async (req, res) => {
      const { fromCity, toCity, departureDate } = req.query;
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

          // Include "departure" data from fromCityData
          relevantFlightData.departure = {
            code: fromCityData[fromCity][0].details.code,
            time: fromCityData[fromCity][0].details.time,
            date: departureDate,
            city: fromCityData[fromCity][0].details.city,
            terminal: fromCityData[fromCity][0].details.terminal,
          };
          // Include "arrival" data from toCityData
          relevantFlightData.arrival = {
            code: toCityData[toCity][0].details.code,
            time: toCityData[toCity][0].details.time,
            city: toCityData[toCity][0].details.city,
            airlineName: toCityData[toCity][0].airlineName,
            terminal: toCityData[toCity][0].details.terminal,
          };

          // Calculate fare summary
          const distance = calculateDistance(
            fromCityData[fromCity][0].details.latitude,
            fromCityData[fromCity][0].details.longitude,
            toCityData[toCity][0].details.latitude,
            toCityData[toCity][0].details.longitude
          );

          relevantFlightData.duration = parseInt(
            distance * parseFloat(flight.durationPerKm)
          );

          const amountPerKm = fromCityData[fromCity][0].amountPerKm;
          const taxesAndFees = fromCityData[fromCity][0].taxesAndFees;

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

    // Save user
    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log(user);
      const query = { email: user.email };
      const existingUser = await usersCollection.findOne(query);
      console.log(existingUser, "existing user");
      if (existingUser) {
        return res.send({ message: "user already exist" });
      }
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    // get users
    app.get("/users", verifyJWT, async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    // // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 0 });
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
