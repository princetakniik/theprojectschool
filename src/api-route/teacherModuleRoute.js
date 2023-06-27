const {
  insertTeacherModule,
  getTeacherModule,
  TeacherModuleById,
  updateTeacherModule,
  deleteTeacherModule,
} = require("../controller/teacherModuleController");

module.exports = (app) => {
  app.post("/insertTeacherModule", (req, res) => insertTeacherModule(req, res));
  app.get("/getTeacherModule", (req, res) => getTeacherModule(req, res));
  app.get("/TeacherModuleById", (req, res) => TeacherModuleById(req, res));
  app.put("/updateTeacherModule", (req, res) => updateTeacherModule(req, res));
  app.delete("/deleteTeacherModule", (req, res) =>
    deleteTeacherModule(req, res)
  );
};
