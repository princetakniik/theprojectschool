const {
  userCoursesInsert,
  userCoursesUpdate,
  userCoursesdelete,
  getCoursesUser,
  getUserCoursesByuser_id,
} = require("../controller/userCoursesController");

module.exports = (app) => {
  app.post("/userCoursesInsert", (req, res) =>
  userCoursesInsert(req, res)
  );
  app.get('/getCoursesUser',(req,res)=>getCoursesUser(req,res));
  app.get('/getUserCoursesByuser_id',(req,res)=>getUserCoursesByuser_id(req,res));
  app.put("/userCoursesUpdate", (req, res) =>
  userCoursesUpdate(req, res)
  );
  app.delete("/userCoursesdelete", (req, res) =>
  userCoursesdelete(req, res)
  );
};
