module.exports = (app) => {
  require("./src/api-route/RegisterRoute")(app);
  require("./src/api-route/LoginUserRouter")(app);
  require("./src/api-route/studentsDetailsRouter")(app);
  require("./src/api-route/attendanceRoute")(app);
  require("./src/api-route/roleRouter")(app);
  require('./src/api-route/teacherDetailsRoute')(app)
};
