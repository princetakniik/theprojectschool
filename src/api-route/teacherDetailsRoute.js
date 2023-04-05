const { getAllTeacher } = require("../controller/teacherDetailsController");

module.exports = (app) => {
  app.get("/getAllTeacher", (req, res) => getAllTeacher(req, res));
};
