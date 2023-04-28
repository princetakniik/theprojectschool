const { courses, studentdetails } = require("../Config/dbConnection");

const insertCourses = async (req, res) => {
  const { ...rest } = req.body;
  try {
    const Institute = await studentdetails.findOne({
      where: {
        user_id: rest.Institute,
      },
    });
    if (!Institute) {
      res.status(400).json({msg:`no data found this Institute id ${rest.Institute}`})
    } else if (Institute.role === "Institute") {
      const insert = await courses.create(req.body);
      res
        .status(200)
        .json({ msg: "create courses successfully", data: insert });
    } else {
      res.status(400).json({ msg: `In this user id is ${Institute.role}` });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "course is not insert data", err });
  }
};

const getCourses = async (req, res) => {
  try {
    const getData = await courses.findAll({
      where: {
        isDelete: false,
      },
    });
    res
      .status(200)
      .json({ msg: "get courses successfully all ", data: getData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "data get successfully", err });
  }
};

const getCoursesById = async (req, res) => {
  const id = req.query.id;
  try {
    const getData = await courses.findOne({
      where: {
        isDelete: false,
        user_Id: id,
      },
    });
    res
      .status(200)
      .json({ msg: `get courses By Id successfully ${id}`, data: getData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "data get successfully By Id", err });
  }
};

const updateCoursesById = async (req, res) => {
  const { ...rest } = req.body;
  const id = req.query.id;
  try {
    const updateData = await courses.update(rest, {
      where: {
        isDelete: false,
        user_Id: id,
      },
    });
    res
      .status(200)
      .json({ msg: `update courses successfully ${id}`, data: updateData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "data get successfully By Id", err });
  }
};

const deleteCoursesById = async (req, res) => {
  const id = req.query.id;
  try {
    const data = {
      isDelete: true,
    };
    const deleteData = await courses.update(data, {
      where: {
        isDelete: false,
        user_Id: id,
      },
    });
    res
      .status(200)
      .json({ msg: `update courses successfully ${id}`, data: deleteData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "data get successfully By Id", err });
  }
};
module.exports = {
  insertCourses,
  getCourses,
  getCoursesById,
  updateCoursesById,
  deleteCoursesById,
};
