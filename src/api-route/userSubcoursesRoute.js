const {
  userSubcoursesInsert,
  userSubcoursesUpdate,
  getSubcoursesUser,
  userSubcoursesdelete,
  getUserSubcoursesByuser_id,
} = require("../controller/userSubcoursesController");

module.exports = (app) => {
  app.post("/userSubcoursesInsert", (req, res) =>
    userSubcoursesInsert(req, res)
  );
  app.get("/getSubcoursesUser", (req, res) => getSubcoursesUser(req, res));
  app.get("/getUserSubcoursesByuser_id", (req, res) =>
  getUserSubcoursesByuser_id(req, res)
  );
  app.put("/userSubcoursesUpdate", (req, res) =>
    userSubcoursesUpdate(req, res)
  );
  app.delete("/userSubcoursesdelete", (req, res) => userSubcoursesdelete);
};
