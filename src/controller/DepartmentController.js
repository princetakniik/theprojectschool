const { department } = require("../Config/dbConnection");

const insertDepartment = async (req, res) => {
  const { ...rest } = req.body;
  try {
    const Department = await department.findOne({
      where: { departmentName: rest.departmentName },
    });
    if (Department != null) {
      res.status(400).json({ msg: `already persent` });
    } else {
      const insert = await department.create(req.body);
      res
        .status(200)
        .json({ msg: "create courses successfully", data: insert });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "course is not insert data", err });
  }
};

const getDepartment = async (req, res) => {
  try {
    const getData = await department.findAll({
      where: {
        isDelete: false,
      },
    });
    res
      .status(200)
      .json({ msg: "get Department successfully all ", data: getData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "data get not successfully", err });
  }
};

const getDepartmentById = async (req, res) => {
  try {
    const getData = await department.findOne({
      where: {
        isDelete: false,
        id: req.query.id,
      },
    });
    res.status(200).json({
      msg: `get Department By Id successfully ${req.query.id}`,
      data: getData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "data get not  successfully By Id", err });
  }
};

const updateDepartmentById = async (req, res) => {
  const { ...rest } = req.body;
  const id = req.query.id;
  try {
    const departmentName = await department.findOne({
      where: {
        departmentName: rest.departmentName,
        isDelete: false,
      },
    });
    if (departmentName === null) {
      const updateData = await department.update(rest, {
        where: {
          isDelete: false,
          id: id,
        },
      });
      res.status(200).json({
        msg: `update department successfully ${id}`,
        data: updateData,
      });
    } else {
      res.status(401).json({ msg: `all ready persent this department` });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "data update not successfully By Id", err });
  }
};

const deleteDepartmentById = async (req, res) => {
  try {
    const data = {
      isDelete: true,
    };
    const deleteData = await department.update(data, {
      where: {
        isDelete: false,
        id: req.query.id,
      },
    });
    res.status(200).json({
      msg: `delete department successfully ${req.query.id}`,
      data: deleteData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "data delete successfully By Id", err });
  }
};

module.exports = {
  insertDepartment,
  getDepartment,
  getDepartmentById,
  updateDepartmentById,
  deleteDepartmentById,
};
