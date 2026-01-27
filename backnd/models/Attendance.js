import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    date: {
      type: String, // e.g. "2026-01-25"
      required: true,
    },
    status: {
      type: String,
      enum: ["Present", "Absent"],
      required: true,
    },
  },
  { timestamps: true }
);

// 🔁 Prevent model overwrite error
export default mongoose.models.Attendance ||
  mongoose.model("Attendance", attendanceSchema);
