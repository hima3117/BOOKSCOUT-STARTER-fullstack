import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import bookRoutes from "./routes/books.js";

dotenv.config();

const app = express();


// Database
connectDB();

// CORS Configuration
app.use(
  cors({
    origin: [
      "https://bookscout-starter-fullstack.vercel.app",
      "https://bookscout-starter-fullstack-fh5el5wkr-hima3117s-projects.vercel.app",
      "https://bookscout-starter-fullstack-levmxcq9k-hima3117s-projects.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);


// Middleware
app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/books", bookRoutes);


// Test API
app.get("/", (req, res) => {
  res.json({
    message: "BookScout Backend Running 🚀"
  });
});


// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
