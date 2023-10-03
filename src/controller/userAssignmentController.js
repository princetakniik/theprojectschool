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
      upstatus: rest.upstatus,
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
      select u.id ,u.assignmentsId ,u.instituteId ,u.courseId ,u.subCourseId,a.assignmentsName ,
      a.lastDate ,u.submitDate,u.userId,s.name ,s.email ,s.profilePhoto  
     ,a.assignmentsPathsUrl ,u.status ,u.uploadPathUrl,
      case when u.marks is not null then u.marks else '0' end as marks 
     from userassignments u 
     inner join assignments a on a.id =u.assignmentsId
     INNER join studentdetails s on s.user_id =u.userId 
     where u.isDelete =false && a.isDelete =false and s.isDelete =FALSE and s.role ='Student' 
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

const getUserAssignmentById = async (req, res) => {
  const { id } = req.query;
  try {
    const getUserData = await db.sequelize.query(
      `
      select u.id ,u.assignmentsId ,u.instituteId ,u.courseId ,u.subCourseId,a.assignmentsName ,
      a.lastDate ,u.submitDate,u.userId,s.name ,s.email ,s.profilePhoto  
     ,a.assignmentsPathsUrl ,u.status ,u.uploadPathUrl,
      case when u.marks is not null then u.marks else '0' end as marks 
     from userassignments u 
     inner join assignments a on a.id =u.assignmentsId
     INNER join studentdetails s on s.user_id =u.userId 
     where u.isDelete =false && a.isDelete =false and s.isDelete =FALSE and s.role ='Student' and u.id=${id}
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
      select u.id ,u.assignmentsId ,u.instituteId ,u.courseId ,u.subCourseId,a.assignmentsName ,
      a.lastDate ,u.submitDate,u.userId,s.name ,s.email ,s.profilePhoto  
     ,a.assignmentsPathsUrl ,u.status ,u.uploadPathUrl,
      case when u.marks is not null then u.marks else '0' end as marks 
      from userassignments u 
      inner join assignments a on a.id =u.assignmentsId
      INNER join studentdetails s on s.user_id =u.userId 
      where u.isDelete =false && a.isDelete =false and s.isDelete =FALSE and s.role ='Student' and
      u.userId =${userId}
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
      upstatus: rest.upstatus,
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

const assignmentSubmitted = async (req, res) => {
  try {
    const userData = await db.sequelize.query(
      `
      select u.id ,u.assignmentsId ,u.instituteId ,u.courseId ,u.subCourseId,a.assignmentsName ,
      a.lastDate ,u.submitDate,u.userId,s.name ,s.email ,s.profilePhoto  
     ,a.assignmentsPathsUrl ,u.status ,u.uploadPathUrl,
      case when u.marks is not null then u.marks else '0' end as marks 
     from userassignments u 
     inner join assignments a on a.id =u.assignmentsId
     INNER join studentdetails s on s.user_id =u.userId 
     where u.isDelete =false && a.isDelete =false and s.isDelete =FALSE and s.role ='Student' and 
     u.status ='Submitted'
     ORDER BY u.id DESC
     `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: `assignment data Submitted are...`, data: userData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `not send sms to student ...`, err });
  }
};

const assignmentSubmittedByAssignmentsId = async (req, res) => {
  const { assignmentsId } = req.query;
  try {
    const userData = await db.sequelize.query(
      `
      select u.id ,u.assignmentsId ,u.instituteId ,u.courseId ,u.subCourseId,a.assignmentsName ,
      a.lastDate ,u.submitDate,u.userId,s.name ,s.email ,s.profilePhoto  
     ,a.assignmentsPathsUrl ,u.status ,u.uploadPathUrl,
      case when u.marks is not null then u.marks else '0' end as marks 
     from userassignments u 
     inner join assignments a on a.id =u.assignmentsId
     INNER join studentdetails s on s.user_id =u.userId 
     where u.isDelete =false && a.isDelete =false and s.isDelete =FALSE and s.role ='Student' and 
     u.status ='Submitted' and u.assignmentsId =${assignmentsId}
    ORDER BY u.id DESC
     `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: `assignment data Submitted are...`, data: userData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `not send sms to student ...`, err });
  }
};

const assignmentSubmittedByUserId = async (req, res) => {
  const { userId } = req.query;
  try {
    const userData = await db.sequelize.query(
      `
      select u.id ,u.assignmentsId ,u.instituteId ,u.courseId ,u.subCourseId,a.assignmentsName ,
      a.lastDate ,u.submitDate,u.userId,s.name ,s.email ,s.profilePhoto  
     ,a.assignmentsPathsUrl ,u.status ,u.uploadPathUrl,
      case when u.marks is not null then u.marks else '0' end as marks 
     from userassignments u 
     inner join assignments a on a.id =u.assignmentsId
     INNER join studentdetails s on s.user_id =u.userId 
     where u.isDelete =false && a.isDelete =false and s.isDelete =FALSE and s.role ='Student' and 
     u.status ='Submitted' and u.userId =${userId}
     ORDER BY u.id DESC
     `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: `assignment data Submitted are...`, data: userData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `not send sms to student ...`, err });
  }
};

const assignmentPending = async (req, res) => {
  try {
    const userData = await db.sequelize.query(
      `
      select u.id ,u.assignmentsId ,u.instituteId ,u.courseId ,u.subCourseId,a.assignmentsName ,
      a.lastDate ,u.submitDate,u.userId,s.name ,s.email ,s.profilePhoto  
     ,a.assignmentsPathsUrl ,u.status ,u.uploadPathUrl,
      case when u.marks is not null then u.marks else '0' end as marks 
     from userassignments u 
     inner join assignments a on a.id =u.assignmentsId
     INNER join studentdetails s on s.user_id =u.userId 
     where u.isDelete =false && a.isDelete =false and s.isDelete =FALSE and s.role ='Student' and
     u.status ='Pending' 
    ORDER BY u.id DESC
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

const assignmentPendingByAssignmentsId = async (req, res) => {
  const { assignmentsId } = req.query;
  try {
    const userData = await db.sequelize.query(
      `
      select u.id ,u.assignmentsId ,u.instituteId ,u.courseId ,u.subCourseId,a.assignmentsName ,
      a.lastDate ,u.submitDate,u.userId,s.name ,s.email ,s.profilePhoto  
     ,a.assignmentsPathsUrl ,u.status ,u.uploadPathUrl,
      case when u.marks is not null then u.marks else '0' end as marks 
     from userassignments u 
     inner join assignments a on a.id =u.assignmentsId
     INNER join studentdetails s on s.user_id =u.userId 
     where u.isDelete =false && a.isDelete =false and s.isDelete =FALSE and s.role ='Student' and 
     u.status ='Pending' and u.assignmentsId =${assignmentsId}
    ORDER BY u.id DESC
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

const assignmentPendingByUserId = async (req, res) => {
  const { userId } = req.query;
  try {
    const userData = await db.sequelize.query(
      `
      select u.id ,u.assignmentsId ,u.instituteId ,u.courseId ,u.subCourseId,a.assignmentsName ,
      a.lastDate ,u.submitDate,u.userId,s.name ,s.email ,s.profilePhoto  
     ,a.assignmentsPathsUrl ,u.status ,u.uploadPathUrl,
      case when u.marks is not null then u.marks else '0' end as marks 
     from userassignments u 
     inner join assignments a on a.id =u.assignmentsId
     INNER join studentdetails s on s.user_id =u.userId 
     where u.isDelete =false && a.isDelete =false and s.isDelete =FALSE and s.role ='Student' and 
     u.status ='Pending' and u.userId =${userId}
    ORDER BY u.id DESC
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
      select u.id ,u.assignmentsId,a.lastDate ,a.subCourseId ,u.status ,s.user_id ,s.email ,s.name 
      FROM userassignments u 
      inner join assignments a on a.id =u.assignmentsId 
      inner join studentdetails s on s.user_id =u.userId 
      where a.isDelete =FALSE and s.isDelete =FALSE  and s.role='Student' and u.isDelete =FALSE and
      u.status ='Created' and a.lastDate <=CURRENT_DATE()
    `,
      {
        type: QueryTypes.SELECT,
      }
    );
    console.log("getdata", userData);
    let resultData = [];
    for (let i = 0; i < userData.length; i++) {
      var ObjAssignment = {
        assignmentsId: userData[i].assignmentsId,
        status: "Pending",
        subCourseId: userData[i].subCourseId,
      };
      const pendingAssignment = await userassignment.update(ObjAssignment, {
        where: {
          id: userData[i].id,
          assignmentsId: userData[i].assignmentsId,
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
      select a.instituteId ,a.id ,a.assignmentsPathsUrl ,a.courseId , a.subCourseId  ,u.user_id 
      from assignments a 
      inner join institutes i on i.institute_id =a.instituteId 
      inner join courses c on c.course_id =a.courseId 
      inner join subcourses s on s.subcourses_id =a.subCourseId and s.courseId =a.courseId 
      inner join usersubcourses u on u.subcourses_id =a.subCourseId and u.course_id =a.courseId  
      INNER join studentdetails s2 on s2.user_id =u.user_id 
      where a.isDelete =FALSE and i.isDelete =FALSE and c.isDelete =FALSE and s.isDelete =FALSE and
      u.isDelete =FALSE and s2.isDelete =FALSE and s2.role='Student' 
      and (a.id,a.instituteId,a.courseId,a.subCourseId,u.user_id) not in
      (SELECT us.assignmentsId as id,us.instituteId ,us.courseId ,us.subCourseId ,us.userId as user_id 
      FROM userassignments us where us.isDelete=FALSE)
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

// const courseUserAssignment = async (req, res) => {
//   try {
//     const getUserData = await db.sequelize.query(
//       `
//       select u.id ,u.assignmentsId ,a.assignmentsName ,a.lastDate ,u.submitDate ,c.course ,u.courseId
//       ,u.userId ,u.instituteId ,a.assignmentsPathsUrl ,u.status ,u.uploadPathUrl,
//       case when u.marks is not null then u.marks else '0' end as marks
//       from userassignments u
//       inner join assignments a on a.id =u.assignmentsId
//       INNER join courses c on c.course_id =u.courseId
//       where u.isDelete =false && a.isDelete =false and a.status ='1'
//       ORDER BY u.id DESC
//           `,
//       {
//         type: QueryTypes.SELECT,
//       }
//     );
//     res.status(200).json({ msg: `UserAssignment are`, data: getUserData });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ msg: `UserAssignment are not found ...`, err });
//   }
// };

// const courseUserAssignmentById = async (req, res) => {
//   const { id } = req.query;
//   try {
//     const getUserData = await db.sequelize.query(
//       `
//       select u.id ,u.assignmentsId ,a.assignmentsName ,a.lastDate ,u.submitDate ,c.course ,u.courseId
//       ,u.userId ,u.instituteId ,a.assignmentsPathsUrl ,u.status ,u.uploadPathUrl,
//       case when u.marks is not null then u.marks else '0' end as marks
//       from userassignments u
//       inner join assignments a on a.id =u.assignmentsId
//       INNER join courses c on c.course_id =u.courseId
//       where u.isDelete =false && a.isDelete =false and a.status ='1' and u.id=${id}
//       ORDER BY u.id DESC
//           `,
//       {
//         type: QueryTypes.SELECT,
//       }
//     );
//     res.status(200).json({ msg: `UserAssignment are`, data: getUserData });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ msg: `UserAssignment are not found ...`, err });
//   }
// };

// const userAssignmentByCourseId = async (req, res) => {
//   const { courseId } = req.query;
//   try {
//     const getUserData = await db.sequelize.query(
//       `
//       select u.id ,u.assignmentsId ,a.assignmentsName ,a.lastDate ,u.submitDate ,c.course ,u.courseId
//       ,u.userId ,u.instituteId ,a.assignmentsPathsUrl ,u.status ,u.uploadPathUrl,
//       case when u.marks is not null then u.marks else '0' end as marks
//       from userassignments u
//       inner join assignments a on a.id =u.assignmentsId
//       INNER join courses c on c.course_id =u.courseId
//       where u.isDelete =false && a.isDelete =false and a.status ='1' and u.courseId = ${courseId}
//       ORDER BY u.id DESC
//           `,
//       {
//         type: QueryTypes.SELECT,
//       }
//     );
//     res.status(200).json({ msg: `UserAssignment are`, data: getUserData });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ msg: `UserAssignment are not found ...`, err });
//   }
// };

// const courseAssignmentByUserId = async (req, res) => {
//   const { userId } = req.query;
//   try {
//     const getUserData = await db.sequelize.query(
//       `
//       select u.id ,u.assignmentsId ,a.assignmentsName ,a.lastDate ,u.submitDate ,c.course ,u.courseId
//       ,u.userId ,u.instituteId ,a.assignmentsPathsUrl ,u.status ,u.uploadPathUrl,
//       case when u.marks is not null then u.marks else '0' end as marks
//       from userassignments u
//       inner join assignments a on a.id =u.assignmentsId
//       INNER join courses c on c.course_id =u.courseId
//       where u.isDelete =false && a.isDelete =false and a.status ='1' and u.userId = ${userId}
//       ORDER BY u.id DESC
//           `,
//       {
//         type: QueryTypes.SELECT,
//       }
//     );
//     res.status(200).json({ msg: `UserAssignment are`, data: getUserData });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ msg: `UserAssignment are not found ...`, err });
//   }
// };

// const subCourseUserAssignment = async (req, res) => {
//   try {
//     const getUserData = await db.sequelize.query(
//       `
//       select u.id ,u.assignmentsId ,a.assignmentsName ,a.lastDate ,u.submitDate ,c.course ,
//       u.courseId ,u.subCourseId ,s.subcourses ,u.userId ,u.instituteId ,a.assignmentsPathsUrl
//       ,u.status ,u.uploadPathUrl , case when u.marks is not null then u.marks else '0' end as marks
//       from userassignments u
//       inner join assignments a on a.subCourseId =u.subCourseId and a.status =u.upstatus
//       INNER join courses c on c.course_id =u.courseId
//       inner join subcourses s on s.subcourses_id =u.subCourseId
//       where u.isDelete =false && a.isDelete =false and u.upstatus ='1'
//       ORDER BY u.id DESC
//           `,
//       {
//         type: QueryTypes.SELECT,
//       }
//     );
//     res.status(200).json({ msg: `UserAssignment are`, data: getUserData });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ msg: `UserAssignment are not found ...`, err });
//   }
// };

// const subCourseUserAssignmentById = async (req, res) => {
//   const { id } = req.query;
//   try {
//     const getUserData = await db.sequelize.query(
//       `
//       select u.id ,u.assignmentsId ,a.assignmentsName ,a.lastDate ,u.submitDate ,c.course ,
//       u.courseId ,u.subCourseId ,s.subcourses ,u.userId ,u.instituteId ,a.assignmentsPathsUrl
//       ,u.status ,u.uploadPathUrl , case when u.marks is not null then u.marks else '0' end as marks
//       from userassignments u
//       inner join assignments a on a.subCourseId =u.subCourseId and a.status =u.upstatus
//       INNER join courses c on c.course_id =u.courseId
//       inner join subcourses s on s.subcourses_id =u.subCourseId
//       where u.isDelete =false && a.isDelete =false and u.upstatus ='1' and u.id=${id}
//       ORDER BY u.id DESC
//           `,
//       {
//         type: QueryTypes.SELECT,
//       }
//     );
//     res.status(200).json({ msg: `UserAssignment are`, data: getUserData });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ msg: `UserAssignment are not found ...`, err });
//   }
// };

// const subCourseUserAssignmentByCourseId = async (req, res) => {
//   const { courseId } = req.query;
//   try {
//     const getUserData = await db.sequelize.query(
//       `
//       select u.id ,u.assignmentsId ,a.assignmentsName ,a.lastDate ,u.submitDate ,c.course ,
//       u.courseId ,u.subCourseId ,s.subcourses ,u.userId ,u.instituteId ,a.assignmentsPathsUrl
//       ,u.status ,u.uploadPathUrl , case when u.marks is not null then u.marks else '0' end as marks
//       from userassignments u
//       inner join assignments a on a.subCourseId =u.subCourseId and a.status =u.upstatus
//       INNER join courses c on c.course_id =u.courseId
//       inner join subcourses s on s.subcourses_id =u.subCourseId
//       where u.isDelete =false && a.isDelete =false and u.upstatus ='1' and u.courseId=${courseId}
//       ORDER BY u.id DESC
//           `,
//       {
//         type: QueryTypes.SELECT,
//       }
//     );
//     res.status(200).json({ msg: `UserAssignment are`, data: getUserData });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ msg: `UserAssignment are not found ...`, err });
//   }
// };

// const UserAssignmentBysubCourseId = async (req, res) => {
//   const { subCourseId } = req.query;
//   try {
//     const getUserData = await db.sequelize.query(
//       `
//       select u.id ,u.assignmentsId ,a.assignmentsName ,a.lastDate ,u.submitDate ,c.course ,
//       u.courseId ,u.subCourseId ,s.subcourses ,u.userId ,u.instituteId ,a.assignmentsPathsUrl
//       ,u.status ,u.uploadPathUrl , case when u.marks is not null then u.marks else '0' end as marks
//       from userassignments u
//       inner join assignments a on a.subCourseId =u.subCourseId and a.status =u.upstatus
//       INNER join courses c on c.course_id =u.courseId
//       inner join subcourses s on s.subcourses_id =u.subCourseId
//       where u.isDelete =false && a.isDelete =false and u.upstatus ='1' and u.subCourseId=${subCourseId}
//       ORDER BY u.id DESC
//           `,
//       {
//         type: QueryTypes.SELECT,
//       }
//     );
//     res.status(200).json({ msg: `UserAssignment are`, data: getUserData });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ msg: `UserAssignment are not found ...`, err });
//   }
// };

// const subCourseUserAssignmentByuserId = async (req, res) => {
//   const { userId } = req.query;
//   try {
//     const getUserData = await db.sequelize.query(
//       `
//       select u.id ,u.assignmentsId ,a.assignmentsName ,a.lastDate ,u.submitDate ,c.course ,
//       u.courseId ,u.subCourseId ,s.subcourses ,u.userId ,u.instituteId ,a.assignmentsPathsUrl
//       ,u.status ,u.uploadPathUrl , case when u.marks is not null then u.marks else '0' end as marks
//       from userassignments u
//       inner join assignments a on a.subCourseId =u.subCourseId and a.status =u.upstatus
//       INNER join courses c on c.course_id =u.courseId
//       inner join subcourses s on s.subcourses_id =u.subCourseId
//       where u.isDelete =false && a.isDelete =false and u.upstatus ='1' and u.userId=${userId}
//       ORDER BY u.id DESC
//           `,
//       {
//         type: QueryTypes.SELECT,
//       }
//     );
//     res.status(200).json({ msg: `UserAssignment are`, data: getUserData });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ msg: `UserAssignment are not found ...`, err });
//   }
// };

module.exports = {
  inserUserAssignment,
  getUserAssignment,
  getUserAssignmentByUserId,
  getUserAssignmentById,
  updateUserAssignment,
  deleteUserAssignment,
  assignmentSubmitted,
  assignmentSubmittedByAssignmentsId,
  assignmentSubmittedByUserId,
  assignmentPending,
  assignmentPendingByAssignmentsId,
  assignmentPendingByUserId,
  assignmentInsert
};
