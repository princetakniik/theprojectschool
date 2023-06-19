const { attendance } = require("../Config/dbConnection");
var moment = require("moment");
const { QueryTypes } = require("sequelize");
const db = require("../Config/dbConnection");
const nodeCron = require("node-cron");
var CronJob = require("cron").CronJob;

const job = nodeCron.schedule("05 45 23 * * *", function () {
  absent();
});

const absent = async (req, res) => {
  const CURRENT_DATE = moment().format("YYYY-MM-DD");
  //console.log("CURRENT_DATE", CURRENT_DATE);
  try {
    const getData = await db.sequelize.query(
      `select u.course_id ,u2.subcourses_id,u.Institute_id,u.user_id  from usercourses u 
      inner join usersubcourses u2 on u2.user_id =u.user_id && u.course_id =u2.course_id
      where u.isDelete=false && u2.isDelete =false && u2.subcourses_id && u.user_id =${req.body.userid} && u2.subcourses_id=${req.body.u2.subcourses_id} not in
       (select a.subCoursesId from attendances a  
       where u.user_id =a.user_id && u.course_id =a.coursesId && u2.subcourses_id =a.subCoursesId 
       && a.date=CURRENT_DATE()  && a.isPersent='1') `,
      {
        //&& ad.date=${date}
        type: QueryTypes.SELECT,
      }
    );
    console.log('getdata',getData);
    let resultData=[];
for (let i=0;i<getData.length;i++){
  var ObjAttendence={
    user_id: getData[i].user_id,
    isPersent: "0",
    coursesId: getData[i].course_id,
    institutionId: getData[i].Institute_id,
    subCoursesId: getData[i].subcourses_id,
    date: CURRENT_DATE,
  }
    const todayAbsent = await attendance.create(ObjAttendence)
    resultData.push(todayAbsent);
}
  console.log("todayAbsent", resultData);
    res.json({ msg: `all absent today` });
  
  } catch (err) {
    console.log(err);
  }
 };

module.exports = {
  absent,
};
