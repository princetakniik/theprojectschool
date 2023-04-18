const { generateQR } = require("../controller/qrcodeController");
const {
  roleWiseGetDetails,
} = require("../controller/roleManagementController");

module.exports = (app) => {
  app.get("/roleWiseGetDetails", (req, res) => roleWiseGetDetails(req, res));
  app.get("/generateQR", (req, res) => generateQR(req, res));
};
