import { v4 as uuidv4 } from "uuid";

export default function QuizzesDao(db) {
  function findQuizzesForCourse(courseId) {
    const { quizzes } = db;
    return quizzes.filter((q) => q.course === courseId);
  }

  function findQuizById(quizId) {
    const { quizzes } = db;
    return quizzes.find((q) => q._id === quizId);
  }

  function createQuiz(quiz) {
    const newQuiz = {
      ...quiz,
      _id: uuidv4(),
    };
    db.quizzes = [...db.quizzes, newQuiz];
    return newQuiz;
  }

  function updateQuiz(quizId, updates) {
    const { quizzes } = db;
    const quiz = quizzes.find((q) => q._id === quizId);
    Object.assign(quiz, updates);
    return quiz;
  }

  function deleteQuiz(quizId) {
    const { quizzes } = db;
    db.quizzes = quizzes.filter((q) => q._id !== quizId);
    return { status: "ok" };
  }

  return {
    findQuizzesForCourse,
    findQuizById,
    createQuiz,
    updateQuiz,
    deleteQuiz
  };
}
