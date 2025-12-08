// Kambaz/Courses/dao.js
import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function CoursesDao() {
  // Dashboard courses – you can keep projection or return all fields
  async function findAllCourses() {
    // This keeps only name + description (as in 6.4.2 instructions)
    return model.find({}, { name: 1, description: 1 });
    // If you ever need full courses instead, change to: return model.find();
  }

  async function findCourseById(courseId) {
    return model.findById(courseId);
  }

  async function createCourse(course) {
    const newCourse = {
      ...course,
      _id: course._id || uuidv4(),
    };
    return model.create(newCourse);
  }

  function deleteCourse(courseId) {
    return model.deleteOne({ _id: courseId });
  }

  function updateCourse(courseId, courseUpdates) {
    return model.updateOne({ _id: courseId }, { $set: courseUpdates });
  }

  return {
    findAllCourses,
    findCourseById,
    createCourse,
    deleteCourse,
    updateCourse,
  };
}
