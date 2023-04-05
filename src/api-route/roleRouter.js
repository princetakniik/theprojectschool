const {
  roleWiseGetDetails,
} = require("../controller/roleManagementController");

module.exports = (app) => {
  app.get("/roleWiseGetDetails", (req, res) => roleWiseGetDetails(req, res));
};
