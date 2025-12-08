import QuizzesDao from "./dao.js";

export default function QuizzesRoutes(app, db) {
  const dao = QuizzesDao(db);

  // GET all quizzes for a course
  const findQuizzesForCourse = (req, res) => {
    const { courseId } = req.params;
    const quizzes = dao.findQuizzesForCourse(courseId);
    res.json(quizzes);
  };

  // GET a single quiz
  const findQuizById = (req, res) => {
    const { quizId } = req.params;
    const quiz = dao.findQuizById(quizId);
    res.json(quiz);
  };

  // CREATE
  const createQuiz = (req, res) => {
    const { courseId } = req.params;
    const newQuiz = dao.createQuiz({
      ...req.body,
      course: courseId,
    });
    res.json(newQuiz);
  };

  // UPDATE
  const updateQuiz = (req, res) => {
    const { quizId } = req.params;
    const updated = dao.updateQuiz(quizId, req.body);
    res.json(updated);
  };

  // DELETE
  const deleteQuiz = (req, res) => {
    const { quizId } = req.params;
    const status = dao.deleteQuiz(quizId);
    res.json(status);
  };

  app.get("/api/courses/:courseId/quizzes", findQuizzesForCourse);
  app.get("/api/quizzes/:quizId", findQuizById);
  app.post("/api/courses/:courseId/quizzes", createQuiz);
  app.put("/api/quizzes/:quizId", updateQuiz);
  app.delete("/api/quizzes/:quizId", deleteQuiz);
}
