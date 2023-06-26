const mysql = require("mysql");
const { Sequelize, DataTypes, QueryTypes } = require("sequelize");
const Config = require("./config");
var connection = mysql.createConnection({
  host: Config.host,
  user: Config.user,
  password: Config.password,
  database: Config.database_name,
});
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("db connected as id " + connection.threadId);
});

module.exports = connection;

const sequelize = new Sequelize(
  Config.database_name,
  Config.user,
  Config.password,
  {
    port: Config.mysql_port,
    dialect: "mysql",
    host: Config.host,
    logging: false,
  }
);
sequelize.sync();
const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.register = require("../model/RegisterModel")(
  sequelize,
  Sequelize,
  DataTypes
);
db.emailveryfi = require("../model/veryfiEmailModel")(
  sequelize,
  Sequelize,
  DataTypes
);
db.studentdetails = require("../model/DetailsModel")(
  sequelize,
  Sequelize,
  DataTypes
);
db.attendance = require("../model/AttendanceModel")(
  sequelize,
  Sequelize,
  DataTypes
);
db.courses = require("../model/CoursesModel")(sequelize, Sequelize, DataTypes);
db.subcourses = require("../model/SubCoursesModel")(
  sequelize,
  Sequelize,
  DataTypes
);
db.institute = require("../model/InstituteModel")(
  sequelize,
  Sequelize,
  DataTypes
);
db.usercourses = require("../model/userCoursesModel")(
  sequelize,
  Sequelize,
  DataTypes
);
db.usersubcourses = require("../model/userSubcoursesModel")(
  sequelize,
  Sequelize,
  DataTypes
);
db.qualifications = require("../model/QualificationsModel")(
  sequelize,
  Sequelize,
  DataTypes
);
db.department = require("../model/DepartmentModel")(
  sequelize,
  Sequelize,
  DataTypes
);
db.skill = require("../model/SkillModel")(sequelize, Sequelize, DataTypes);
db.userskill = require("../model/userSkillModel")(
  sequelize,
  Sequelize,
  DataTypes
);
db.feedBack = require("../model/feedbackModel")(
  sequelize,
  Sequelize,
  DataTypes
);
db.uploadvideo = require("../model/uploadVideoModel")(
  sequelize,
  Sequelize,
  DataTypes
);
db.viewvideo = require("../model/viewUserVideoModel")(
  sequelize,
  Sequelize,
  DataTypes
);
db.assignment = require("../model/assignmentsModel")(
  sequelize,
  Sequelize,
  DataTypes
);
db.userassignment = require("../model/userAssignmentModel")(
  sequelize,
  Sequelize,
  DataTypes
);
module.exports = db;
