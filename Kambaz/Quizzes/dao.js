import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function QuizzesDao() {
  const findQuizzesForCourse = (courseId) => 
    model.find({ course: courseId });

  const findQuizById = (quizId) => 
    model.findById(quizId);

  const createQuiz = (quiz) => {
    const newQuiz = { ...quiz, _id: uuidv4() };
    return model.create(newQuiz);
  };

  const updateQuiz = (quizId, updates) => 
    model.updateOne({ _id: quizId }, { $set: updates });

  const deleteQuiz = (quizId) => 
    model.deleteOne({ _id: quizId });

  return {
    findQuizzesForCourse,
    findQuizById,
    createQuiz,
    updateQuiz,
    deleteQuiz
  };
}
