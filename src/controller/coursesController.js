const { QueryTypes } = require("sequelize");
const db = require("../Config/dbConnection");
const { courses, institute } = require("../Config/dbConnection");

const insertCourses = async (req, res) => {
  const { ...rest } = req.body;
  try {
    const Institute = await institute.findOne({
      where: {
        institute_id: rest.Institute,
        isDelete: false,
      },
    });
    const courseName = await courses.findOne({
      where: {
        course: rest.course,
        Institute: rest.Institute,
        isDelete: false,
      },
    });
    if (Institute == null) {
      res
        .status(400)
        .json({ msg: `no data found this Institute id ${rest.Institute}` });
    } else if (courseName != null) {
      res
        .status(400)
        .json({ msg: `all ready data found this course ${rest.Institute}` });
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

const getCoursesAll = async (req, res) => {
  try {
    const getData = await db.sequelize.query(`
    select c.course_id ,c.Institute ,c.course ,c.startDate ,c.endDate ,c.startTime ,c.endTime ,
    c.grading ,c.coursesImageUrl 
    from courses c 
    where c.isDelete =false 
    `,{type:QueryTypes.SELECT})
    res
      .status(200)
      .json({ msg: "get courses successfully all ", data: getData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "data get successfully", err });
  }
};

const getCourses = async (req, res) => {
  const {Institute}=req.query
  try {
    const getData = await db.sequelize.query(`
    select c.course_id ,c.Institute ,c.course ,c.startDate ,c.endDate ,c.startTime ,c.endTime ,
    c.grading ,c.coursesImageUrl 
    from courses c 
    where c.isDelete =false and c.Institute =${Institute}
    `,{type:QueryTypes.SELECT})
    res
      .status(200)
      .json({ msg: "get courses successfully all ", data: getData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "data get successfully", err });
  }
};

const getCoursesById = async (req, res) => {
  const { course_id, Institute } = req.query;
  try {
    const getData = await db.sequelize.query(`
    select c.course_id ,c.Institute ,c.course ,c.startDate ,c.endDate ,c.startTime ,c.endTime ,
    c.grading ,c.coursesImageUrl 
    from courses c 
    where c.isDelete =false and c.course_id =${course_id} 
    `,{type:QueryTypes.SELECT})
    res.status(200).json({
      msg: `get courses By Id successfully ${course_id}`,
      data: getData,
    });
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
    res.status(200).json({
      msg: `update courses successfully ${course_id}`,
      data: updateData,
    });
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
    res.status(200).json({
      msg: `update courses successfully ${course_id}`,
      data: deleteData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "data get successfully By Id", err });
  }
};

module.exports = {
  insertCourses,
  getCoursesAll,
  getCourses,
  getCoursesById,
  updateCoursesById,
  deleteCoursesById,
};
