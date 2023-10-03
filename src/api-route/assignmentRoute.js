const {
  inserAssignment,
  getAllAssignment,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
  AllAssignmentByInstituteId,
  AssignmentByCourseId,
  AssignmentBysubCourseId,
  
} = require("../controller/assignmentController");

module.exports = (app) => {
  app.post("/inserAssignment", (req, res) => inserAssignment(req, res));
  app.get("/getAllAssignment", (req, res) => getAllAssignment(req, res));
  app.get("/getAssignmentById", (req, res) => getAssignmentById(req, res));
  //Institute
  app.get("/AllAssignmentByInstituteId", (req, res) =>
    AllAssignmentByInstituteId(req, res)
  );
  //course
  app.get("/AssignmentByCourseId", (req, res) =>
    AssignmentByCourseId(req, res)
  );
  //subCourse
  app.get("/AssignmentBysubCourseId", (req, res) =>
    AssignmentBysubCourseId(req, res)
  );
  //update and delete
  app.put("/updateAssignment", (req, res) => updateAssignment(req, res));
  app.delete("/deleteAssignment", (req, res) => deleteAssignment(req, res));
};
