const { courses, institute } = require("../Config/dbConnection");

const insertCourses = async (req, res) => {
  const { ...rest } = req.body;
  try {
    const Institute = await institute.findOne({
      where: {
        institute_id: rest.Institute,
        isDelete:false
      },
    });
    if (!Institute) {
      res.status(400).json({msg:`no data found this Institute id ${rest.Institute}`})
    } else {
      const insert = await courses.create(req.body);
      res
        .status(200)
        .json({ msg: "create courses successfully", data: insert });
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
  const course_id = req.query.course_id;
  try {
    const getData = await courses.findOne({
      where: {
        isDelete: false,
        course_id: course_id,
      },
    });
    res
      .status(200)
      .json({ msg: `get courses By Id successfully ${course_id}`, data: getData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "data get successfully By Id", err });
  }
};

const updateCoursesById = async (req, res) => {
  const { ...rest } = req.body;
  const course_id = req.query.course_id;
  try {
    const updateData = await courses.update(rest, {
      where: {
        isDelete: false,
        course_id: course_id,
      },
    });
    res
      .status(200)
      .json({ msg: `update courses successfully ${course_id}`, data: updateData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "data get successfully By Id", err });
  }
};

const deleteCoursesById = async (req, res) => {
  const course_id = req.query.course_id;
  try {
    const data = {
      isDelete: true,
    };
    const deleteData = await courses.update(data, {
      where: {
        isDelete: false,
        course_id: course_id,
      },
    });
    res
      .status(200)
      .json({ msg: `update courses successfully ${course_id}`, data: deleteData });
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
