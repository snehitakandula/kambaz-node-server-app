import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app) {
  const dao = EnrollmentsDao();

  // Get enrolled courses for a user
  app.get("/api/users/:userId/courses", async (req, res) => {
    let { userId } = req.params;

    if (userId === "current") {
      const currentUser = req.session.currentUser;
      if (!currentUser) return res.sendStatus(401);
      userId = currentUser._id;
    }

    const courses = await dao.findCoursesForUser(userId);
    res.json(courses);
  });

  // Enroll current user in a course
  app.post("/api/users/current/courses/:courseId", async (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) return res.sendStatus(401);

    const { courseId } = req.params;
    const status = await dao.enrollUserInCourse(currentUser._id, courseId);

    res.json(status);
  });

  // Unenroll
  app.delete("/api/users/current/courses/:courseId", async (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) return res.sendStatus(401);

    const { courseId } = req.params;
    const status = await dao.unenrollUserFromCourse(currentUser._id, courseId);

    res.json(status);
  });


  // Enroll
app.post("/api/enrollments/:userId/:courseId", async (req, res) => {
  const { userId, courseId } = req.params;
  const status = await dao.enrollUserInCourse(userId, courseId);
  res.json(status);
});

// Unenroll
app.delete("/api/enrollments/:userId/:courseId", async (req, res) => {
  const { userId, courseId } = req.params;
  const status = await dao.unenrollUserFromCourse(userId, courseId);
  res.json(status);
});

}
