const { usersubcourses } = require("../Config/dbConnection");
const { QueryTypes } = require("sequelize");
const db = require("../Config/dbConnection");
const nodeCron = require("node-cron");

const userSubcoursesInsert = async (req, res) => {
  const { ...rest } = req.body;
  try {
    const insertCourses = await usersubcourses.create({
      subcourses_id: rest.subcourses_id,
      course_id: rest.course_id,
      Institute_id: rest.Institute_id,
      user_id: rest.user_id,
      teacher_Id: rest.teacher_Id,
    });
    res
      .status(200)
      .json({ msg: `insert data successfully`, data: insertCourses });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Student Courses not Insert` });
  }
};

const userSubcoursesUpdate = async (req, res) => {
  const { ...rest } = req.body;
  try {
    const data = {
      subcourses_id: rest.subcourses_id,
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
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Student Courses not update`, err });
  }
};

const getSubcoursesUser = async (req, res) => {
  try {
    const getdata = await db.sequelize.query(
      `select JSON_ARRAYAGG(us.subcourses_id) as subcourse_id,JSON_ARRAYAGG(s.subcourses) as subcourses,
      JSON_ARRAYAGG(us.course_id) as course_id,JSON_ARRAYAGG(s.subcourses) as subcourses,us.user_id,us.Institute_id,us.teacher_id
       from usersubcourses as us
       inner join courses c on c.course_id=us.course_id
       inner join subcourses s on s.subcourses_id =us.subcourses_id
       where us.isDelete=false 
       group by us.user_id,us.Institute_id,us.teacher_id`,
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
      ` select JSON_ARRAYAGG(us.subcourses_id) as subcourse_id,JSON_ARRAYAGG(s.subcourses) as subcourses,
      JSON_ARRAYAGG(us.course_id) as course_id,JSON_ARRAYAGG(s.subcourses) as subcourses,us.user_id,us.Institute_id,us.teacher_id
       from usersubcourses as us
       inner join courses c on c.course_id=us.course_id
       inner join subcourses s on s.subcourses_id =us.subcourses_id
      where us.isDelete=false && us.user_id=${req.query.user_id}
      group by us.user_id,us.Institute_id,us.teacher_id`,
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

const getUserSubcourse = async (req, res) => {
  try {
    const userSubcourseDetails = await db.sequelize.query(
      `select JSON_ARRAYAGG(us.subcourses_id) as subcourse_id,JSON_ARRAYAGG(s.subcourses) as subcourses,
      JSON_ARRAYAGG(us.course_id) as course_id,JSON_ARRAYAGG(s.subcourses) as subcourses,us.user_id,us.Institute_id,us.teacher_id
       from usersubcourses as us
       inner join courses c on c.course_id=us.course_id
       inner join subcourses s on s.subcourses_id =us.subcourses_id
       where us.isDelete=false 
       group by us.user_id,us.Institute_id,us.teacher_id`,
      {
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).json({
      msg: `user Subcourse details are..`,
      data: userSubcourseDetails,
    });
  } catch (err) {
    res.status(500).json({ msg: `user subCourse details not found`, err });
  }
};

const userSubcoursesdelete = async (req, res) => {
  try {
    const data = {
      isDelete: true,
    };
    console.log("id", req.query.id);
    const deleteCourse = await usersubcourses.update(data, {
      where: {
        id: req.query.id,
      },
    });
    res
      .status(200)
      .json({ msg: `delete successfully ...`, data: deleteCourse });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Student Courses is not delete`, err });
  }
};

setInterval(function () {
  userSubCoursesCreate();
}, 5 * 60 * 1000);

// const job = nodeCron.schedule("*/5 * * * *", function () {
//   userSubCoursesCreate()
// });

const userSubCoursesCreate = async (req, res) => {
  try {
    const userSubcourseDetails = await db.sequelize.query(
      `select s.courseId ,s.subcourses_id,s.InstituteId,u.user_id  from courses c 
      inner join subcourses s on s.courseId =c.course_id && s.InstituteId =c.Institute 
      inner join usercourses u on u.course_id = c.course_id && u.Institute_id =s.InstituteId  `,
      {
        type: QueryTypes.SELECT,
      }
    );

    let resultData = [];
    for (let i = 0; i < userSubcourseDetails.length; i++) {
      var ObjAttendence = {
        user_id: userSubcourseDetails[i].user_id,
        courseId: userSubcourseDetails[i].courseId,
        InstituteId: userSubcourseDetails[i].InstituteId,
        subcourses_id: userSubcourseDetails[i].subcourses_id,
      };
      // console.log("ObjAttendence", ObjAttendence);

      const userData = await usersubcourses.findOne({
        where: {
          subcourses_id: ObjAttendence.subcourses_id,
          course_id: ObjAttendence.courseId,
          Institute_id: ObjAttendence.InstituteId,
          user_id: ObjAttendence.user_id,
        },
      });
      if (userData != null) {
        console.log("userData", userData);
        resultData.push({ userData: userData });
      } else {
        const insertCourses = await usersubcourses.create({
          subcourses_id: ObjAttendence.subcourses_id,
          course_id: ObjAttendence.courseId,
          Institute_id: ObjAttendence.InstituteId,
          user_id: ObjAttendence.user_id,
        });
        resultData.push({ insertCourses: insertCourses });
      }
    }
    console.log(resultData);
   return resultData;
   //res.status(200).json({ msg: `insert user subcourses`, data: resultData });
  } catch (err) {
    console.log(err);
    return err
   // res.status(500).json({ msg: `user subCourses not created`, err });
  }
};

module.exports = {
  userSubcoursesInsert,
  userSubcoursesUpdate,
  userSubcoursesdelete,
  getSubcoursesUser,
  getUserSubcoursesByuser_id,
  getUserSubcourse,
  userSubCoursesCreate,
};
