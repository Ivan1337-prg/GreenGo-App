const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/student_rides")
  .then(() => console.log("MongoDB connected"))
  .catch((errors) => console.error("Database connection error:", errors));

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.post("/signup", async (req, res) =>
{
  try
  {
    const { email, password } = req.body;

    if (!email.endsWith("@my.unt.edu"))
    {
      return res.status(400).json({ message: "Only @my.unt.edu emails allowed" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.json({ message: "Signup successful" });
  }
  catch (error)
  {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error during signup" });
  }
});

app.post("/login", async (req, res) =>
{
  try
  {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) 
    {
      return res.status(400).json({ message: "User not found" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match)
    {
      return res.status(400).json({ message: "Incorrect password" });
    }
    res.json({ message: "Login successful" });
  }
  catch (error)
  {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});
app.get("/", (req, res) =>
{
  res.send("Backend is working");
});
const rideSchema = new mongoose.Schema({
  email: String,
  pickup: String,
  dropoff: String,
  datetime: String,
});
const Ride = mongoose.model("Ride", rideSchema);
app.post("/ride", async (req, res) =>
{
  try
  {
    const { email, pickup, dropoff, datetime } = req.body;
    if (!email || !pickup || !dropoff || !datetime)
    {
      return res.status(400).json({ message: "All fields required" });
    }
    const ride = new Ride({ email, pickup, dropoff, datetime });
    await ride.save();
    res.json({ message: "Ride scheduled successfully" });
  }
  catch (errors)
  {
    console.error("Ride save error:", errors);
    res.status(500).json({ message: "Server error during ride scheduling" });
  }
});
app.get("/rides", async (req, res) =>
{
  try
  {
    const rides = await Ride.find();
    res.json(rides);
  }
  catch (errors)
  {
    res.status(500).json({ message: "Error fetching rides" });
  }
});
app.get("/rides", async (req, res) => 
{
  try
  {
    const { email } = req.query;
    let rides;
    if(email)
    {
      rides = await Ride.find({ email });
    }
    else
    {
      rides =  await Ride.find();
    }
    res.json(rides);
  }
  catch (errors)
  {
    console.error("Error fetching rides:", error);
    res.status(500).json({ message: "Error fetching rides" });
  }
});
app.get("/match", async (req, res) =>
{
  try
  {
    const { pickup, dropoff, datetime } = req.query;
    if (!pickup || !dropoff)
    {
      return res.json([]);
    }
    const rides = await Ride.find(
    {
      pickup: pickup,
      dropoff: dropoff,
    });
    res.json(rides);
  }
  catch (errors)
  {
    console.error("Error matching rides:", errors);
    res.status(500).json({ message: "Error finding matches" });
  }
});
app.delete("/ride/:id", async (req, res) =>
{
  try
  {
    const rideId = req.params.id;
    await Ride.findByIdAndDelete(rideId);
    res.json({ message: "Ride canceled successfully" });
  }
  catch (errors)
  {
    console.error("Error deleting ride:", errors);
    res.status(500).json({ message: "Error canceling ride" });
  }
});
app.listen(5100, () => console.log("Server started on http://localhost:5100"));
