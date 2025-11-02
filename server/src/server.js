import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/greengo";

const app = express();
app.use(cors());
app.use(express.json());
app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.get("/api/ping", (_req, res) => res.json({ ok: true, msg: "pong" }));

const rideSchema = new mongoose.Schema(
  {
    origin: { type: String, required: true, trim: true },
    destination: { type: String, required: true, trim: true },
    time: { type: String, required: true }, 
    seats: { type: Number, default: 1, min: 1, max: 8 },
    price: { type: Number, default: 0 }, 
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

const Ride = mongoose.model("Ride", rideSchema);

app.get("/api/rides", async (req, res, next) => {
  try {
    const { origin, destination } = req.query;
    const query = {};
    if (origin) query.origin = new RegExp(origin, "i");
    if (destination) query.destination = new RegExp(destination, "i");
    const rides = await Ride.find(query).sort({ createdAt: -1 }).lean();
    res.json(rides);
  } catch (err) {
    next(err);
  }
});

app.post("/api/rides", async (req, res, next) => {
  try {
    const { origin, destination, time, seats, price, notes } = req.body || {};
    if (!origin || !destination || !time) {
      return res.status(400).json({ error: "origin, destination and time are required" });
    }
    const ride = await Ride.create({
      origin,
      destination,
      time,
      seats: Number(seats) || 1,
      price: Number(price) || 0,
      notes: notes || "",
    });
    res.status(201).json(ride);
  } catch (err) {
    next(err);
  }
});
app.delete("/api/rides/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Ride.findByIdAndDelete(id);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

app.use("/api", (_req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Server error", details: err.message });
});

async function start() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
}
start();
