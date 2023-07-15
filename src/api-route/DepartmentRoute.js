const {
  insertDepartment,
  getDepartment,
  getDepartmentById,
  updateDepartmentById,
  deleteDepartmentById,
} = require("../controller/DepartmentController");

module.exports = (app) => {
  app.post("/insertDepartment", (req, res) => insertDepartment(req, res));
  app.get("/getDepartment", (req, res) => getDepartment(req, res));
  app.get("/getDepartmentById ", (req, res) => getDepartmentById(req, res));
  app.put("/updateDepartmentById", (req, res) =>
    updateDepartmentById(req, res)
  );
  app.delete("/deleteDepartmentById", (req, res) =>
    deleteDepartmentById(req, res)
  );
};
