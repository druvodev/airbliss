const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Flight Booking Server is now Running");
});

app.listen(port, () => {
  console.log(`Flight Booking server running on port: ${port}`);
});
