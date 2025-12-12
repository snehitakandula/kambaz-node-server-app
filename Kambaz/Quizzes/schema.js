import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  _id: String,
  text: { type: String, required: true },
  isCorrect: { type: Boolean, default: false }
}, { _id: false });

const questionSchema = new mongoose.Schema({
  _id: String,
  title: { type: String, default: "" },
  type: {
    type: String,
    enum: ["Multiple Choice", "True/False", "Fill in the Blank"],
    default: "Multiple Choice"
  },
  points: { type: Number, default: 0 },
  question: { type: String, required: true },
  answers: [answerSchema]
}, { _id: false });

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
    published: { type: Boolean, default: false },
    questions: [questionSchema]
  },
  { collection: "quizzes" }
);

export default quizSchema;
