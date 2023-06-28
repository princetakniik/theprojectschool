const { QueryTypes } = require("sequelize");
const db = require("../Config/dbConnection");
const { attendanceadmin } = require("../Config/dbConnection");

const insertSetAttendance = async (req, res) => {
  const { ...rest } = req.body;
  try {
    const insertData = await attendanceadmin.create({
      minAttendance: rest.minAttendance,
      coursesId: rest.coursesId,
      institutionId: rest.institutionId,
      startDate: rest.startDate,
      endDate: rest.endDate,
    });
    res.status(200).json({
      msg: `admin set attendance min persent are ...`,
      data: insertData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `attendance data not insert ....`, err });
  }
};

const getSetAttendance = async (req, res) => {
  try {
    const setData = await db.sequelize.query(
      `
         select a.id ,a.minAttendance ,a.coursesId ,a.institutionId ,a.startDate ,a.endDate 
         from attendanceadmins a 
         where a.isDelete =false 
`,
      {
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).json({ msg: `Set Attendance data are...`, data: setData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `data not found....`, err });
  }
};

const getSetAttendanceById = async (req, res) => {
  const { id } = req.query;
  try {
    const setData = await db.sequelize.query(
      `
      select a.id ,a.minAttendance ,a.coursesId ,a.institutionId ,a.startDate ,a.endDate 
      from attendanceadmins a 
      where a.isDelete =false && a.id =${id}
  `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).json({ msg: `Set Attendance data are...`, data: setData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `data not found....`, err });
  }
};

const updateSetAttendance = async (req, res) => {
  const { id } = req.query;
  const { ...rest } = req.body;
  try {
    const data = {
      minAttendance: rest.minAttendance,
      coursesId: rest.coursesId,
      institutionId: rest.institutionId,
      startDate: rest.startDate,
      endDate: rest.endDate,
    };
    const setData = await attendanceadmin.update(data, {
      where: {
        id: id,
        isDelete: false,
      },
    });
    res.status(200).json({ msg: `attendance update....`, data: setData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `data not update....`, err });
  }
};

const deleteSetAttendance = async (req, res) => {
  const { id } = req.query;
  try {
    const data = {
      isDelete: true,
    };
    const setData = await attendanceadmin.update(data, {
      where: {
        id: id,
        isDelete: false,
      },
    });
    res
      .status(200)
      .json({ msg: `Set Attendance data is deleted...`, data: setData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `data not deleted ....`, err });
  }
};

//Attendance    module wise

const allAttendanceModuleM = async (req, res) => {
  const { date } = req.query;
  console.log("date", date);

  try {
    const userData = await db.sequelize.query(
      `SELECT a.user_id ,a.isPersent ,a.coursesId ,a.institutionId,c.course ,s.name ,s.profilePhoto 
      ,s.email,a.date ,a2.minAttendance ,a2.startDate ,a2.endDate 
      from studentdetails s 
      inner join attendances a on a.institutionId =s.institutionId && a.user_id =s.user_id 
      inner join courses c on c.course_id =a.coursesId && c.Institute =a.institutionId 
      inner join attendanceadmins a2 on a2.coursesId =c.course_id && a2.institutionId =a.institutionId 
      where s.isDelete =FALSE && a.isDelete =FALSE && c.isDelete =FALSE && a2.isDelete =false && s.role='Student' && 
      DATE_FORMAT(a.date,"%Y-%m") = DATE_FORMAT('${date}',"%Y-%m")
      order by a.date DESC 
  `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: `Attendance Module wise data...`, data: userData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Attendance Module not found...`, err });
  }
};

const allAttendanceModuleCD = async (req, res) => {
  try {
    const userData = await db.sequelize.query(
      `SELECT a.user_id ,a.isPersent ,a.coursesId ,a.institutionId,c.course ,s.name ,s.profilePhoto ,s.email,a.date,a2.minAttendance ,a2.startDate ,a2.endDate  
      from studentdetails s 
     inner join attendances a on a.institutionId =s.institutionId && a.user_id =s.user_id 
     inner join courses c on c.course_id =a.coursesId && c.Institute =a.institutionId 
     inner join attendanceadmins a2 on a2.coursesId =c.course_id && a2.institutionId =a.institutionId 
     where s.isDelete =FALSE && a.isDelete =FALSE && c.isDelete =FALSE && a2.isDelete =false && s.role='Student' && a.date=CURRENT_DATE()
     order by a.date DESC 
  `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: `Attendance Module wise data...`, data: userData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Attendance Module not found...`, err });
  }
};

const AttendanceModuleWiseM = async (req, res) => {
  const { courseId, date } = req.query;
  console.log("api data....", courseId, date);
  try {
    const userData = await db.sequelize.query(
      `SELECT a.user_id ,a.isPersent ,a.coursesId ,a.institutionId,c.course ,s.name ,s.profilePhoto,
      s.email,a.date,a2.minAttendance ,a2.startDate ,a2.endDate  
      from studentdetails s 
      inner join attendances a on a.institutionId =s.institutionId && a.user_id =s.user_id 
      inner join courses c on c.course_id =a.coursesId && c.Institute =a.institutionId 
      inner join attendanceadmins a2 on a2.coursesId =c.course_id && a2.institutionId =a.institutionId 
      where s.isDelete =FALSE && a.isDelete =FALSE && c.isDelete =FALSE && a2.isDelete =false && s.role='Student' &&
      DATE_FORMAT(a.date, "%Y-%m") = DATE_FORMAT('${date}', "%Y-%m") && c.course_id =${courseId}
      order by a.date DESC
  `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).json({ msg: `module wise data are...`, data: userData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `module wise data not found...`, err });
  }
};

const AttendanceModuleWiseCD = async (req, res) => {
  const { courseId } = req.query;
  try {
    const userData = await db.sequelize.query(
      `SELECT a.user_id ,a.isPersent ,a.coursesId ,a.institutionId,c.course ,s.name ,s.profilePhoto ,
      s.email,a.date ,a2.minAttendance ,a2.startDate ,a2.endDate 
      from studentdetails s 
      inner join attendances a on a.institutionId =s.institutionId && a.user_id =s.user_id 
      inner join courses c on c.course_id =a.coursesId && c.Institute =a.institutionId 
      inner join attendanceadmins a2 on a2.coursesId =c.course_id && a2.institutionId =a.institutionId
      where s.isDelete =FALSE && a.isDelete =FALSE && c.isDelete =FALSE && a2.isDelete =false && s.role='Student' && a.date=CURRENT_DATE() && c.course_id =${courseId}
      order by a.date DESC
  `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).json({ msg: `module wise data are...`, data: userData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `module wise data not found...`, err });
  }
};

const allTeacherWiseAtten = async (req, res) => {
  try {
    const userData = await db.sequelize.query(
      `
select s.user_id ,s.email ,s.name ,a.isPersent ,a.coursesId ,a.institutionId ,c.course ,t.userId as teacherId
from studentdetails s 
inner join attendances a on a.institutionId =s.institutionId && s.user_id =a.user_id 
inner join teachermodules t on t.instituteId =a.institutionId && t.courseId =a.coursesId && t.teachDate =a.date
inner join courses c on c.course_id =t.courseId && c.Institute =t.instituteId 
where s.isDelete =false && a.isDelete =false && t.isDelete =false
`,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: `all teacher wise data are...`, data: userData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `all teacher wise data not found....`, err });
  }
};

const teacherWiseAtten = async (req, res) => {
  const { teacherId } = req.query;
  try {
    const userData = await db.sequelize.query(
      `select s.user_id ,s.email ,s.name ,a.isPersent ,a.coursesId ,a.institutionId ,c.course 
      from studentdetails s 
      inner join attendances a on a.institutionId =s.institutionId && s.user_id =a.user_id 
      inner join teachermodules t on t.instituteId =a.institutionId && t.courseId =a.coursesId && t.teachDate =a.date
      inner join courses c on c.course_id =t.courseId && c.Institute =t.instituteId 
      where s.isDelete =false && a.isDelete =false && t.isDelete =false && t.userId =${teacherId}
`,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: `teacher wise attendance are....`, data: userData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `data not found ....`, err });
  }
};

module.exports = {
  insertSetAttendance,
  getSetAttendance,
  getSetAttendanceById,
  updateSetAttendance,
  deleteSetAttendance,
  allAttendanceModuleM,
  allAttendanceModuleCD,
  AttendanceModuleWiseM,
  AttendanceModuleWiseCD,
  teacherWiseAtten,
  allTeacherWiseAtten
};
