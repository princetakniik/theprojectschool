const {
  viewUser,
  getViewUser,
  getViewUserById,
  updateViewData,
  deleteViewData,
  videoNotViewUser,
  getAllViewVideoModule,
  getViewVideoModule,
  videoNotViewUserModule,
} = require("../controller/viewUserVideoController");

module.exports = (app) => {
  app.post("/viewUser", (req, res) => viewUser(req, res));
  app.get("/getViewUser", (req, res) => getViewUser(req, res));
  app.get("/getViewUserById", (req, res) => getViewUserById(req, res));
  app.get("/videoNotViewUser", (req, res) => videoNotViewUser(req, res));
  app.get("/getAllViewVideoModule", (req, res) =>
    getAllViewVideoModule(req, res)
  );
  app.get("/getViewVideoModule", (req, res) => getViewVideoModule(req, res));
  app.get("/videoNotViewUserModule", (req, res) =>
    videoNotViewUserModule(req, res)
  );
  app.put("/updateViewData", (req, res) => updateViewData(req, res));
  app.delete("/deleteViewData", (req, res) => deleteViewData(req, res));
};
