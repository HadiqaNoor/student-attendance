import express from "express";
import Student from "../models/Student.js";

const router = express.Router();

// ➕ Add student
router.post("/", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 📄 Get all students
router.get("/", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

export default router;
