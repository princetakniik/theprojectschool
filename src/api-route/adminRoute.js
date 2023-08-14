const { getAdmin } = require("../controller/adminController");

module.exports = (app) => {
  app.get("/getAdmin", (req, res) => getAdmin(req, res));
};
