const {
  insertCourses,
  getCourses,
  getCoursesById,
  updateCoursesById,
  deleteCoursesById,
} = require("../controller/coursesController");

module.exports = (app) => {
  app.post("/insertCourses", (req, res) => insertCourses(req, res));
  app.get("/getCourses", (req, res) => getCourses(req, res));
  app.get("/getCoursesById", (req, res) => getCoursesById(req, res));
  app.put("/updateCoursesById", (req, res) => updateCoursesById(req, res));
  app.delete("/deleteCoursesById", (req, res) => deleteCoursesById(req, res));
};
