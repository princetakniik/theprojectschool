const {
  studentQualification,
  getstudentQualification,
  getstudentQualificationById,
  updatestudentQualificationById,
  deletestudentQualificationById,
  teacherQualification,
  getTeacherQualification,
  getTeacherQualificationById,
  updateTeacherQualificationById,
  deleteTeacherQualificationById,
} = require("../controller/QualificationsController");

module.exports = (app) => {
  app.post("/studentQualification", (req, res) =>
    studentQualification(req, res)
  );
  app.get("/getstudentQualification", (req, res) =>
    getstudentQualification(req, res)
  );
  app.get("/getstudentQualificationById", (req, res) =>
    getstudentQualificationById(req, res)
  );
  app.put("/updatestudentQualificationById", (req, res) =>
    updatestudentQualificationById(req, res)
  );
  app.delete("/deletestudentQualificationById", (req, res) =>
    deletestudentQualificationById(req, res)
  );
  app.post("/teacherQualification", (req, res) =>
    teacherQualification(req, res)
  );
  app.get("/getTeacherQualification", (req, res) =>
    getTeacherQualification(req, res)
  );
  app.get("/getTeacherQualificationById", (req, res) =>
    getTeacherQualificationById(req, res)
  );
  app.put("/updateTeacherQualificationById", (req, res) =>
    updateTeacherQualificationById(req, res)
  );
  app.delete("/deleteTeacherQualificationById", (req, res) =>
    deleteTeacherQualificationById(req, res)
  );
};
