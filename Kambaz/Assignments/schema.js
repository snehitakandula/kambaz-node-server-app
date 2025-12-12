import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    course: { type: String, required: true },
    points: { type: Number, default: 100 },
    dueDate: { type: String, default: "" },
    availableUntil: { type: String, default: "" },
  },
  { collection: "assignments" }
);

export default assignmentSchema;
