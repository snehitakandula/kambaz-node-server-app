import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courses",
    },
    points: Number,
    dueDate: String,
    availableUntil: String,
  },
  { collection: "assignments" }
);

export default assignmentSchema;
