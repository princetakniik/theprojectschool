const {
  viewUser,
  getViewUser,
  getViewUserById,
  updateViewData,
  deleteViewData,
} = require("../controller/viewUserVideoController");

module.exports = (app) => {
  app.post("/viewUser", (req, res) => viewUser(req, res));
  app.get("/getViewUser", (req, res) => getViewUser(req, res));
  app.get("/getViewUserById", (req, res) => getViewUserById(req, res));
  app.put("/updateViewData", (req, res) => updateViewData(req, res));
  app.delete("/deleteViewData", (req, res) => deleteViewData(req, res));
};
