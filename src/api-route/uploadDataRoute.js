const {
  getAllUploadData,
  getUploadDataById,
  destroyUploadData,
} = require("../controller/uploadDataController");

module.exports = (app) => {
  app.get("/getAllUploadData", (req, res) => getAllUploadData(req, res));
  app.get("/getUploadDataById", (req, res) => getUploadDataById(req, res));
  app.delete("/destroyUploadData", (req, res) => destroyUploadData(req, res));
};
