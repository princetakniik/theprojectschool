const {
  insertFeedbackByStu,
  studentFeedbackAll,
  studentFeedbackById,
  updateFeedbackByStu,
  deleteFeedbackByStu,
  studentFeedbackByCourses,
  studentFeedbackBySubcourses,
  studentFeedbackByInstitute,
} = require("../controller/studentsFeedbackController");

module.exports = (app) => {
  app.post("/insertFeedbackByStu", (req, res) => insertFeedbackByStu(req, res));
  app.get("/studentFeedbackAll", (req, res) => studentFeedbackAll(req, res));
  app.get("/studentFeedbackById", (req, res) => studentFeedbackById(req, res));
  app.put("/updateFeedbackByStu", (req, res) => updateFeedbackByStu(req, res));
  app.delete("/deleteFeedbackByStu", (req, res) =>
    deleteFeedbackByStu(req, res)
  );
  app.get("/studentFeedbackByCourses", (req, res) =>
    studentFeedbackByCourses(req, res)
  );
  app.get("/studentFeedbackBySubcourses", (req, res) =>
    studentFeedbackBySubcourses(req, res)
  );
  app.get("/studentFeedbackByInstitute", (req, res) =>
    studentFeedbackByInstitute(req, res)
  );
};
