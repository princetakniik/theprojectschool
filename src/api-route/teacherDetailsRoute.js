const {
  getAllTeacher,
  getTeacherByInstitute,
  updateTeacherProfile,
  createTeacher,
} = require("../controller/teacherDetailsController");

module.exports = (app) => {
  app.post('createTeacher',(req,res)=>createTeacher(req,res))
  app.get("/getAllTeacher", (req, res) => getAllTeacher(req, res));
  app.get("/getTeacherByInstitute", (req, res) =>
    getTeacherByInstitute(req, res)
  );
  app.put("/updateTeacherProfile", (req, res) =>updateTeacherProfile(req, res));
};
