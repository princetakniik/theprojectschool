const {
  isertStudentLimit,
  getStudentLimit,
  getStudentLimitById,
  updateStudentLimit,
  deleteStudentLimit,
} = require("../controller/studentLimitController");

module.exports = (app) => {
  app.post("/isertStudentLimit", (req, res) => isertStudentLimit(req, res));
  app.get("/getStudentLimit", (req, res) => getStudentLimit(req, res));
  app.get("/getStudentLimitById", (req, res) => getStudentLimitById(req, res));
  app.put("/updateStudentLimit", (req, res) => updateStudentLimit(req, res));
  app.delete("/deleteStudentLimit", (req, res) => deleteStudentLimit(req, res));
};
