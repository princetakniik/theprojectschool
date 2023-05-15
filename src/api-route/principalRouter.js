const {
  insertPrincipal,
  principalAllData,
  principalDataById,
  updatePrincipal,
  deletePrincipal
} = require("../controller/principalController");

module.exports = (app) => {
  app.post("/insertPrincipal", (req, res) => insertPrincipal(req, res));
  app.get("/principalAllData", (req, res) => principalAllData(req, res));
  app.get("/principalDataById", (req, res) => principalDataById(req, res));
  app.put("/updatePrincipal", (req, res) => updatePrincipal(req, res));
  app.delete('/deletePrincipal',(req,res)=>deletePrincipal(req,res));
};
