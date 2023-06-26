const { userassignment } = require("../Config/dbConnection");
const { QueryTypes } = require("sequelize");
const db = require("../Config/dbConnection");

const inserUserAssignment = async (req, res) => {
  const { ...rest } = req.body;
  try {
    const insertData = await userassignment.create({
      assignmentPaths: rest.assignmentPaths,
      assignmentsId: rest.assignmentsId,
      submitDate: rest.submitDate,
      instituteId: rest.instituteId,
      courseId: rest.courseId,
      subCourseId: rest.subCourseId,
      userId: rest.userId,
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
      select u.id ,u.assignmentPaths ,u.assignmentsId ,a.assignmentsName ,a.lastDate ,u.submitDate 
      ,u.userId ,u.subCourseId ,u.instituteId ,case when u.marks is not null then u.marks else '0' end as marks 
      from userassignments u 
      inner join assignments a on a.id =u.assignmentsId
      where u.isDelete =false && a.isDelete =false 
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
        select u.id ,u.assignmentPaths ,u.assignmentsId ,a.assignmentsName ,a.lastDate ,u.submitDate 
        ,u.userId ,u.subCourseId ,u.instituteId,case when u.marks is not null then u.marks else '0' end as marks  
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
      marks:rest.marks
    };
    const updateData = await userassignment.update(data, {
      where: {
        userId: rest.userId,
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

const assignmentNotUploadUser = async(req,res)=>{
    const {instituteId,subCourseId}=req.query
    try{
const userData = await db.sequelize.query(`
select s.user_id ,a.id as assignmentsId,a.assignmentsName ,a.lastDate ,a.instituteId ,a.subCourseId  from studentdetails s 
inner join assignments a on a.instituteId =s.institutionId 
where a.isDelete =false  && s.role='Student' && a.instituteId =${instituteId} && a.subCourseId =${subCourseId} 
&& (a.id,s.user_id) not in (select u.assignmentsId as id ,u.userId as user_id  from userassignments u 
where u.isDelete=false && u.instituteId=${instituteId} && u.subCourseId=${subCourseId})
`,{
    type:QueryTypes.SELECT
})
res.status(200).json({msg:`assignment Not Upload User data are...`,data:userData})
    }catch(err){
        console.log(err);
        res.status(500).json({msg:`assignment Not Upload User data not found...`,err})
    }
}

module.exports = {
  inserUserAssignment,
  getUserAssignment,
  getUserAssignmentById,
  updateUserAssignment,
  deleteUserAssignment,
  assignmentNotUploadUser
};
