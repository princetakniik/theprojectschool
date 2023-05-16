const { attendancest } = require("../Config/dbConnection");
var moment = require("moment");
const { QueryTypes } = require("sequelize");
const db = require("../Config/dbConnection");
const nodeCron = require("node-cron");
var CronJob = require("cron").CronJob;

const job = nodeCron.schedule("30 35 15 * * *", function absent() {
  console.log("dfghjk");
});

const absent = async (req, res) => {
  const CURRENT_DATE = moment().format("YYYY-MM-DD");
  console.log("CURRENT_DATE", CURRENT_DATE);
  try {
    const getData = await db.sequelize.query(
      `select u.course_id ,u2.subcourses_id,u.Institute_id,u.user_id  from usercourses u 
            inner join usersubcourses u2 on u2.user_id =u.user_id where  u2.subcourses_id in
            (select a.subCoursesId   from attendances a)   `,
      {
        //&& ad.date=${date}
        type: QueryTypes.SELECT,
      }
    );
    for (let Data of getData) {
      console.log('data',Data);
      const todayAbsent = await attendancest.create({
        user_id: Data.user_id,
        isPersent: "0",
        coursesId: Data.course_id,
        institutionId: Data.Institute_id,
        subCoursesId: Data.subcourses_id,
        date: CURRENT_DATE,
    })
    res.status(200).json({msg:`all absent today`,data:todayAbsent})
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `not create attendance ` });
  }
};

module.exports = {
  absent,
};
