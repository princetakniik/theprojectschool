const {
  createStudentsDetails,
  getDataAllSt,
  getDetailById,
  updateDetailsSt,
  deteteDetailsSt,
  getDataTeacherWise,
  getDataClassWise,
  getStudentByInstitute,
  updateProfilePic,
} = require("../controller/studentDetailsController");

module.exports = (app) => {
  app.post("/createStudentsDetails", (req, res) =>
    createStudentsDetails(req, res)
  );
  app.get("/getDataAllSt", (req, res) => getDataAllSt(req, res));
  app.get('/getStudentByInstitute',(req,res)=>getStudentByInstitute(req,res))
  app.get("/getDataClassWise", (req, res) => getDataClassWise(req, res));
  app.get("/getDataTeacherWise", (req, res) => getDataTeacherWise(req, res));
  app.get("/getDetailById", (req, res) => getDetailById(req, res));
  app.get('/getDataSectionWise',(req,res)=>getDataSectionWise(req,res));
  app.put("/updateDetailsSt", (req, res) => updateDetailsSt(req, res));
  app.delete("/deteteDetailsSt", (req, res) => deteteDetailsSt(req, res));
  app.put('/updateProfilePic',(req,res)=>updateProfilePic(req,res))
};
