const {
  studentdetails,
  attendance,
  institute,
  usercourses,
  usersubcourses,
} = require("../Config/dbConnection");
const { QueryTypes } = require("sequelize");
const db = require("../Config/dbConnection");
const moment = require("moment");

const createAttendance = async (req, res) => {
  // console.log("reqApi..data..", req.body);
  const {
    user_id,
    Comment,
    date,
    isPersent,
    Class,
    section,
    coursesId,
    institutionId,
    subCoursesId,
  } = req.body;
  //  console.log("date", date);

  try {
    const getData = await studentdetails.findOne({
      where: {
        user_id: user_id,
        isDelete: false,
      },
    });
    //console.log("data", getData);

    const getAttendance = await attendance.findOne({
      where: {
        user_id: user_id,
        date: date,
        institutionId: institutionId,
        coursesId: coursesId,
        subCoursesId: subCoursesId,
        isDelete: false,
      },
    });
    //console.log("getAttendance", getAttendance);

    const instituteData = await institute.findOne({
      where: {
        institute_id: institutionId,
        isDelete: false,
      },
    });
    //console.log("instituteData", instituteData);

    const courseData = await usercourses.findOne({
      where: {
        user_id: user_id,
        course_id: coursesId,
        Institute_id: institutionId,
        isDelete: false,
      },
    });
    // console.log("courseData", courseData);

    const subcourseData = await usersubcourses.findOne({
      where: {
        user_id: user_id,
        subcourses_id: subCoursesId,
        Institute_id: institutionId,
        course_id: coursesId,
        isDelete: false,
      },
    });
    //console.log("subcourseData", subcourseData);

    if (getData === null) {
      res.status(400).json({ msg: "user details is not persent" });
    } else if (getData.role == "Admin") {
      res.status(400).json({ msg: "Admin id not attendance" });
    } else if (getData.role == "Principal") {
      res.status(400).json({ msg: "Principal id not attendance" });
    } else if (instituteData === null) {
      res.status(400).json({ msg: "Institute is not persent" });
    } else if (courseData === null) {
      res.status(400).json({ msg: "courseData is not persent" });
    } else if (subcourseData === null) {
      res.status(400).json({ msg: "subcourseData is not persent" });
    } else if (getAttendance !== null) {
      res.status(400).json({ msg: `user is Allready persent ${user_id}` });
    } else {
      const createData = await attendance.create({
        user_id: user_id,
        Comment: Comment,
        isPersent: isPersent,
        section: section,
        class: Class,
        coursesId: coursesId,
        institutionId: institutionId,
        subCoursesId: subCoursesId,
        date: date,
      });
   console.log("createData", createData);
      res
        .status(200)
        .json({ msg: `user is persent today ${user_id}`, data: createData });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Absent today ..." });
  }
};

const getAttendanceSt = async (req, res) => {
  try {
    const getdata = await db.sequelize.query(
      `select s.name ,s.phone ,i.institute_id ,s.email ,c.course_id ,s2.subcourses_id ,
      s.class ,s.section ,s.profilePhoto,i.InstituteName,c.course,
      s2.subcourses ,a.isPersent ,a.Comment,a.date   
            from attendances as a
             inner join institutes i on i.institute_id =a.institutionId 
             inner join courses c on c.course_id =a.coursesId 
            inner join subcourses s2 on s2.subcourses_id =a.subCoursesId
            inner join studentdetails as s on s.user_id =a.user_id  
            where s.role='Student' && a.date = CURRENT_DATE() && a.isDelete =false`,
      {
        //&& ad.date=${date}
        type: QueryTypes.SELECT,
      }
    );

    res.status(200).json({ msg: "get attendance all", data: getdata });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "attendance not found today", err });
  }
};

const getAttendanceTe = async (req, res) => {
  try {
    const getdata = await db.sequelize.query(
      `select s.name ,s.phone ,i.institute_id ,s.email ,c.course_id ,s2.subcourses_id,
      s.user_id as teacherId ,s.profilePhoto,i.InstituteName ,c.course ,
      s2.subcourses ,a.isPersent ,a.Comment,a.section,a.class,a.date    
            from attendances as a
            inner join studentdetails as s on s.user_id =a.user_id 
            inner join institutes i on i.institute_id =a.institutionId 
            inner join courses c on c.course_id =a.coursesId 
            inner join subcourses s2 on s2.subcourses_id =a.subCoursesId 
            where s.role='Teacher' && a.date = CURRENT_DATE() && a.isDelete =false`,
      {
        type: QueryTypes.SELECT,
      }
    );

    res.status(200).json({ msg: "get attendance all", data: getdata });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "attendance not found today", err });
  }
};

const getAttendanceByid = async (req, res) => {
  const { userId } = req.body;
  try {
    const getDataById = await db.sequelize.query(
      `   select s.name ,s.phone ,i.institute_id,s.email ,c.course_id ,s2.subcourses_id ,
      s.teacherId ,s.profilePhoto,i.InstituteName ,c.course ,
      s2.subcourses ,a.isPersent ,a.Comment,a.section,a.class,a.date    
            from attendances as a
            inner join studentdetails as s on s.user_id =a.user_id 
            inner join institutes i on i.institute_id =a.institutionId 
            inner join courses c on c.course_id =a.coursesId 
            inner join subcourses s2 on s2.subcourses_id =a.subCoursesId  
            where a.user_id=${userId} && a.date = CURRENT_DATE() && a.isDelete =false`,
      {
        type: QueryTypes.SELECT,
      }
    );

    res.status(200).json({ msg: "get attendance all", data: getDataById });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "attendance not found found by id ", err });
  }
};

const getAttendanceCM = async (req, res) => {
  const { userId } = req.query;
  console.log("user", userId);
  try {
    const getdata = await db.sequelize.query(
      `   select s.name ,s.phone ,i.institute_id ,s.email ,c.course_id ,s2.subcourses_id  ,
      s.teacherId ,s.profilePhoto,i.InstituteName ,c.course ,
      s2.subcourses,a.isPersent ,a.Comment,a.section,a.class,a.date     
            from attendances as a
            inner join studentdetails as s on s.user_id =a.user_id 
            inner join institutes i on i.institute_id =a.institutionId 
            inner join courses c on c.course_id =a.coursesId 
            inner join subcourses s2 on s2.subcourses_id =a.subCoursesId 
            where a.user_id=${userId} && DATE_FORMAT(a.date, "%Y %m") =DATE_FORMAT(CURRENT_DATE(), "%Y %m") && a.isDelete =false `,
      {
        type: QueryTypes.SELECT,
      }
    );

    res.status(200).json({ msg: "get attendance all", data: getdata });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "monthly attendance not found found ", err });
  }
};

const getAttendanceSummeryMonthly = async (req, res) => {
  const { userId, date } = req.body;
  try {
    const getdata = await db.sequelize.query(
      `  select s.name ,s.phone ,i.institute_id ,s.email,c.course_id ,s2.subcourses_id ,
      s.teacherId ,s.profilePhoto,i.InstituteName ,c.course ,
      s2.subcourses ,a.isPersent ,a.Comment,a.section,a.class,a.date    
            from attendances as a
            inner join studentdetails as s on s.user_id =a.user_id 
            inner join institutes i on i.institute_id =a.institutionId 
            inner join courses c on c.course_id =a.coursesId 
            inner join subcourses s2 on s2.subcourses_id =a.subCoursesId 
            where a.user_id=${userId} && DATE_FORMAT(a.date, "%Y-%m") =DATE_FORMAT('${date}', "%Y-%m") && a.isDelete =false`,
      {
        type: QueryTypes.SELECT,
      }
    );

    res.status(200).json({ msg: "get attendance all", data: getdata });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ msg: "monthly attendance not found found by id ", err });
  }
};

const getAttendanceBetweenMonth = async (req, res) => {
  const { userId, startDate, endDate } = req.body;
  console.log("user", userId);
  try {
    const getdata = await db.sequelize.query(
      `select s.name ,s.phone ,i.institute_id ,s.email ,c.course_id ,s2.subcourses_id ,
      s.teacherId ,s.profilePhoto,i.InstituteName ,c.course ,
      s2.subcourses ,a.isPersent ,a.Comment,a.section,a.class,a.date    
            from attendances as a
            inner join studentdetails as s on s.user_id =a.user_id 
            inner join institutes i on i.institute_id =a.institutionId 
            inner join courses c on c.course_id =a.coursesId 
            inner join subcourses s2 on s2.subcourses_id =a.subCoursesId 
            where a.user_id=${userId} && DATE_FORMAT(a.date, "%Y-%m-%d") BETWEEN '${startDate}' AND '${endDate}' && a.isDelete =false`,
      {
        type: QueryTypes.SELECT,
      }
    );

    res.status(200).json({ msg: "get attendance all", data: getdata });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ msg: "monthly attendance not found found by id ", err });
  }
};

const updateAttendance = async (req, res) => {
  const {
    user_id,
    Comment,
    date,
    isPersent,
    Class,
    section,
    coursesId,
    institutionId,
    subCoursesId,
  } = req.body;
  const data = {
    isPersent: isPersent,
    Comment: Comment,
    section: section,
    class: Class,
    coursesId: coursesId,
    institutionId: institutionId,
    subCoursesId: subCoursesId,
  };
  try {
    const getData = await studentdetails.findOne({
      where: {
        user_id: user_id,
      },
    });
    console.log("data", getData.role);
    if (getData.role == "Admin") {
      res.send({ msg: "Admin id not attendance update" });
    }
    const update = await attendance.update(data, {
      where: {
        user_id: user_id,
        date: date,
        subCoursesId: subCoursesId,
      },
    });
    res.status(200).json({ msg: "update attendance by id", data: update });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "attendance not update by id ", err });
  }
};

const deleteAttendance = async (req, res) => {
  const { user_id, date, isPersent, Comment } = req.body;
  const data = {
    isPersent: isPersent,
    Comment: Comment,
    isDelete: "true",
  };
  try {
    const getData = await studentdetails.findOne({
      where: {
        user_id: user_id,
      },
    });
    console.log("data", getData.role);
    if (getData.role == "Admin") {
      res.send({ msg: "Admin id not attendance status change" });
    }
    const isDelete = await attendancest.update(data, {
      where: {
        user_id: user_id,
        date: date,
      },
    });
    res.status(200).json({ msg: "get attendance all", data: isDelete });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "attendance delete by id ", err });
  }
};

const getAttendanceSubCourses = async(req,res)=>{
  const {subcourses_id,InstituteId}=req.query
  try{
    const getdata = await db.sequelize.query(`select a.user_id ,a.isPersent ,a.subCoursesId ,
    a.subCoursesId ,s.subcourses,s2.name,a.date 
    from attendances a 
    inner join subcourses s on s.subcourses_id =a.subCoursesId && s.InstituteId =a.institutionId
    inner join studentdetails s2 on s2.user_id =a.user_id 
    where s.subcourses_id=${subcourses_id} && s.InstituteId =${InstituteId} && s2.role='Student' && s2.isDelete=FALSE `,
    {
      type: QueryTypes.SELECT,
    }
  );
  res.status(200).json({msg:`all user are in this sub course found`,data:getdata})
  }catch(err){
    res.status(500).json({msg:`data not found`})
  }
}


module.exports = {
  createAttendance,
  getAttendanceSt,
  getAttendanceByid,
  updateAttendance,
  deleteAttendance,
  getAttendanceTe,
  getAttendanceCM,
  getAttendanceSummeryMonthly,
  getAttendanceBetweenMonth,
  getAttendanceSubCourses
};
