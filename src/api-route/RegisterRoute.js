const {
  registerUser,
  getUser,
  getByIdUserDetail,
  updateUserDetails,
  deleteUserDetails,
  updatePassword,
} = require("../controller/RegisterController");

module.exports = (app) => {
  app.post("/registerUser", (req, res) => registerUser(req, res));
  app.get("/getUser", (req, res) => getUser(req, res));
  app.get("/getByIdUserDetail", (req, res) => getByIdUserDetail(req, res));
  app.put("/updateUserDetails", (req, res) => updateUserDetails(req, res));
  app.delete("/deleteUserDetails", (req, res) => deleteUserDetails(req, res));
  app.put("/updatePassword", (req, res) => updatePassword(req, res));
};
