const {
  createAttendance,
  getAttendanceSt,
  getAttendanceByid,
  updateAttendance,
  deleteAttendance,
  getAttendanceTe
} = require("../controller/attendanceController");

module.exports = (app) => {
  app.post("/createAttendance", (req, res) => createAttendance(req, res));
  app.get("/getAttendanceSt", (req, res) => getAttendanceSt(req, res));
  app.get("/getAttendanceTe", (req, res) => getAttendanceTe(req, res));
  app.get("/getAttendanceByid", (req, res) => getAttendanceByid(req, res));
  app.put("/updateAttendance", (req, res) => updateAttendance(req, res));
  app.delete("/deleteAttendance", (req, res) => deleteAttendance(req, res));
};
