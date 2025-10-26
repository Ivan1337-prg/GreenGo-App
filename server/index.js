// server/index.js
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// health check
app.get("/api/ping", (req, res) => res.json({ ok: true, msg: "pong" }));

// temp in-memory rides (DB later)
const rides = [];
app.get("/api/rides", (req, res) => res.json(rides));
app.post("/api/rides", (req, res) => {
  const { origin, destination, time, seats } = req.body;
  const ride = {
    id: Date.now().toString(),
    origin, destination, time,
    seats: Number(seats || 1)
  };
  rides.unshift(ride);
  res.status(201).json(ride);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running on :${PORT}`));
