const {
  createAttendance,
  getAttendanceSt,
  getAttendanceByid,
  updateAttendance,
  deleteAttendance,
  getAttendanceTe,
  getAttendanceCM,
  getAttendanceSummeryMonthly,
  getAttendanceBetweenMonth,
  getAttendanceSubCourses,
 
} = require("../controller/attendanceController");

module.exports = (app) => {
  app.post("/createAttendance", (req, res) => createAttendance(req, res));
  app.get("/getAttendanceSt", (req, res) => getAttendanceSt(req, res));
  app.get("/getAttendanceStClass", (req, res) =>
    getAttendanceStClass(req, res)
  );
  app.get("/getAttendanceStSection", (req, res) =>
    getAttendanceStSection(req, res)
  );
  app.get("/getAttendanceTe", (req, res) => getAttendanceTe(req, res));
  app.get("/getAttendanceByid", (req, res) => getAttendanceByid(req, res));
  app.put("/updateAttendance", (req, res) => updateAttendance(req, res));
  app.delete("/deleteAttendance", (req, res) => deleteAttendance(req, res));
  app.get("/getAttendanceCM", (req, res) => getAttendanceCM(req, res));
  app.get("/getAttendanceSummeryMonthly", (req, res) =>
    getAttendanceSummeryMonthly(req, res)
  );
  app.get("/getAttendanceBetweenMonth", (req, res) =>
    getAttendanceBetweenMonth(req, res)
  );
  app.get("/getAttendanceSubCourses", (req, res) =>
    getAttendanceSubCourses(req, res)
  );


};
