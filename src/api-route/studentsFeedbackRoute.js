const {
  insertFeedbackByStu,
  studentFeedbackAll,
  studentFeedbackById,
  updateFeedbackByStu,
  deleteFeedbackByStu,
  studentFeedbackSubAll,
  studentFeedbackSubById,
} = require("../controller/studentsFeedbackController");

module.exports = (app) => {
  app.post("/insertFeedbackByStu", (req, res) => insertFeedbackByStu(req, res));
  app.get("/studentFeedbackAll", (req, res) => studentFeedbackAll(req, res));
  app.get("/studentFeedbackById", (req, res) => studentFeedbackById(req, res));
  app.put("/updateFeedbackByStu", (req, res) => updateFeedbackByStu(req, res));
  app.delete("/deleteFeedbackByStu", (req, res) =>
    deleteFeedbackByStu(req, res)
  );
  app.get("/studentFeedbackSubAll", (req, res) =>
    studentFeedbackSubAll(req, res)
  );
  app.get("/studentFeedbackSubById", (req, res) =>
    studentFeedbackSubById(req, res)
  );
};
