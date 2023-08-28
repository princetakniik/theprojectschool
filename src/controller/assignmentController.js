const { assignment } = require("../Config/dbConnection");
const { QueryTypes } = require("sequelize");
const db = require("../Config/dbConnection");

const inserAssignment = async (req, res) => {
  const { ...rest } = req.body;
  try {
    const assignmentData = await assignment.create({
      assignmentsName: rest.assignmentsName,
      assignmentsPathsUrl: rest.assignmentsPathsUrl,
      lastDate: rest.lastDate,
      instituteId: rest.instituteId,
      courseId: rest.courseId,
      subCourseId: rest.subCourseId,
      userId: rest.userId,
      status: rest.status,
      assignmentId: rest.assignmentId,
    });
    res.status(200).json({
      msg: `assignmentData insert successfully`,
      data: assignmentData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `assignment not created ....`, err });
  }
};

const getAllAssignment = async (req, res) => {
  try {
    const assignmentData = await db.sequelize.query(
      `
      select a.id ,a.assignmentsName ,a.lastDate ,a.instituteId ,a.courseId ,
      a.subCourseId  ,c.course 
      from assignments a 
      inner join courses c on c.course_id =a.courseId 
      where  a.isDelete =false && c.isDelete =false 
      `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: `all assignmentData are ....`, data: assignmentData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Assignment data not found...`, err });
  }
};

const instituteAllAssignment = async (req, res) => {
  try {
    const assignmentData = await db.sequelize.query(
      `
      select a.id ,a.assignmentsName ,a.assignmentsPathsUrl ,a.lastDate ,a.instituteId ,a.courseId ,
      a.subCourseId  ,c.course,i.InstituteName  
      from assignments a 
      inner join courses c on c.course_id =a.courseId 
      inner join institutes i on i.institute_id =a.instituteId 
      where  a.isDelete =false && c.isDelete =false and i.isDelete =FALSE 
      `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).json({
      msg: `all assignmentData instituteId are ....`,
      data: assignmentData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Assignment data not found...`, err });
  }
};

const AllAssignmentByInstituteId = async (req, res) => {
  const { instituteId } = req.query;
  try {
    const assignmentData = await db.sequelize.query(
      `
      select a.id ,a.assignmentsName ,a.assignmentsPathsUrl ,a.lastDate ,a.instituteId ,a.courseId ,
      a.subCourseId  ,c.course,i.InstituteName  
      from assignments a 
      inner join courses c on c.course_id =a.courseId 
      inner join institutes i on i.institute_id =a.instituteId 
      where  a.isDelete =false && c.isDelete =false and i.isDelete =FALSE and i.institute_id =${instituteId} 
      `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).json({
      msg: `all assignmentData by instituteId ....`,
      data: assignmentData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Assignment data not found...`, err });
  }
};

const getAssignmentById = async (req, res) => {
  const { id } = req.query;
  try {
    const assignmentData = await db.sequelize.query(
      `
      select a.id ,a.assignmentsName ,a.assignmentsPathsUrl ,a.lastDate ,a.instituteId ,a.courseId ,
      a.subCourseId  ,c.course 
      from assignments a 
      inner join courses c on c.course_id =a.courseId 
      where  a.isDelete =false && c.isDelete =FALSE  && a.id=${id}
      `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: `assignmentData by id...`, data: assignmentData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `data not found by id....`, err });
  }
};

const updateAssignment = async (req, res) => {
  const { id } = req.query;
  const { ...rest } = req.body;
  try {
    const data = {
      assignmentsName: rest.assignmentsName,
      assignmentsPathsUrl: rest.assignmentsPathsUrl,
      lastDate: rest.lastDate,
      instituteId: rest.instituteId,
      courseId: rest.courseId,
      subCourseId: rest.subCourseId,
      userId: rest.userId,
      status: rest.status,
      assignmentId: rest.assignmentId,
    };
    const updateData = await assignment.update(data, {
      where: {
        isDelete: false,
        id: id,
      },
    });
    res.status(200).json({ msg: `updateData are.... `, data: updateData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Assignment data id not update....`, err });
  }
};

const courseAssignment = async (req, res) => {
  try {
    const assignmentData = await db.sequelize.query(
      `
      select a.id ,a.assignmentsName ,a.assignmentsPathsUrl ,a.lastDate ,a.instituteId ,a.courseId ,
      c.course ,i.InstituteName,a.subCourseId 
      from assignments a 
      inner join courses c on c.course_id =a.courseId 
      inner join institutes i on i.institute_id =a.instituteId 
      where  a.isDelete =false && c.isDelete =false and a.status ='0' and i.isDelete =FALSE 
      `,
      {
        type: QueryTypes.SELECT,
      }
      // a.status IS NOT NULL;
    );
    res
      .status(200)
      .json({ msg: `all assignmentData are ....`, data: assignmentData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Assignment data not found...`, err });
  }
};

const courseAssignmentById = async (req, res) => {
  const { id } = req.query;
  try {
    const assignmentData = await db.sequelize.query(
      `
      select a.id ,a.assignmentsName ,a.assignmentsPathsUrl ,a.lastDate ,a.instituteId ,a.courseId ,
      c.course ,i.InstituteName,a.subCourseId 
      from assignments a 
      inner join courses c on c.course_id =a.courseId 
      inner join institutes i on i.institute_id =a.instituteId 
      where  a.isDelete =false && c.isDelete =false and a.status ='0'  && a.id=${id} and i.isDelete =FALSE 
      `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: `all assignmentData are ....`, data: assignmentData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Assignment data not found...`, err });
  }
};

const AssignmentByCourseId = async (req, res) => {
  const { courseId } = req.query;
  try {
    const assignmentData = await db.sequelize.query(
      `
      select a.id ,a.assignmentsName ,a.assignmentsPathsUrl ,a.lastDate ,a.instituteId ,a.courseId ,
      c.course ,a.subCourseId 
      from assignments a 
      inner join courses c on c.course_id =a.courseId 
      where  a.isDelete =false && c.isDelete =false and a.status ='0'  && a.courseId=${courseId}
      `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: `all assignmentData are ....`, data: assignmentData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Assignment data not found...`, err });
  }
};

const subCourseAssignment = async (req, res) => {
  try {
    const assignmentData = await db.sequelize.query(
      `
      select a.id ,a.assignmentsName ,a.assignmentsPathsUrl ,a.lastDate ,a2.instituteId ,a2.courseId ,
      a2.subCourseId ,a.assignmentId ,a2.instituteId  
      from assignments a 
      inner join assignments a2 on a2.id =a.assignmentId 
       INNER JOIN subcourses s on s.subcourses_id =a2.subCourseId 
       inner join institutes i on i.institute_id =a2.instituteId 
      where  a.isDelete =false AND a2.isDelete =FALSE and a.status ='1'
      `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: `all assignmentData are ....`, data: assignmentData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Assignment data not found...`, err });
  }
};

const subCourseAssignmentById = async (req, res) => {
  const { id } = req.query;
  try {
    const assignmentData = await db.sequelize.query(
      `
      select a.id ,a.assignmentsName ,a.assignmentsPathsUrl ,a.lastDate ,a2.instituteId ,a2.courseId ,
      a2.subCourseId ,a.assignmentId ,a2.instituteId  
      from assignments a 
      inner join assignments a2 on a2.id =a.assignmentId 
      INNER JOIN subcourses s on s.subcourses_id =a2.subCourseId 
      inner join institutes i on i.institute_id =a2.instituteId 
      where  a.isDelete =false AND a2.isDelete =FALSE and a.status ='1' and a.id=${id}
      `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: `all assignmentData are ....`, data: assignmentData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Assignment data not found...`, err });
  }
};

const subCourseAssignmentByCourseId = async (req, res) => {
  const { CourseId } = req.query;
  try {
    const assignmentData = await db.sequelize.query(
      `
      select a.id ,a.assignmentsName ,a.assignmentsPathsUrl ,a.lastDate ,a2.instituteId ,a2.courseId ,
      a2.subCourseId ,a.assignmentId ,a2.instituteId  
      from assignments a 
      inner join assignments a2 on a2.id =a.assignmentId 
       INNER JOIN subcourses s on s.subcourses_id =a2.subCourseId 
       inner join institutes i on i.institute_id =a2.instituteId 
      where  a.isDelete =false AND a2.isDelete =FALSE and a.status ='1' and a2.courseId=${CourseId}
      `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: `all assignmentData are ....`, data: assignmentData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Assignment data not found...`, err });
  }
};

const AssignmentBysubCourseId = async (req, res) => {
  const { subCourseId } = req.query;
  try {
    const assignmentData = await db.sequelize.query(
      `
      select a.id ,a.assignmentsName ,a.assignmentsPathsUrl ,a.lastDate ,a2.instituteId ,a2.courseId ,
      a2.subCourseId ,a.assignmentId ,a2.instituteId  
      from assignments a 
      inner join assignments a2 on a2.id =a.assignmentId 
       INNER JOIN subcourses s on s.subcourses_id =a2.subCourseId 
       inner join institutes i on i.institute_id =a2.instituteId 
      where  a.isDelete =false AND a2.isDelete =FALSE and a.status ='1' and a2.subCourseId=${subCourseId}
      `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: `all assignmentData are ....`, data: assignmentData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Assignment data not found...`, err });
  }
};

const deleteAssignment = async (req, res) => {
  const { id } = req.query;
  try {
    const data = {
      isDelete: true,
    };
    const deleteData = await assignment.update(data, {
      where: {
        isDelete: false,
        id: id,
      },
    });
    res
      .status(200)
      .json({ msg: `Assignment data are deleted...`, data: deleteData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Assignment are not deleted...`, err });
  }
};

module.exports = {
  inserAssignment,
  getAllAssignment,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
  courseAssignment,
  courseAssignmentById,
  AssignmentByCourseId,
  subCourseAssignment,
  subCourseAssignmentById,
  subCourseAssignmentByCourseId,
  AssignmentBysubCourseId,
  instituteAllAssignment,
  AllAssignmentByInstituteId,
};
