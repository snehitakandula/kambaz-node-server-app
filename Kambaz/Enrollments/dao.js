import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
  let { enrollments } = db;

  const enrollUserInCourse = (userId, courseId) => {
    const newEnrollment = { _id: uuidv4(), user: userId, course: courseId };
    enrollments = [...enrollments, newEnrollment];
    db.enrollments = enrollments;
    return newEnrollment;
  };

  const unenrollUserFromCourse = (userId, courseId) => {
    enrollments = enrollments.filter(
      (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
    );
    db.enrollments = enrollments;
  };

  const findEnrollmentsForUser = (userId) => {
    return enrollments.filter((enrollment) => enrollment.user === userId);
  };

  const findEnrollmentsForCourse = (courseId) => {
    return enrollments.filter((enrollment) => enrollment.course === courseId);
  };

  const findAllEnrollments = () => enrollments;

  return {
    enrollUserInCourse,
    unenrollUserFromCourse,
    findEnrollmentsForUser,
    findEnrollmentsForCourse,
    findAllEnrollments,
  };
}