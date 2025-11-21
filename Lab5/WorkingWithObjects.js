// Assignment Object 
const assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10",
  completed: false,
  score: 0,
};

// Module Object 
const moduleObj = {
  id: "M101",
  name: "Intro to NodeJS",
  description: "Learn NodeJS basics",
  course: "CS101",
};

export default function WorkingWithObjects(app) {
  // Assignment Routes

  // Retrieve full assignment object
  const getAssignment = (req, res) => res.json(assignment);

  // Retrieve assignment title
  const getAssignmentTitle = (req, res) => res.json(assignment.title);

  // Update assignment title
  const setAssignmentTitle = (req, res) => {
    const { newTitle } = req.params;
    assignment.title = newTitle;
    res.json(assignment);
  };

  // Update assignment score
  const setAssignmentScore = (req, res) => {
    const { newScore } = req.params;
    assignment.score = parseInt(newScore);
    res.json(assignment);
  };

  // Update assignment completed status
  const setAssignmentCompleted = (req, res) => {
    const { status } = req.params;
    assignment.completed = status === "true";
    res.json(assignment);
  };

  // Module Routes 

  // Retrieve full module object
  const getModule = (req, res) => res.json(moduleObj);

  // Retrieve module name
  const getModuleName = (req, res) => res.json(moduleObj.name);

  // Update module name
  const setModuleName = (req, res) => {
    const { newName } = req.params;
    moduleObj.name = newName;
    res.json(moduleObj);
  };

  // Update module description
  const setModuleDescription = (req, res) => {
    const { newDescription } = req.params;
    moduleObj.description = newDescription;
    res.json(moduleObj);
  };

  // Assignment Routes
  app.get("/lab5/assignment", getAssignment);
  app.get("/lab5/assignment/title", getAssignmentTitle);
  app.get("/lab5/assignment/title/:newTitle", setAssignmentTitle);
  app.get("/lab5/assignment/score/:newScore", setAssignmentScore);
  app.get("/lab5/assignment/completed/:status", setAssignmentCompleted);

  //  Module Routes 
  app.get("/lab5/module", getModule);
  app.get("/lab5/module/name", getModuleName);
  app.get("/lab5/module/name/:newName", setModuleName);
  app.get("/lab5/module/description/:newDescription", setModuleDescription);
}
