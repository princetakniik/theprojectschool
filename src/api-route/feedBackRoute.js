const {
  insertFeedback,
  getFeedback,
  getFeedbackById,
  getFeedbackByUserId,
} = require("../controller/feedBackController");

module.exports = (app) => {
  app.post("/insertFeedback", (req, res) => insertFeedback(req, res));
  app.get("/getFeedback", (req, res) => getFeedback(req, res));
  app.get("/getFeedbackById", (req, res) => getFeedbackById(req, res));
  app.get("/getFeedbackByUserId", (req, res) => getFeedbackByUserId(req, res));
};
