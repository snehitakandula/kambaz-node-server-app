import QuizzesDao from "./dao.js";

export default function QuizzesRoutes(app) {
  const dao = QuizzesDao();

  // GET all quizzes for a course
  const findQuizzesForCourse = async (req, res) => {
    const { courseId } = req.params;
    const quizzes = await dao.findQuizzesForCourse(courseId);
    res.json(quizzes);
  };

  // GET a single quiz
  const findQuizById = async (req, res) => {
    const { quizId } = req.params;
    const quiz = await dao.findQuizById(quizId);
    res.json(quiz);
  };

  // CREATE
  const createQuiz = async (req, res) => {
    const { courseId } = req.params;
    const newQuiz = await dao.createQuiz({
      ...req.body,
      course: courseId,
    });
    res.json(newQuiz);
  };

  // UPDATE
  const updateQuiz = async (req, res) => {
    const { quizId } = req.params;
    await dao.updateQuiz(quizId, req.body);
    const updatedQuiz = await dao.findQuizById(quizId);
    res.json(updatedQuiz);
  };

  // DELETE
  const deleteQuiz = async (req, res) => {
    const { quizId } = req.params;
    const status = await dao.deleteQuiz(quizId);
    res.json(status);
  };

  // ============ QUESTION ROUTES ============

  // GET all questions for a quiz
  const getQuestions = async (req, res) => {
    const { quizId } = req.params;
    const quiz = await dao.findQuizById(quizId);
    res.json(quiz?.questions || []);
  };

  // GET a single question
  const getQuestion = async (req, res) => {
    const { quizId, questionId } = req.params;
    const question = await dao.findQuestionById(quizId, questionId);
    if (question) {
      res.json(question);
    } else {
      res.status(404).json({ message: "Question not found" });
    }
  };

  // CREATE a question
  const createQuestion = async (req, res) => {
    const { quizId } = req.params;
    const newQuestion = await dao.addQuestion(quizId, req.body);
    res.json(newQuestion);
  };

  // UPDATE a question
  const updateQuestion = async (req, res) => {
    const { quizId, questionId } = req.params;
    await dao.updateQuestion(quizId, questionId, req.body);
    const updatedQuestion = await dao.findQuestionById(quizId, questionId);
    res.json(updatedQuestion);
  };

  // DELETE a question
  const deleteQuestion = async (req, res) => {
    const { quizId, questionId } = req.params;
    const status = await dao.deleteQuestion(quizId, questionId);
    res.json(status);
  };

  // Quiz routes
  app.get("/api/courses/:courseId/quizzes", findQuizzesForCourse);
  app.get("/api/quizzes/:quizId", findQuizById);
  app.post("/api/courses/:courseId/quizzes", createQuiz);
  app.put("/api/quizzes/:quizId", updateQuiz);
  app.delete("/api/quizzes/:quizId", deleteQuiz);

  // Question routes
  app.get("/api/quizzes/:quizId/questions", getQuestions);
  app.get("/api/quizzes/:quizId/questions/:questionId", getQuestion);
  app.post("/api/quizzes/:quizId/questions", createQuestion);
  app.put("/api/quizzes/:quizId/questions/:questionId", updateQuestion);
  app.delete("/api/quizzes/:quizId/questions/:questionId", deleteQuestion);
}
