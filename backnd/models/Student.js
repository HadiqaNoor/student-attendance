import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    roll: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
