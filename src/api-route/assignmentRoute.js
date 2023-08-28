const {
  inserAssignment,
  getAllAssignment,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
  courseAssignment,
  courseAssignmentById,
  AssignmentByCourseId,
  subCourseAssignment,
  subCourseAssignmentById,
  subCourseAssignmentByCourseId,
  AssignmentBysubCourseId,
  instituteAllAssignment,
  AllAssignmentByInstituteId,
} = require("../controller/assignmentController");

module.exports = (app) => {
  app.post("/inserAssignment", (req, res) => inserAssignment(req, res));
  app.get("/getAllAssignment", (req, res) => getAllAssignment(req, res));
  app.get("/getAssignmentById", (req, res) => getAssignmentById(req, res));
  //Institute
  app.get("/instituteAllAssignment", (req, res) =>
    instituteAllAssignment(req, res)
  );
  app.get("/AllAssignmentByInstituteId", (req, res) =>
    AllAssignmentByInstituteId(req, res)
  );
  //course
  app.get("/courseAssignment", (req, res) => courseAssignment(req, res));
  app.get("/courseAssignmentById", (req, res) =>
    courseAssignmentById(req, res)
  );
  app.get("/AssignmentByCourseId", (req, res) =>
    AssignmentByCourseId(req, res)
  );
  //subCourse
  app.get("/subCourseAssignment", (req, res) => subCourseAssignment(req, res));
  app.get("/subCourseAssignmentById", (req, res) =>
    subCourseAssignmentById(req, res)
  );
  app.get("/subCourseAssignmentByCourseId", (req, res) =>
    subCourseAssignmentByCourseId(req, res)
  );
  app.get("/AssignmentBysubCourseId", (req, res) =>
    AssignmentBysubCourseId(req, res)
  );
  //update and delete
  app.put("/updateAssignment", (req, res) => updateAssignment(req, res));
  app.delete("/deleteAssignment", (req, res) => deleteAssignment(req, res));
};
