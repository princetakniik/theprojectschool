const { usersubcourses } = require("../Config/dbConnection");
const { QueryTypes } = require("sequelize");
const db = require("../Config/dbConnection");

const userSubcoursesInsert = async (req, res) => {
  const { ...rest } = req.body;
  try {
    for (let i = 0; i <= rest.subcourses_id.length; i++) {
      const insertCourses = await usersubcourses.create({
        subcourses_id: rest.subcourses_id[i],
        course_id: rest.course_id,
        Institute_id: rest.Institute_id,
        user_id:rest.user_id,
        teacher_Id: rest.teacher_Id,
      });
      res
        .status(200)
        .json({ msg: `insert data successfully`, data: insertCourses });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Student Courses not Insert` });
  }
};

const userSubcoursesUpdate = async (req, res) => {
  const { ...rest } = req.body;
  try {
    // const isDelete = {
    //   isDelete: true,
    // };
    // const userCorseDelete = await userCourses.update(isDelete, {
    //   where: {
    //     user_id: req.query.user_id,
    //   },
    // });
    for (let i = 0; i < rest.subcourses_id.length; i++) {
      const data = {
        subcourses_id: rest.subcourses_id[i],
        course_id: rest.course_id,
        Institute_id: rest.Institute_id,
        studentId_id: rest.studentId_id,
        teacher_Id: rest.teacher_Id,
      };
      const updateCourses = await usersubcourses.update(data, {
        where: {
          id: req.query.id,
        },
      });
      res
        .status(200)
        .json({ msg: `update courses successfully`, data: updateCourses });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Student Courses not update`, err });
  }
};

const getSubcoursesUser = async (req, res) => {
  try {
    const getdata = await db.sequelize.query(
      ` select group_concat(us.subcourses_id) as subcourse_id,group_concat(s.subcourses) as subcourses,
      group_concat(us.course_id) as course_id,group_concat(s.subcourses) as subcourses,us.user_id,us.Institute_id,us.teacher_id
      from usersubcourses as us
      inner join courses c on c.course_id=us.course_id
      inner join subcourses s on s.subcourses_id =us.subcourses_id
      where us.isDelete=false 
      group by us.user_id`,
      {
        type: QueryTypes.SELECT,
      }
    );

    res.status(200).json({ msg: "get subCourses", data: getdata });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `user courses not found`, err });
  }
};

const getUserSubcoursesByuser_id = async (req, res) => {
  try {
    const getdata = await db.sequelize.query(
      ` select group_concat(us.subcourses_id) as subcourse_id,group_concat(s.subcourses) as subcourses,
      group_concat(us.course_id) as course_id,group_concat(s.subcourses) as subcourses,us.user_id,us.Institute_id,us.teacher_id
      from usersubcourses as us
      inner join courses c on c.course_id=us.course_id
      inner join subcourses s on s.subcourses_id =us.subcourses_id
      where us.isDelete=false && us.user_id=${req.query.user_id}
      group by us.user_id`,
      {
        type: QueryTypes.SELECT,
      }
    );

    res.status(200).json({ msg: "get subcourses", data: getdata });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `user subcourses not found`, err });
  }
};


const userSubcoursesdelete = async (req, res) => {
  const { ...rest } = req.body;
  try {
    const data = {
      isDelete: true,
    };
    for (let i = 0; i < rest.id.length; i++) {
      const deleteCourse = await usersubcourses.update(data, {
        where: {
          id: rest.id[i],
        },
      });
      res
        .status(200)
        .json({ msg: `delete successfully ...`, data: deleteCourse });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Student Courses is not delete`, err });
  }
};

module.exports = {
  userSubcoursesInsert,
  userSubcoursesUpdate,
  userSubcoursesdelete,
  getSubcoursesUser,
  getUserSubcoursesByuser_id,
};
