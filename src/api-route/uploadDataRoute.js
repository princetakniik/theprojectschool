const {
  getAllUploadData,
  getUploadDataById,
} = require("../controller/uploadDataController");

module.exports = (app) => {
  app.get("/getAllUploadData", (req, res) => getAllUploadData(req, res));
  app.get("/getUploadDataById", (req, res) => getUploadDataById(req, res));
};
