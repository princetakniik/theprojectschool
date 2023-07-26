const {
  inserUserAssignment,
  getUserAssignment,
  getUserAssignmentById,
  updateUserAssignment,
  deleteUserAssignment,
  assignmentNotUploadUser,
  assignmentNotsubmitte,
  getUserAssignmentByUserId,
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
};
