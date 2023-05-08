const {
  getAllTeacher,
  getTeacherByInstitute,
  updateTeacherProfile,
} = require("../controller/teacherDetailsController");

module.exports = (app) => {
  app.get("/getAllTeacher", (req, res) => getAllTeacher(req, res));
  app.get("/getTeacherByInstitute", (req, res) =>
    getTeacherByInstitute(req, res)
  );
  app.put("/updateTeacherProfile", (req, res) =>updateTeacherProfile(req, res));
};
