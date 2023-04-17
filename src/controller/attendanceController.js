const { attendancest } = require("../Config/dbConnection");
const { studentdetails } = require("../Config/dbConnection");
const { QueryTypes } = require("sequelize");
const db = require("../Config/dbConnection");
const moment = require("moment");

const createAttendance = async (req, res) => {
  // console.log("reqApi..data..", req.body);
  const { id, Comment, date, isPersent } = req.body;
  console.log("date", date);
  try {
    const getData = await studentdetails.findOne({
      where: {
        id,
      },
    });
    console.log("data", getData.role);
    if (getData.role == "Admin") {
      res.send({ msg: "Admin id not attendance" });
    }
    const createData = await attendancest.create({
      role: getData.role,
      userId: id,
      Comment: Comment,
      date: date,
      isPersent: isPersent,
    });
    console.log("createData", createData);
    res.status(200).json({ msg: "persent today", data: createData });
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
      `select sd.name,sd.phone,sd.email,sd.role,sd.class,sd.section,sd.classteacher,ad.Comment,ad.date,ad.isPersent from school.attendances as ad 
      inner join school.studentdetails as sd on sd.id=ad.userId
      where ad.role='Student' && ad.date = CURRENT_DATE() `,
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
      `select sd.name,sd.phone,sd.email,sd.role,sd.class,sd.section,sd.classteacher,ad.Comment,ad.date,ad.isPersent from school.attendances as ad 
      inner join school.studentdetails as sd on sd.id=ad.userId
      where ad.role='Teacher' && ad.date =CURRENT_DATE() `,
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
  const { userId, date } = req.body;
  try {
    const getDataById = await db.sequelize.query(
      `select sd.name,sd.phone,sd.email,sd.role,sd.class,sd.section,sd.classteacher,ad.Comment,ad.date,ad.isPersent from school.attendances as ad 
        inner join school.studentdetails as sd on sd.id=ad.userId
        where ad.userId=${userId} && ad.date = CURRENT_DATE()`,
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
      `select sd.name,sd.phone,sd.email,sd.role,sd.class,sd.section,sd.classteacher,ad.Comment,ad.date,ad.isPersent from school.attendances as ad 
      inner join school.studentdetails as sd on sd.id=ad.userId
      where ad.userId=${userId} && DATE_FORMAT(ad.date, "%Y %m") =DATE_FORMAT(CURRENT_DATE(), "%Y %m"); `,
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
      `      select sd.name,sd.phone,sd.email,sd.role,sd.class,sd.section,sd.classteacher,ad.userId,ad.Comment,ad.date,ad.isPersent from school.attendances as ad 
      inner join school.studentdetails as sd on sd.id=ad.userId
      where ad.userId=${userId} && DATE_FORMAT(ad.date, "%Y-%m") =DATE_FORMAT('${date}', "%Y-%m")`,
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
  console.log("user", userId, startDate.toString(), endDate);
  try {
    const getdata = await db.sequelize.query(
      `select sd.name,sd.phone,sd.email,sd.role,sd.class,sd.section,sd.classteacher,ad.userId,ad.Comment,ad.date,ad.isPersent from school.attendances as ad 
      inner join school.studentdetails as sd on sd.id=ad.userId
      where ad.userId=${userId} && DATE_FORMAT(ad.date, "%Y-%m-%d") BETWEEN '${startDate}' AND '${endDate}'`,
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
  const { userId, isPersent, Comment, date } = req.body;
  const data = {
    isPersent: isPersent,
    Comment: Comment,
    date: date,
  };
  try {
    const getData = await studentdetails.findOne({
      where: {
        id: userId,
      },
    });
    console.log("data", getData.role);
    if (getData.role == "Admin") {
      res.send({ msg: "Admin id not attendance update" });
    }
    const update = await attendancest.update(data, {
      where: {
        userId: userId,
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
    date: date,
    isDelete: "true",
  };
  try {
    const getData = await studentdetails.findOne({
      where: {
        id: userId,
      },
    });
    console.log("data", getData.role);
    if (getData.role == "Admin") {
      res.send({ msg: "Admin id not attendance update" });
    }
    const isDelete = await attendancest.update(data, {
      where: {
        userId: userId,
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
