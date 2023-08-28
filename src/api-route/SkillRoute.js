const {
  insertSkill,
  getSkillData,
  getSkillById,
  updateSkillById,
  deleteSkillById,
} = require("../controller/SkillController");

module.exports = (app) => {
  app.post("/insertSkill", (req, res) => insertSkill(req, res));
  app.get("/getSkillData", (req, res) => getSkillData(req, res));
  app.get("/getSkillById", (req, res) => getSkillById(req, res));
  app.put("/updateSkillById", (req, res) => updateSkillById(req, res));
  app.delete("/deleteSkillById", (req, res) => deleteSkillById(req, res));
};
