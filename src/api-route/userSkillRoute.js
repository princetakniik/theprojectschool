const {
  insertuserskill,
  getuserskill,
  getuserskillById,
  updateuserskillById,
  deleteuserskillById,
} = require("../controller/userSkillController");

module.exports = (app) => {
  app.post("/insertuserskill", (req, res) => insertuserskill(req, res));
  app.get("/getuserskill", (req, res) => getuserskill(req, res));
  app.get("/getuserskillById", (req, res) => getuserskillById(req, res));
  app.put("/updateuserskillById", (req, res) => updateuserskillById(req, res));
  app.delete("/deleteuserskillById", (req, res) => deleteuserskillById(req, res));
};
