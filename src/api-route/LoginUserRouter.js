const { LoginUser } = require("../middleware/login");

  
  module.exports = (app) => {
    app.get("/LoginUser", (req, res) => LoginUser(req, res));
  };
  