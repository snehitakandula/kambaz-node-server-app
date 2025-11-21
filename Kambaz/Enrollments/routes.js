import EnrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const enrollUserInCourse = (req, res) => {
    const { userId, courseId } = req.params;
    const enrollment = dao.enrollUserInCourse(userId, courseId);
    res.json(enrollment);
  };

  const unenrollUserFromCourse = (req, res) => {
    const { userId, courseId } = req.params;
    dao.unenrollUserFromCourse(userId, courseId);
    res.sendStatus(204);
  };

  const findEnrollmentsForUser = (req, res) => {
    const { userId } = req.params;
    const enrollments = dao.findEnrollmentsForUser(userId);
    res.json(enrollments);
  };

  const findEnrollmentsForCourse = (req, res) => {
    const { courseId } = req.params;
    const enrollments = dao.findEnrollmentsForCourse(courseId);
    res.json(enrollments);
  };

  app.post("/api/enrollments/:userId/:courseId", enrollUserInCourse);
  app.delete("/api/enrollments/:userId/:courseId", unenrollUserFromCourse);
  app.get("/api/enrollments/user/:userId", findEnrollmentsForUser);
  app.get("/api/enrollments/course/:courseId", findEnrollmentsForCourse);
}