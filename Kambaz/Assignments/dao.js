import model from "./model.js";

// Get all assignments for a course
export const findAssignmentsForCourse = async (courseId) => {
  return model.find({ course: courseId });
};

// Get a single assignment by ID
export const findAssignmentById = async (assignmentId) => {
  return model.findById(assignmentId);
};

// Create a new assignment
export const createAssignment = async (assignment) => {
  return model.create(assignment);
};

// Update an assignment
export const updateAssignment = async (assignmentId, updates) => {
  return model.updateOne({ _id: assignmentId }, updates);
};

// Delete an assignment
export const deleteAssignment = async (assignmentId) => {
  return model.deleteOne({ _id: assignmentId });
};
