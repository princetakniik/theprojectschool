const {
  insertSetAttendance,
  getSetAttendance,
  getSetAttendanceById,
  updateSetAttendance,
  deleteSetAttendance,
  allAttendanceModuleM,
  AttendanceModuleWiseCD,
  allAttendanceModuleCD,
  AttendanceModuleWiseM,
  teacherWiseAtten,
  allTeacherWiseAtten,
  weeklyAttendance,
  weeklyAttendanceById,
  fifteenDayAttendance,
  attendanceSubmoduleCD,
  attendanceSubmoduleM,
  attendanceSubmoduleCDById,
  attendanceSubmoduleMById,
} = require("../controller/attendanceSetAdminController");

module.exports = (app) => {
  app.post("/insertSetAttendance", (req, res) => insertSetAttendance(req, res));
  app.get("/getSetAttendance", (req, res) => getSetAttendance(req, res));
  app.get("/getSetAttendanceById", (req, res) =>
    getSetAttendanceById(req, res)
  );
  app.put("/updateSetAttendance", (req, res) => updateSetAttendance(req, res));
  app.delete("/deleteSetAttendance", (req, res) =>
    deleteSetAttendance(req, res)
  );

  // module wise
  app.get("/allAttendanceModuleM", (req, res) =>
    allAttendanceModuleM(req, res)
  );
  app.get("/allAttendanceModuleCD", (req, res) =>
    allAttendanceModuleCD(req, res)
  );
  app.get("/AttendanceModuleWiseM", (req, res) =>
    AttendanceModuleWiseM(req, res)
  );
  app.get("/AttendanceModuleWiseCD", (req, res) =>
    AttendanceModuleWiseCD(req, res)
  );

  //teacher wise attendance
  app.get("/allTeacherWiseAtten", (req, res) => allTeacherWiseAtten(req, res));
  app.get("/teacherWiseAtten", (req, res) => teacherWiseAtten(req, res));

  //weeklyAttendance
  app.get("/weeklyAttendance", (req, res) => weeklyAttendance(req, res));
  app.get("/weeklyAttendanceById", (req, res) =>
    weeklyAttendanceById(req, res)
  );
  app.get("/fifteenDayAttendance", (req, res) =>
    fifteenDayAttendance(req, res)
  );

  //submodule wise

  app.get("/attendanceSubmoduleCD", (req, res) =>
    attendanceSubmoduleCD(req, res)
  );

  app.get("/attendanceSubmoduleM", (req, res) =>
    attendanceSubmoduleM(req, res)
  );
  app.get("/attendanceSubmoduleCDById", (req, res) =>
    attendanceSubmoduleCDById(req, res)
  );
  app.get("/attendanceSubmoduleMById", (req, res) =>
    attendanceSubmoduleMById(req, res)
  );
};
