import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5001;
const MONGODB_URI =process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/greengo";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const userSchema = new mongoose.Schema(
  {
    email:
    {
      type: String,
      required: true,
      unique: true
    },
    password:
    {
      type: String,
      required: true
    },
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

const greenRideSchema = new mongoose.Schema(
  {
    origin:
    {
      type: String,
      required: true,
      trim: true
    },
    destination:
    {
      type: String,
      required: true,
      trim: true
    },
    time:
    {
      type: String,
      required: true
    },
    seats:
    {
      type: Number,
      default: 1,
      min: 1,
      max: 8
    },
    price:
    {
      type: Number,
      default: 0
    },
    notes:
    {
      type: String,
      default: ""
    },
  },
  { timestamps: true }
);

const GreenRide = mongoose.model("GreenRide", greenRideSchema);

const rideSchema = new mongoose.Schema(
  {
    email: String,
    pickup: String,
    dropoff: String,
    datetime: String,
  },
  { 
    timestamps: true 
  }
);

const Ride = mongoose.model("Ride", rideSchema);

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.get("/api/ping", (_req, res) => res.json({ msg: "pong" }));

app.post("/api/signup", async (req, res) =>
{
  try
  {
    const { email, password } = req.body;
    if (!email.endsWith("@my.unt.edu"))
    {
      return res.status(400).json({ message: "Only @my.unt.edu emails allowed" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPassword });
    res.json({ message: "Signup successful" });
  }
  catch (errors)
  {
    console.error("Signup error:", errors);
    res.status(500).json({ message: "Server error during signup" });
  }
});

app.post("/api/login", async (req, res) =>
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
  catch (errors)
  {
    console.error("Login error:", errors);
    res.status(500).json({ message: "Server error during login" });
  }
});

app.post("/api/ride", async (req, res) =>
{
  try
  {
    const { email, pickup, dropoff, datetime } = req.body;
    if (!email || !pickup || !dropoff || !datetime)
    {
      return res.status(400).json({ message: "All fields required" });
    }
    await Ride.create({ email, pickup, dropoff, datetime });
    res.json({ message: "Ride scheduled successfully" });
  }
  catch (errors)
  {
    console.error("Ride save error:", errors);
    res.status(500).json({ message: "Server error during ride scheduling" });
  }
});

app.get("/api/rides", async (req, res) =>
{
  try
  {
    const { email } = req.query;
    let filter = {};
    if(email)
    {
      filter = { email }
    }
    const rides = await Ride.find(filter);

    res.json(rides);
  }
  catch (errors)
  {
    console.error("Error fetching rides:", errors);
    res.status(500).json({ message: "Error fetching rides" });
  }
});

app.get("/api/match", async (req, res) =>
{
  try
  {
    const { pickup, dropoff } = req.query;
    if (!pickup || !dropoff) {
      return res.json([]);
    }
    const rides = await Ride.find({
      pickup: { $regex: pickup, $options: "i" },
      dropoff: { $regex: dropoff, $options: "i" },
    });
    res.json(rides);
  }
  catch (errors)
  {
    console.error("Error matching rides:", errors);
    res.status(500).json({ message: "Error finding matches" });
  }
});

app.delete("/api/ride/:id", async (req, res) =>
{
  try
  {
    await Ride.findByIdAndDelete(req.params.id);
    res.json({ message: "Ride canceled successfully" });
  }
  catch (errors)
  {
    console.error("Error deleting ride:", errors);
    res.status(500).json({ message: "Error canceling ride" });
  }
});

app.get("/api/greengo/rides", async (req, res, next) =>
{
  try
  {
    const { origin, destination } = req.query;
    const query = {};
    if (origin) 
    {
      query.origin = new RegExp(origin, "i");
    }
    if (destination) 
    {
      query.destination = new RegExp(destination, "i");
    }
    const rides = await GreenRide.find(query).sort({ createdAt: -1 }).lean();
    res.json(rides);
  }
  catch (errors)
  {
    next(errors);
  }
});

app.post("/api/greengo/rides", async (req, res, next) =>
{
  try
  {
    const { origin, destination, time, seats, price, notes } = req.body;

    if (!origin || !destination || !time)
    {
      return res.status(400).json({ error: "origin, destination and time are required" });
    }
    const ride = await GreenRide.create({
      origin,
      destination,
      time,
      seats: Number(seats) || 1,
      price: Number(price) || 0,
      notes: notes || "",
    });
    res.status(201).json(ride);
  }
  catch (errors)
  {
    next(errors);
  }
});

app.delete("/api/greengo/rides/:id", async (req, res, next) =>
{
  try
  {
    await GreenRide.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  }
  catch (errors)
  {
    next(errors);
  }
});

app.use("/api", (_req, res) =>
{
  res.status(404).json({ error: "Not found" });
});

app.use((err, _req, res, _next) =>
{
  console.error("SERVER ERROR:", err);
  res.status(500).json({ error: "Server error", details: err.message });
});

app.listen(PORT, () =>
{
  console.log(`Server running on port ${PORT}`);
});
