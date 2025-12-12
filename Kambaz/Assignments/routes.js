import * as dao from "./dao.js";

export default function AssignmentsRoutes(app) {

  // GET all assignments for a course
  const findAssignmentsForCourse = async (req, res) => {
    const { courseId } = req.params;
    const assignments = await dao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  };

  // GET a single assignment
  const findAssignmentById = async (req, res) => {
    const { assignmentId } = req.params;
    const assignment = await dao.findAssignmentById(assignmentId);
    res.json(assignment);
  };

  // CREATE
  const createAssignment = async (req, res) => {
    const { courseId } = req.params;
    const newAssignment = await dao.createAssignment({
      ...req.body,
      course: courseId,
    });
    res.json(newAssignment);
  };

  // UPDATE
  const updateAssignment = async (req, res) => {
    const { assignmentId } = req.params;
    const status = await dao.updateAssignment(assignmentId, req.body);
    res.json(status);
  };

  // DELETE
  const deleteAssignment = async (req, res) => {
    const { assignmentId } = req.params;
    const status = await dao.deleteAssignment(assignmentId);
    res.json(status);
  };

  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.get("/api/assignments/:assignmentId", findAssignmentById);
  app.post("/api/courses/:courseId/assignments", createAssignment);
  app.put("/api/assignments/:assignmentId", updateAssignment);
  app.delete("/api/assignments/:assignmentId", deleteAssignment);
}
