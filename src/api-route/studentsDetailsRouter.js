const {
  createStudentsDetails,
  getDataAll,
  getDetailByIdSt,
  updateDetailsSt,
  deteteDetailsSt,
  getDataTeacherWise,
  getDataClassWise,
} = require("../controller/studentDetailsController");

module.exports = (app) => {
  app.post("/createStudentsDetails", (req, res) =>
    createStudentsDetails(req, res)
  );
  app.get("/getDataAll", (req, res) => getDataAll(req, res));
  app.get("/getDataClassWise", (req, res) => getDataClassWise(req, res));
  app.get("/getDataTeacherWise", (req, res) => getDataTeacherWise(req, res));
  app.get("/getDetailByIdSt", (req, res) => getDetailByIdSt(req, res));
  app.put("/updateDetailsSt", (req, res) => updateDetailsSt(req, res));
  app.delete("/deteteDetailsSt", (req, res) => deteteDetailsSt(req, res));
};
