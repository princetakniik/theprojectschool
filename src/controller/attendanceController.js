const { attendancest } = require("../Config/dbConnection");
const { studentdetails } = require("../Config/dbConnection");
const { QueryTypes } = require("sequelize");
const db = require("../Config/dbConnection");
const moment = require("moment");

const createAttendance = async (req, res) => {
  // console.log("reqApi..data..", req.body);
  const { id, Comment, date, isPersent,className,section,courseenrolled,institutionname } = req.body;
  console.log("date", date);
  try {
    const getData = await studentdetails.findOne({
      where: {
        user_id:id,
      },
    });
 // console.log("data", getData);
    const getAttendance = await attendancest.findOne({
      where: {
        user_id:id,
        date:date
      },
    })
  console.log('getAttendance',getAttendance);
    if (getData ==null || getData==undefined) {
      res.status(400).json({msg:"user details is not persent"})
    }else if(getData.role =='Admin'){
      res.status(400).json({ msg: "Admin id not attendance" });
    }else if(!getAttendance){
      console.log();
      res.status(400).json({msg:"user details is not persent"})
    }
    else{
    const createData = await attendancest.create({
      user_id:getData.user_id,
      Comment: Comment,
      date: date,
      isPersent: isPersent,
      section:section,
      class: className,
      courseenrolled:courseenrolled,
      institutionname:institutionname
    });
    console.log("createData", createData);
    res.status(200).json({ msg: "persent today", data: createData });
  }
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Absent today ..." });
  }
};

const getAttendanceSt = async (req, res) => {
  const { date } = req.body;
  console.log("date", { date });
  try {
    const getdata = await db.sequelize.query(
      `select sd.name,sd.phone,sd.email,sd.role,sd.class,sd.section,sd.classteacher,ad.Comment,
      ad.date,ad.isPersent,sd.user_id 
      from attendances as ad 
      inner join studentdetails as sd on sd.user_id =ad.user_id 
      where sd.role='Student' && ad.date = CURRENT_DATE() && ad.isDelete =false`,
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
  const { date } = req.body;
  try {
    const getdata = await db.sequelize.query(
      `select sd.name,sd.phone,sd.email,sd.role,sd.class,sd.section,sd.classteacher,ad.Comment,
      ad.date,ad.isPersent,sd.user_id 
      from attendances as ad 
      inner join studentdetails as sd on sd.user_id =ad.user_id 
      where sd.role='Teacher' && ad.date =CURRENT_DATE() && ad.isDelete =false`,
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
  const { userId} = req.body;
  try {
    const getDataById = await db.sequelize.query(
      `select sd.name,sd.phone,sd.email,sd.role,sd.class,sd.section,sd.classteacher,ad.Comment,
      ad.date,ad.isPersent,sd.user_id 
      from attendances as ad 
      inner join studentdetails as sd on sd.user_id =ad.user_id 
        where ad.user_id =${userId} && ad.date = CURRENT_DATE() && ad.isDelete =false`,
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
      `select sd.name,sd.phone,sd.email,sd.role,sd.class,sd.section,sd.classteacher,ad.Comment,
      ad.date,ad.isPersent,sd.user_id 
      from attendances as ad 
      inner join studentdetails as sd on sd.user_id =ad.user_id 
      where ad.user_id =${userId} && DATE_FORMAT(ad.date, "%Y %m") =DATE_FORMAT(CURRENT_DATE(), "%Y %m") && ad.isDelete =false `,
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
      `      select sd.name,sd.phone,sd.email,sd.role,sd.class,sd.section,sd.classteacher,
      ad.Comment,ad.date,ad.isPersent ,ad.user_id
      from attendances as ad 
      inner join studentdetails as sd on sd.user_id =ad.user_id 
      where ad.user_id =${userId} && DATE_FORMAT(ad.date, "%Y-%m") =DATE_FORMAT('${date}', "%Y-%m") && ad.isDelete =false`,
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
      `select sd.name,sd.phone,sd.email,sd.role,sd.class,sd.section,sd.classteacher,ad.user_id,
      ad.Comment,ad.date,ad.isPersent
      from attendances as ad 
      inner join studentdetails as sd on sd.user_id =ad.user_id 
      where ad.user_id =${userId} && DATE_FORMAT(ad.date, "%Y-%m-%d") BETWEEN '${startDate}' AND '${endDate}' && ad.isDelete =false`,
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
  const { userId, isPersent, Comment, date,section,className,courseenrolled,institutionname } = req.body;
  const data = {
    isPersent: isPersent,
    Comment: Comment,
    section:section,
    class:className,
    courseenrolled:courseenrolled,
    institutionname:institutionname
  };
  try {
    const getData = await studentdetails.findOne({
      where: {
        user_id: userId,
      },
    });
    console.log("data", getData.role);
    if (getData.role == "Admin") {
      res.send({ msg: "Admin id not attendance update" });
    }
    const update = await attendancest.update(data, {
      where: {
        user_id: userId,
        date:date
      },
    });
    res.status(200).json({ msg: "get attendance all", data: update });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "attendance update by id ", err });
  }
};
const deleteAttendance = async (req, res) => {
  const { userId, isPersent, Comment, date } = req.body;
  const data = {
    isPersent: isPersent,
    Comment: Comment,
    isDelete: "true",
  };
  try {
    const getData = await studentdetails.findOne({
      where: {
        user_id: userId,
      },
    });
    console.log("data", getData.role);
    if (getData.role == "Admin") {
      res.send({ msg: "Admin id not attendance status change" });
    }
    const isDelete = await attendancest.update(data, {
      where: {
        user_id : userId,
        date:date
      },
    });
    res.status(200).json({ msg: "get attendance all", data: isDelete });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "attendance delete by id ", err });
  }
};
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
};
