const {
  inserUserAssignment,
  getUserAssignment,
  getUserAssignmentByUserId,
  getUserAssignmentById,
  updateUserAssignment,
  deleteUserAssignment,
  assignmentSubmitted,
  assignmentSubmittedByAssignmentsId,
  assignmentSubmittedByUserId,
  assignmentPending,
  assignmentPendingByAssignmentsId,
  assignmentPendingByUserId,
  assignmentInsert,
  
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
 //assignmentSubmitted
 app.get('/assignmentSubmitted',(req,res)=>assignmentSubmitted(req,res))
 app.get('/assignmentSubmittedByAssignmentsId',(req,res)=>assignmentSubmittedByAssignmentsId(req,res))
 app.get('/assignmentSubmittedByUserId',(req,res)=>assignmentSubmittedByUserId(req,res))
 
 //assignmentPending
 app.get('/assignmentPending',(req,res)=>assignmentPending(req,res))
 app.get('/assignmentPendingByAssignmentsId',(req,res)=>assignmentPendingByAssignmentsId(req,res))
 app.get('/assignmentPendingByUserId',(req,res)=>assignmentPendingByUserId(req,res))
 app.get('/assignmentInsert',(req,res)=>assignmentInsert(req,res))
};
