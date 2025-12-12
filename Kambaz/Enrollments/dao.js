import enrollmentsModel from "./model.js";

export default function EnrollmentsDao() {
  const enrollUserInCourse = (userId, courseId) =>
    enrollmentsModel.create({ user: userId, course: courseId });

  const unenrollUserFromCourse = (userId, courseId) =>
    enrollmentsModel.deleteOne({ user: userId, course: courseId });

  const unenrollAllUsersFromCourse = (courseId) =>
    enrollmentsModel.deleteMany({ course: courseId });

  const findCoursesForUser = (userId) =>
    enrollmentsModel.find({ user: userId }).populate("course");

  const findUsersForCourse = (courseId) =>
    enrollmentsModel.find({ course: courseId }).populate("user");

  return {
    enrollUserInCourse,
    unenrollUserFromCourse,
    unenrollAllUsersFromCourse,
    findCoursesForUser,
    findUsersForCourse,
  };
}
