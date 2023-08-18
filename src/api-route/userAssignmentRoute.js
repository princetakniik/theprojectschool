const {
  inserUserAssignment,
  getUserAssignment,
  getUserAssignmentById,
  updateUserAssignment,
  deleteUserAssignment,
  assignmentNotUploadUser,
  assignmentNotsubmitte,
  getUserAssignmentByUserId,
  courseUserAssignment,
  courseUserAssignmentById,
  userAssignmentByCourseId,
  courseAssignmentByUserId,
  subCourseUserAssignment,
  subCourseUserAssignmentById,
  subCourseUserAssignmentByCourseId,
  UserAssignmentBysubCourseId,
  subCourseUserAssignmentByuserId,
} = require("../controller/userAssignmentController");

module.exports = (app) => {
  app.post("/inserUserAssignment", (req, res) => inserUserAssignment(req, res));
  app.get("/getUserAssignment", (req, res) => getUserAssignment(req, res));
  app.get("/getUserAssignmentByUserId", (req, res) =>
    getUserAssignmentByUserId(req, res)
  );
  app.get("/getUserAssignmentById", (req, res) =>
    getUserAssignmentById(req, res)
  );
  app.put("/updateUserAssignment", (req, res) =>
    updateUserAssignment(req, res)
  );
  app.delete("/deleteUserAssignment", (req, res) =>
    deleteUserAssignment(req, res)
  );
  app.get("/assignmentNotUploadUser", (req, res) =>
    assignmentNotUploadUser(req, res)
  );
  app.get("/assignmentNotsubmitte", (req, res) =>
    assignmentNotsubmitte(req, res)
  );
  // course
  app.get("/courseUserAssignment", (req, res) =>
    courseUserAssignment(req, res)
  );
  app.get("/courseUserAssignmentById", (req, res) =>
    courseUserAssignmentById(req, res)
  );
  app.get("/userAssignmentByCourseId", (req, res) =>
    userAssignmentByCourseId(req, res)
  );
  app.get("/courseAssignmentByUserId", (req, res) =>
    courseAssignmentByUserId(req, res)
  );
  //subcourse
  app.get("/subCourseUserAssignment", (req, res) =>
    subCourseUserAssignment(req, res)
  );
  app.get("/subCourseUserAssignmentById", (req, res) =>
    subCourseUserAssignmentById(req, res)
  );
  app.get("/subCourseUserAssignmentByCourseId", (req, res) =>
    subCourseUserAssignmentByCourseId(req, res)
  );
  app.get("/UserAssignmentBysubCourseId", (req, res) =>
    UserAssignmentBysubCourseId(req, res)
  );
  app.get("/subCourseUserAssignmentByuserId", (req, res) =>
    subCourseUserAssignmentByuserId(req, res)
  );
};
