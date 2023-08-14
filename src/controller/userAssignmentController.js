const { userassignment } = require("../Config/dbConnection");
const { QueryTypes } = require("sequelize");
const db = require("../Config/dbConnection");
const nodeCron = require("node-cron");

const inserUserAssignment = async (req, res) => {
  const { ...rest } = req.body;
  try {
    const insertData = await userassignment.create({
      assignmentsId: rest.assignmentsId,
      assignmentPaths: rest.assignmentPaths,
      submitDate: rest.submitDate,
      instituteId: rest.instituteId,
      courseId: rest.courseId,
      subCourseId: rest.subCourseId,
      userId: rest.userId,
      uploadPathUrl: rest.uploadPathUrl,
      status: rest.status,
      marks: rest.marks,
    });
    res
      .status(200)
      .json({ msg: `UserAssignment are inserted...`, data: insertData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `user Assignment is not inserted...`, err });
  }
};

const getUserAssignment = async (req, res) => {
  try {
    const getUserData = await db.sequelize.query(
      `
      select u.id ,u.assignmentsId ,a.assignmentsName ,a.lastDate ,u.submitDate 
      ,u.userId ,u.subCourseId ,u.instituteId ,a.assignmentsPathsUrl ,u.status ,u.uploadPathUrl,
      case when u.marks is not null then u.marks else '0' end as marks 
      from userassignments u 
      inner join assignments a on a.id =u.assignmentsId
      where u.isDelete =false && a.isDelete =false 
      ORDER BY u.id DESC
          `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).json({ msg: `UserAssignment are`, data: getUserData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `UserAssignment are not found ...`, err });
  }
};

const getUserAssignmentByUserId = async (req, res) => {
  const { userId } = req.query;
  try {
    const getUserData = await db.sequelize.query(
      `
      select u.id ,u.assignmentsId ,a.assignmentsName ,a.lastDate ,u.submitDate 
      ,u.userId ,u.subCourseId ,u.instituteId ,a.assignmentsPathsUrl ,u.status ,u.uploadPathUrl,
      case when u.marks is not null then u.marks else '0' end as marks 
      from userassignments u 
      inner join assignments a on a.id =u.assignmentsId
      where u.isDelete =false && a.isDelete =false and u.userId =${userId} 
`,
      {
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).json({ msg: `UserAssignment are`, data: getUserData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `UserAssignment are not found ...`, err });
  }
};

const getUserAssignmentById = async (req, res) => {
  const { userId, assignmentsId } = req.query;
  try {
    const getUserData = await db.sequelize.query(
      `
      select u.id ,u.assignmentsId ,a.assignmentsName ,a.lastDate ,u.submitDate 
      ,u.userId ,u.subCourseId ,u.instituteId ,a.assignmentsPathsUrl ,u.status ,u.uploadPathUrl,
      case when u.marks is not null then u.marks else '0' end as marks 
      from userassignments u 
      inner join assignments a on a.id =u.assignmentsId
      where u.isDelete =false && a.isDelete =false && u.userId =${userId} && u.assignmentsId =${assignmentsId}
  `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).json({ msg: `UserAssignment are`, data: getUserData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `UserAssignment are not found ...`, err });
  }
};

const updateUserAssignment = async (req, res) => {
  const { id } = req.query;
  const { ...rest } = req.body;
  try {
    const data = {
      assignmentPaths: rest.assignmentPaths,
      assignmentsId: rest.assignmentsId,
      submitDate: rest.submitDate,
      instituteId: rest.instituteId,
      courseId: rest.courseId,
      subCourseId: rest.subCourseId,
      userId: rest.userId,
      marks: rest.marks,
      status: rest.status,
      uploadPathUrl: rest.uploadPathUrl,
    };
    const updateData = await userassignment.update(data, {
      where: {
        id: id,
        isDelete: false,
      },
    });
    res
      .status(200)
      .json({ msg: `user Assignment data are updated...`, data: updateData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `user Assignment are not updated...`, err });
  }
};

const deleteUserAssignment = async (req, res) => {
  const { ...rest } = req.query;
  try {
    const data = {
      isDelete: true,
    };
    const userData = await userassignment.update(data, {
      where: {
        userId: rest.userId,
        assignmentsId: rest.assignmentsId,
        isDelete: false,
      },
    });
    res
      .status(200)
      .json({ msg: `user Assignment are deleted...`, data: userData });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ msg: `UserAssignment data are not deleted ....`, err });
  }
};

const assignmentNotUploadUser = async (req, res) => {
  const { instituteId, subCourseId } = req.query;
  try {
    const userData = await db.sequelize.query(
      `
      select s.user_id ,a.id as assignmentsId,a.assignmentsName ,a.lastDate ,a.instituteId ,
      a.subCourseId ,u2.assignmentPaths ,u2.uploadPathUrl ,u2.submitDate
      from studentdetails s 
     inner join assignments a on a.instituteId =s.institutionId 
     inner join userassignments u2 on u2.assignmentsId =a.id 
     where a.isDelete =false  && s.role='Student' && a.instituteId =${instituteId} && a.subCourseId =${subCourseId} 
     && (a.id,s.user_id) not in (select u.assignmentsId as id ,u.userId as user_id  from userassignments u 
     where u.isDelete=false && u.instituteId=${instituteId} && u.subCourseId=${subCourseId})
`,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: `assignment Not Upload User data are...`, data: userData });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ msg: `assignment Not Upload User data not found...`, err });
  }
};

const assignmentNotsubmitte = async (req, res) => {
  try {
    const userData = await db.sequelize.query(
      `
      select s.user_id ,s.name ,s.email ,a.assignmentsName ,a.id ,a.lastDate ,a.subCourseId ,a.assignmentsPathsUrl 
      from studentdetails s 
      inner join assignments a on a.instituteId =s.institutionId
      where s.role='Student' && s.isDelete =false && a.isDelete =false && a.lastDate<current_date()  
      && (a.id,s.user_id) not in 
      (select u.assignmentsId as id ,u.userId as user_id  from userassignments u 
        where u.isDelete=false)
     `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: `assignment data Not submitte are...`, data: userData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `not send sms to student ...`, err });
  }
};

const assignmentPending = async (req, res) => {
  try {
    const userData = await db.sequelize.query(
      `
      select a.id ,a.lastDate ,a.subCourseId ,u.status,s.user_id ,s.email ,s.name,u.assignmentPaths ,u.uploadPathUrl 
      FROM userassignments u 
      inner join assignments a on a.id =u.assignmentsId 
      INNER join studentdetails s on s.user_id =u.userId 
      where u.status ='Pending' and s.isDelete =FALSE and a.isDelete =FALSE and u.isDelete =FALSE 
`,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: `user assignment pending are ...`, data: userData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `pending assignment not found` });
  }
};

const assignmentPendingByUser = async (req, res) => {
  const { userId } = req.query;
  try {
    const userData = await db.sequelize.query(
      `
      select a.id ,a.lastDate ,a.subCourseId ,u.status,s.user_id ,s.email ,s.name,u.assignmentPaths ,u.uploadPathUrl  
      FROM userassignments u 
      inner join assignments a on a.id =u.assignmentsId 
      INNER join studentdetails s on s.user_id =u.userId 
     where u.status ='Pending' and s.isDelete =FALSE and a.isDelete =FALSE and 
     u.isDelete =FALSE and u.userId = ${userId}
`,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: `user assignment pending are ...`, data: userData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `pending assignment not found` });
  }
};

const job = nodeCron.schedule("05 45 23 * * *", function () {
  assignmentPendingInsert();
});

const assignmentPendingInsert = async (req, res) => {
  try {
    const userData = await db.sequelize.query(
      `
    select a.id ,a.lastDate ,a.subCourseId ,u.status,s.user_id ,s.email ,s.name 
    FROM userassignments u 
    inner join assignments a on a.id =u.assignmentsId 
    INNER join studentdetails s on s.user_id =u.userId 
    where u.status ='Created' and s.isDelete =FALSE and a.isDelete =FALSE and 
    u.isDelete =FALSE and a.lastDate = CURRENT_DATE()
    `,
      {
        type: QueryTypes.SELECT,
      }
    );
    console.log("getdata", userData);
    let resultData = [];
    for (let i = 0; i < userData.length; i++) {
      var ObjAssignment = {
        assignmentsId: userData[i].id,
        status: "Pending",
        subCourseId: userData[i].subCourseId,
      };
      const pendingAssignment = await userassignment.update(ObjAssignment, {
        where: {
          assignmentsId: userData[i].id,
          userId: userData[i].user_id,
          subCourseId: userData[i].subCourseId,
        },
      });
      resultData.push(pendingAssignment);
    }
    console.log("pending Assignment are....", resultData);
    res.json({ msg: `assignment pending are ....` });
  } catch (err) {
    console.log(err);
    return err;
  }
};

setInterval(function () {
  assignmentInsert();
}, 30 * 60 * 1000);

const assignmentInsert = async (req, res) => {
  try {
    const userData = await db.sequelize.query(
      `
      select DISTINCT (a.instituteId ) as instituteId, a.id ,a.assignmentsPathsUrl ,a.courseId ,
      a.subCourseId ,us.user_id  from usercourses u 
      inner join usersubcourses us on us.course_id =u.course_id
      inner join assignments a on a.courseId =us.course_id and a.subCourseId =us.subcourses_id 
      INNER join studentdetails s on s.user_id =us.user_id 
      WHERE a.isDelete =FALSE and us.isDelete =FALSE and u.isDelete =false and s.role='Student' and 
      (a.id,a.instituteId,a.courseId,a.subCourseId,us.user_id) not in 
      (select ua.assignmentsId as id,ua.instituteId ,ua.courseId ,ua.subCourseId ,ua.userId as user_id
      FROM userassignments ua where ua.isDelete =FALSE) 
     `,
      {
        type: QueryTypes.SELECT,
      }
    );
    console.log("userData", userData);
    let resultData = [];
    for (let i = 0; i < userData.length; i++) {
      var ObjAssignment = {
        assignmentsId: userData[i].id,
        status: "Created",
        subCourseId: userData[i].subCourseId,
        userId: userData[i].user_id,
        assignmentPaths: userData[i].assignmentsPathsUrl,
        instituteId: userData[i].instituteId,
        courseId: userData[i].courseId,
      };
      const createAssignment = await userassignment.create(ObjAssignment);
      resultData.push(createAssignment);
    }
    console.log("createAssignment", resultData);
    return resultData;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = {
  inserUserAssignment,
  getUserAssignment,
  getUserAssignmentByUserId,
  getUserAssignmentById,
  updateUserAssignment,
  deleteUserAssignment,
  assignmentNotUploadUser,
  assignmentNotsubmitte,
  assignmentPending,
  assignmentPendingByUser,
};
