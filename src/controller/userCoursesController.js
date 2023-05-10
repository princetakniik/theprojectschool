const { usercourses } = require("../Config/dbConnection");
const { QueryTypes } = require("sequelize");
const db = require("../Config/dbConnection");

const userCoursesInsert = async (req, res) => {
  const { ...rest } = req.body;
  try {
    for (let i = 0; i <= rest.course_id.length; i++) {
      const insertCourses = await usercourses.create({
        course_id: rest.course_id[i],
        Institute_id: rest.Institute_id,
        user_id: rest.user_id,
        teacher_id: rest.teacher_id,
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

const userCoursesUpdate = async (req, res) => {
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
    for (let i = 0; i < rest.course_id.length; i++) {
      const data = {
        course_id: rest.course_id[i],
        Institute_id: rest.Institute_id,
        teacher_id: rest.teacher_id,
      };
      const updateCourses = await usercourses.update(data, {
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

const getCoursesUser = async (req, res) => {
  try {
    const getdata = await db.sequelize.query(
      `select group_concat(u.course_id) as course_id,
    group_concat(c.course) as course,u.user_id,u.Institute_id,u.teacher_id 
    from usercourses u
   inner join courses c on c.course_id =u.course_id
   where u.isDelete=false 
       group by u.user_id`,
      {
        type: QueryTypes.SELECT,
      }
    );

    res.status(200).json({ msg: "get attendance all", data: getdata });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `user courses not found`, err });
  }
};

const getUserCoursesByuser_id = async (req, res) => {
  try {
    const getdata = await db.sequelize.query(
      `select group_concat(u.course_id) as course_id,
    group_concat(c.course) as course,u.user_id,u.Institute_id,u.teacher_id 
    from usercourses u
   inner join courses c on c.course_id =u.course_id
   where u.isDelete=false && u.user_id=${req.query.user_id}
       group by u.user_id`,
      {
        type: QueryTypes.SELECT,
      }
    );

    res.status(200).json({ msg: "get attendance all", data: getdata });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `user courses not found`, err });
  }
};

const userCoursesdelete = async (req, res) => {
  const { ...rest } = req.body;
  try {
    const data = {
      isDelete: true,
    };
    for (let i = 0; i < rest.id.length; i++) {
      const deleteCourse = await usercourses.update(data, {
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
  userCoursesInsert,
  userCoursesUpdate,
  userCoursesdelete,
  getCoursesUser,
  getUserCoursesByuser_id,
};
