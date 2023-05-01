const { getAllTeacher, getTeacherByInstitute } = require("../controller/teacherDetailsController");

module.exports = (app) => {
  app.get("/getAllTeacher", (req, res) => getAllTeacher(req, res));
  app.get('/getTeacherByInstitute',(req,res)=>getTeacherByInstitute(req,res))
};
