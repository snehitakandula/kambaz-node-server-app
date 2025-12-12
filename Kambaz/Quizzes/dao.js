import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function QuizzesDao() {
  const findQuizzesForCourse = (courseId) => 
    model.find({ course: courseId });

  const findQuizById = (quizId) => 
    model.findById(quizId);

  const createQuiz = (quiz) => {
    const newQuiz = { ...quiz, _id: uuidv4(), questions: [] };
    return model.create(newQuiz);
  };

  const updateQuiz = (quizId, updates) => 
    model.updateOne({ _id: quizId }, { $set: updates });

  const deleteQuiz = (quizId) => 
    model.deleteOne({ _id: quizId });

  // Question CRUD operations
  const addQuestion = async (quizId, question) => {
    const newQuestion = { ...question, _id: uuidv4() };
    await model.updateOne(
      { _id: quizId },
      { $push: { questions: newQuestion } }
    );
    return newQuestion;
  };

  const updateQuestion = async (quizId, questionId, updates) => {
    const updateFields = {};
    Object.keys(updates).forEach(key => {
      updateFields[`questions.$.${key}`] = updates[key];
    });
    
    return model.updateOne(
      { _id: quizId, "questions._id": questionId },
      { $set: updateFields }
    );
  };

  const deleteQuestion = (quizId, questionId) => {
    return model.updateOne(
      { _id: quizId },
      { $pull: { questions: { _id: questionId } } }
    );
  };

  const findQuestionById = async (quizId, questionId) => {
    const quiz = await model.findById(quizId);
    return quiz?.questions?.find(q => q._id === questionId);
  };

  return {
    findQuizzesForCourse,
    findQuizById,
    createQuiz,
    updateQuiz,
    deleteQuiz,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    findQuestionById
  };
}
