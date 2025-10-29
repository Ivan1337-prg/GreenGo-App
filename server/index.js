import express from "express";
import cors from "cors";

const app = express();

// allow your Vite dev ports
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// health check
app.get("/api/ping", (req, res) => res.json({ ok: true, msg: "pong" }));

// temp in-memory rides
const rides = [];

app.get("/api/rides", (req, res) => res.json(rides));

app.post("/api/rides", (req, res) => {
  const { origin, destination, time, seats } = req.body;
  const ride = {
    id: Date.now().toString(),
    origin,
    destination,
    time,
    seats: Number(seats || 1),
  };
  rides.unshift(ride);
  res.status(201).json(ride);
});

// ❌ remove this (it caused the error):
// app.options("*", cors());

// ✅ if you want an explicit preflight route, scope it:
// app.options("/api/*", cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running on :${PORT}`));
