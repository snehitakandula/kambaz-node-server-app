import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    _id: String,
    title: { type: String, required: true },
    course: { type: String, required: true },
    description: String,
    quizType: {
      type: String,
      enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"],
      default: "Graded Quiz"
    },
    points: { type: Number, default: 0 },
    assignmentGroup: String,
    shuffleAnswers: { type: Boolean, default: true },
    timeLimit: Number,
    multipleAttempts: { type: Boolean, default: false },
    showCorrectAnswers: String,
    accessCode: String,
    oneQuestionAtATime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },
    dueDate: String,
    availableDate: String,
    untilDate: String,
    published: { type: Boolean, default: false }
  },
  { collection: "quizzes" }
);

export default quizSchema;
