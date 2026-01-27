import express from "express";
import Attendance from "../models/Attendance.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ TEST ROUTE (public)
router.get("/test", (req, res) => {
  res.send("Attendance route working ✅");
});

// 📅 GET attendance by date (protected)
router.get("/:date", protect, async (req, res) => {
  try {
    const records = await Attendance.find({ date: req.params.date });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ➕ POST attendance (protected)
router.post("/", protect, async (req, res) => {
  try {
    const { studentId, date, status } = req.body;

    const record = await Attendance.findOneAndUpdate(
      { studentId, date },
      { status },
      { upsert: true, new: true }
    );

    res.json(record);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
