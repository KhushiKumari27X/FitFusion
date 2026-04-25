import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// app.use(cors({
//   origin: "http://localhost:3000",
//   credentials: true
// }));
app.use(cors({
  origin: ["http://localhost:3000", "https://fit-fusion-khmz.vercel.app"],
  credentials: true
}));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/favorites", favoriteRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API Working");
});

// Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});