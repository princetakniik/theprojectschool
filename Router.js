module.exports = (app) => {
  require("./src/api-route/RegisterRoute")(app);
  require("./src/api-route/LoginUserRouter")(app);
  require("./src/api-route/studentsDetailsRouter")(app);
  require("./src/api-route/attendanceRoute")(app);
  require("./src/api-route/roleRouter")(app);
  require("./src/api-route/teacherDetailsRoute")(app);
  require("./src/api-route/CoursesRoute")(app);
  require("./src/api-route/subcoursesRoute")(app);
  require("./src/api-route/InstituteRoute")(app);
  require("./src/api-route/userCoursesRouter")(app);
  require("./src/api-route/userSubcoursesRoute")(app);
  require("./src/api-route/DepartmentRoute")(app);
  require("./src/api-route/QualificationsRoute")(app);
  require("./src/api-route/SkillRoute")(app);
  require("./src/api-route/userSkillRoute")(app);
  require('./src/api-route/principalRouter')(app);
};
