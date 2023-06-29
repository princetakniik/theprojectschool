const {
  insertFeedbackTeac,
  teacherFeedbackAll,
  teacherFeedbackById,
  updateFeedbackByTea,
  deleteFeedbackByTea,
} = require("../controller/teacherFeedBackController");

module.exports = (app) => {
  app.post("/insertFeedbackTeac", (req, res) => insertFeedbackTeac(req, res));
  app.get("/teacherFeedbackAll", (req, res) => teacherFeedbackAll(req, res));
  app.get("/teacherFeedbackById", (req, res) => teacherFeedbackById(req, res));
  app.put("/updateFeedbackByTea", (req, res) => updateFeedbackByTea(req, res));
  app.delete("/deleteFeedbackByTea", (req, res) =>
    deleteFeedbackByTea(req, res)
  );
};
