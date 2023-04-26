const {
  createStudentsDetails,
  getDataAllSt,
  getDetailById,
  updateDetailsSt,
  deteteDetailsSt,
  getDataTeacherWise,
  getDataClassWise,
  getDataSectionWise,
} = require("../controller/studentDetailsController");

module.exports = (app) => {
  app.post("/createStudentsDetails", (req, res) =>
    createStudentsDetails(req, res)
  );
  app.get("/getDataAllSt", (req, res) => getDataAllSt(req, res));
  app.get("/getDataClassWise", (req, res) => getDataClassWise(req, res));
  app.get("/getDataTeacherWise", (req, res) => getDataTeacherWise(req, res));
  app.get("/getDetailById", (req, res) => getDetailById(req, res));
  app.get('/getDataSectionWise',(req,res)=>getDataSectionWise(req,res));
  app.put("/updateDetailsSt", (req, res) => updateDetailsSt(req, res));
  app.delete("/deteteDetailsSt", (req, res) => deteteDetailsSt(req, res));
};
