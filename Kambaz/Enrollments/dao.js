import { v4 as uuidv4 } from "uuid";
import EnrollmentModel from "./model.js";

export default function EnrollmentsDao() {

  const findCoursesForUser = async (userId) => {
    const enrollments = await EnrollmentModel
      .find({ user: userId })
      .populate("course");
    return enrollments.map(e => e.course);
  };

  const enrollUserInCourse = async (userId, courseId) => {
    return EnrollmentModel.create({
      _id: uuidv4(),   // REQUIRED FIX
      user: userId,
      course: courseId
    });
  };

  const unenrollUserFromCourse = async (userId, courseId) => {
    return EnrollmentModel.deleteOne({ user: userId, course: courseId });
  };

  return {
    findCoursesForUser,
    enrollUserInCourse,
    unenrollUserFromCourse,
  };
}
