import AssignmentsDao from "./dao.js";

export default function AssignmentsRoutes(app, db) {
  const dao = AssignmentsDao(db);

  // GET all assignments for a course
  const findAssignmentsForCourse = (req, res) => {
    const { courseId } = req.params;
    const assignments = dao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  };

  // GET a single assignment
  const findAssignmentById = (req, res) => {
    const { assignmentId } = req.params;
    const assignment = dao.findAssignmentById(assignmentId);
    res.json(assignment);
  };

  // CREATE
  const createAssignment = (req, res) => {
    const { courseId } = req.params;
    const newAssignment = dao.createAssignment({
      ...req.body,
      course: courseId,
    });
    res.json(newAssignment);
  };

  // UPDATE
  const updateAssignment = (req, res) => {
    const { assignmentId } = req.params;
    const updated = dao.updateAssignment(assignmentId, req.body);
    res.json(updated);
  };

  // DELETE
  const deleteAssignment = (req, res) => {
    const { assignmentId } = req.params;
    const status = dao.deleteAssignment(assignmentId);
    res.json(status);
  };

  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.get("/api/assignments/:assignmentId", findAssignmentById);
  app.post("/api/courses/:courseId/assignments", createAssignment);
  app.put("/api/assignments/:assignmentId", updateAssignment);
  app.delete("/api/assignments/:assignmentId", deleteAssignment);
}
