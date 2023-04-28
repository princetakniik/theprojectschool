const {
  insertsubCourses,
  updatesubCoursesById,
  getsubCoursesById,
  deletesubCoursesById,
  getsubCourses,
} = require("../controller/subCoursesController");

module.exports = (app) => {
  app.post("/insertsubCourses", (req, res) => insertsubCourses(req, res));
  app.get("/getsubCourses", (req, res) => getsubCourses(req, res));
  app.get("/getsubCoursesById", (req, res) => getsubCoursesById(req, res));
  app.put("/updatesubCoursesById", (req, res) =>
    updatesubCoursesById(req, res)
  );
  app.delete("/deletesubCoursesById", (req, res) =>
    deletesubCoursesById(req, res)
  );

};
