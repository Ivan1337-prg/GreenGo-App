import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// ✅ make sure dotenv looks in the same folder as this file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, ".env") });

console.log("✅ Loaded environment variables:");
console.log("PORT:", process.env.PORT);


const app = express();

// ✅ allow your Vite dev ports
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// ✅ simple health check
app.get("/api/ping", (req, res) => res.json({ ok: true, msg: "pong" }));

// ✅ temp in-memory rides
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


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 API running on http://localhost:${PORT}`));


