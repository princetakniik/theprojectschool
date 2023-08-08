const {
  userSubcoursesInsert,
  userSubcoursesUpdate,
  getSubcoursesUser,
  userSubcoursesdelete,
  getUserSubcoursesByuser_id,
  getUserSubcourse,
  userSubCoursesCreate,
  getUserRatingBySubcourses,
} = require("../controller/userSubcoursesController");

module.exports = (app) => {
  app.post("/userSubcoursesInsert", (req, res) =>
    userSubcoursesInsert(req, res)
  );
  app.get("/getSubcoursesUser", (req, res) => getSubcoursesUser(req, res));
  app.get("/getUserSubcoursesByuser_id", (req, res) =>
    getUserSubcoursesByuser_id(req, res)
  );
  app.get("/getUserSubcourse", (req, res) => getUserSubcourse(req, res));
  app.get("/getUserRatingBySubcourses", (req, res) =>
    getUserRatingBySubcourses(req, res)
  );
  app.put("/userSubcoursesUpdate", (req, res) =>
    userSubcoursesUpdate(req, res)
  );
  app.delete("/userSubcoursesdelete", (req, res) =>
    userSubcoursesdelete(req, res)
  );
  app.post("/userSubCoursesCreate", (req, res) =>
    userSubCoursesCreate(req, res)
  );
};
