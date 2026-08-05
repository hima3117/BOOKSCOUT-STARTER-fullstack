import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bookRoutes from "./routes/books.js";

import authRoutes from "./routes/authRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";

dotenv.config();
console.log("JWT SECRET:", process.env.JWT_SECRET);

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/books", bookRoutes);


app.get("/", (req, res) => {
  res.send("BookScout Backend Running 🚀");
});


mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected");

  app.listen(process.env.PORT || 5000, () => {
    console.log("Server running on port 5000");
  });
})
.catch((err) => {
  console.log("MongoDB Error:", err.message);
});