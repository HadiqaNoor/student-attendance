import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import attendanceRoutes from "./routes/attendanceRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/attendance", attendanceRoutes);
app.use("/api/students", studentRoutes);

// test
app.get("/", (req, res) => {
  res.send("Server OK ✅");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch(err => console.log(err));
