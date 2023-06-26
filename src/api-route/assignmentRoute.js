const {
  inserAssignment,
  getAllAssignment,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
} = require("../controller/assignmentController");

module.exports = (app) => {
  app.post("/inserAssignment", (req, res) => inserAssignment(req, res));
  app.get("/getAllAssignment", (req, res) => getAllAssignment(req, res));
  app.get("/getAssignmentById", (req, res) => getAssignmentById(req, res));
  app.put("/updateAssignment", (req, res) => updateAssignment(req, res));
  app.delete("/deleteAssignment", (req, res) => deleteAssignment(req, res));
};
