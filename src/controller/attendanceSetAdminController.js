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
      inner join subcourses s2 on s2.subcourses_id =a.subCoursesId 
      where s.isDelete =FALSE && a.isDelete =FALSE && c.isDelete =FALSE && a2.isDelete =false && 
      s.role='Student' && DATE_FORMAT(a.date,"%Y-%m") = DATE_FORMAT('${date}',"%Y-%m") 
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
      `SELECT a.user_id ,a.isPersent ,a.coursesId ,a.institutionId,c.course ,s.name ,s.profilePhoto ,
     s.email,a.date,a2.minAttendance ,a2.startDate ,a2.endDate  
     from studentdetails s 
     inner join attendances a on a.institutionId =s.institutionId && a.user_id =s.user_id 
     inner join courses c on c.course_id =a.coursesId && c.Institute =a.institutionId 
     inner join attendanceadmins a2 on a2.coursesId =c.course_id && a2.institutionId =a.institutionId 
     inner join subcourses s2 on s2.subcourses_id =a.subCoursesId 
     where s.isDelete =FALSE && a.isDelete =FALSE && c.isDelete =FALSE && a2.isDelete =false && 
     s.role='Student' && a.date=CURRENT_DATE() 
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
      inner join subcourses s2 on s2.subcourses_id =a.subCoursesId 
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
      inner join subcourses s2 on s2.subcourses_id =a.subCoursesId 
      where s.isDelete =FALSE && a.isDelete =FALSE && c.isDelete =FALSE && a2.isDelete =false && s.role='Student' 
      && a.date=CURRENT_DATE() && c.course_id =${courseId} 
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

const weeklyAttendance = async (req, res) => {
  try {
    const weeklyData = await db.sequelize.query(
      `
            select s.name ,s.phone ,i.institute_id ,s.email ,c.course_id ,s2.subcourses_id,s.teacherId,
            s.profilePhoto,i.InstituteName ,c.course ,s2.subcourses,a.section,a.isPersent,a.Comment,
            a.class,a.user_id ,a.date,dayname(a.date) as dayname,MONTHNAME(a.date) as monthname     
            from attendances as a
            inner join studentdetails as s on s.user_id =a.user_id 
            inner join institutes i on i.institute_id =a.institutionId 
            inner join courses c on c.course_id =a.coursesId 
            inner join subcourses s2 on s2.subcourses_id =a.subCoursesId 
            where YEARWEEK(a.date, 1) = YEARWEEK( CURDATE() - INTERVAL 0 WEEK, 1) 
            order by a.date desc
               `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: `weekly Attendance data by user Id....`, data: weeklyData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `weekly Attendance data not found...`, err });
  }
};

const weeklyAttendanceById = async (req, res) => {
  const { userId } = req.query;
  try {
    const weeklyData = await db.sequelize.query(
      `
      select a.user_id ,s.name ,s.phone ,i.institute_id ,s.email ,c.course_id ,s2.subcourses_id ,
      s.teacherId ,s.profilePhoto,i.InstituteName ,c.course ,s2.subcourses,a.section,a.class,
      a.isPersent ,a.Comment,a.date,dayname(a.date) as dayname,MONTHNAME(a.date) as monthname
      from attendances as a
      inner join studentdetails as s on s.user_id =a.user_id 
      inner join institutes i on i.institute_id =a.institutionId 
      inner join courses c on c.course_id =a.coursesId 
      inner join subcourses s2 on s2.subcourses_id =a.subCoursesId 
      where YEARWEEK(a.date, 1) = YEARWEEK( CURDATE() - INTERVAL 0 WEEK, 1) and a.user_id=${userId} 
      order by a.date desc 
       `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: `weekly Attendance data By Id are ...`, data: weeklyData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `weekly Attendance not found By Id...`, err });
  }
};

const fifteenDayAttendance = async (req, res) => {
  const { userId } = req.query;
  try {
    const userData = await db.sequelize.query(
      `
     select a.user_id ,s.name ,s.phone ,i.institute_id ,s.email ,c.course_id ,s2.subcourses_id  ,
     s.teacherId ,s.profilePhoto,i.InstituteName ,c.course ,s2.subcourses,a.section,a.class,
     a.isPersent ,a.Comment,a.date,dayname(a.date) as dayname,MONTHNAME(a.date) as monthname
    from attendances as a
    inner join studentdetails as s on s.user_id =a.user_id 
    inner join institutes i on i.institute_id =a.institutionId 
    inner join courses c on c.course_id =a.coursesId 
    inner join subcourses s2 on s2.subcourses_id =a.subCoursesId 
    where a.date > (current_date()  - interval 15 day) and a.user_id=${userId} 
    order by a.date desc 
    `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: `last fifteen days data are...`, data: userData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `last fifteen days data not found ...`, err });
  }
};

const attendanceSubmoduleCD = async (req, res) => {
  try {
    const userData = await db.sequelize.query(
      `
      select s.user_id ,s.email,s.name ,a.isPersent ,a.Comment ,a.coursesId ,a.institutionId ,
      a.subCoursesId ,c.course ,s2.subcourses 
      from studentdetails s 
      inner join attendances a on a.institutionId =s.institutionId and a.user_id =s.user_id 
      inner join courses c on c.course_id =a.coursesId and c.Institute =a.institutionId 
      inner join subcourses s2 on s2.subcourses_id =a.subCoursesId and s2.InstituteId =a.institutionId 
      where s.isDelete =false and a.isDelete =false and s2.isDelete =false and s.role='Student' 
      and a.date=current_date() 
      `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: `attendance Submodules wise data are...`, data: userData });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ msg: `attendance Submodules wise not found....`, err });
  }
};

const attendanceSubmoduleM = async (req, res) => {
  const { date } = req.query;
  try {
    const userData = await db.sequelize.query(
      `
      select s.user_id ,s.email,s.name ,a.isPersent ,a.Comment ,a.coursesId ,a.institutionId ,
      a.subCoursesId ,c.course ,s2.subcourses 
      from studentdetails s 
      inner join attendances a on a.institutionId =s.institutionId and a.user_id =s.user_id 
      inner join courses c on c.course_id =a.coursesId and c.Institute =a.institutionId 
      inner join subcourses s2 on s2.subcourses_id =a.subCoursesId and s2.InstituteId =a.institutionId 
      where s.isDelete =false and a.isDelete =false and s2.isDelete =false and s.role='Student' and
      DATE_FORMAT(a.date,"%Y-%m") = DATE_FORMAT('${date}',"%Y-%m") 
      `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: `attendance Submodules wise data are...`, data: userData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `attendance Submodules wise not found`, err });
  }
};

const attendanceSubmoduleCDById = async (req, res) => {
  const { subCoursesId } = req.query;
  try {
    const userData = await db.sequelize.query(
      `
      select s.user_id ,s.email,s.name ,a.isPersent ,a.Comment ,a.coursesId ,a.institutionId ,a.subCoursesId ,c.course ,s2.subcourses 
      from studentdetails s 
      inner join attendances a on a.institutionId =s.institutionId and a.user_id =s.user_id 
      inner join courses c on c.course_id =a.coursesId and c.Institute =a.institutionId 
      inner join subcourses s2 on s2.subcourses_id =a.subCoursesId and s2.InstituteId =a.institutionId 
      where s.isDelete =false and a.isDelete =false and s2.isDelete =false and s.role='Student' and 
      a.date=current_date() and a.subCoursesId =${subCoursesId} 
      `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: `attendance Submodules wise data are...`, data: userData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `attendance Submodules wise not found`, err });
  }
};

const attendanceSubmoduleMById = async (req, res) => {
  const { date, subCoursesId } = req.query;
  try {
    const userData = await db.sequelize.query(
      `
      select s.user_id ,s.email,s.name ,a.isPersent ,a.Comment ,a.coursesId ,a.institutionId ,
      a.subCoursesId ,c.course ,s2.subcourses 
      from studentdetails s 
      inner join attendances a on a.institutionId =s.institutionId and a.user_id =s.user_id 
      inner join courses c on c.course_id =a.coursesId and c.Institute =a.institutionId 
      inner join subcourses s2 on s2.subcourses_id =a.subCoursesId and s2.InstituteId =a.institutionId 
      where s.isDelete =false and a.isDelete =false and s2.isDelete =false and s.role='Student' and 
      DATE_FORMAT(a.date,"%Y-%m") = DATE_FORMAT('${date}',"%Y-%m") and a.subCoursesId =${subCoursesId} 
   `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: `attendance Submodules wise data are...`, data: userData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `attendance Submodules wise not found`, err });
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
  allTeacherWiseAtten,
  weeklyAttendance,
  weeklyAttendanceById,
  fifteenDayAttendance,
  attendanceSubmoduleCD,
  attendanceSubmoduleM,
  attendanceSubmoduleCDById,
  attendanceSubmoduleMById,
};
