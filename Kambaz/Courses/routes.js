// Kambaz/Courses/routes.js
import CoursesDao from "./dao.js";
import EnrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app) {
  const dao = CoursesDao();
  const enrollmentsDao = EnrollmentsDao();

  // GET /api/courses  (used by Dashboard)
  const findAllCourses = async (req, res) => {
    const courses = await dao.findAllCourses();
    res.json(courses);
  };

  // GET /api/users/:userId/courses  (used by "My Courses")
  const findCoursesForEnrolledUser = async (req, res) => {
    let { userId } = req.params;

    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        return res.sendStatus(401);
      }
      userId = currentUser._id;
    }

    const courses = await enrollmentsDao.findCoursesForUser(userId);
    res.json(courses);
  };

  // POST /api/courses  (create course, auto-enroll creator)
  const createCourse = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      return res.sendStatus(401);
    }

    const newCourse = await dao.createCourse(req.body);
    await enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);

    res.json(newCourse);
  };

  // PUT /api/courses/:courseId  (edit course)
  const updateCourse = async (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;

    const status = await dao.updateCourse(courseId, courseUpdates);
    res.json(status);
  };

  // DELETE /api/courses/:courseId  (delete course + its enrollments)
  const deleteCourse = async (req, res) => {
    const { courseId } = req.params;

    await enrollmentsDao.unenrollAllUsersFromCourse(courseId);
    const status = await dao.deleteCourse(courseId);

    res.json(status);
  };

  // POST /api/users/:uid/courses/:cid  (enroll user)
  const enrollUserInCourse = async (req, res) => {
    let { uid, cid } = req.params;

    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        return res.sendStatus(401);
      }
      uid = currentUser._id;
    }

    const status = await enrollmentsDao.enrollUserInCourse(uid, cid);
    res.json(status);
  };

  // DELETE /api/users/:uid/courses/:cid  (unenroll user)
  const unenrollUserFromCourse = async (req, res) => {
    let { uid, cid } = req.params;

    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        return res.sendStatus(401);
      }
      uid = currentUser._id;
    }

    const status = await enrollmentsDao.unenrollUserFromCourse(uid, cid);
    res.json(status);
  };

  // Wire routes
  app.get("/api/courses", findAllCourses);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.post("/api/courses", createCourse);
  app.put("/api/courses/:courseId", updateCourse);
  app.delete("/api/courses/:courseId", deleteCourse);
  app.post("/api/users/:uid/courses/:cid", enrollUserInCourse);
  app.delete("/api/users/:uid/courses/:cid", unenrollUserFromCourse);
}
