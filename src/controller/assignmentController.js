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
     status:rest.status
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
      select a.id ,a.assignmentsName ,a.assignmentsPathsUrl ,a.lastDate ,a.instituteId ,a.courseId ,
      a.subCourseId  ,c.course 
      from assignments a 
      inner join courses c on c.course_id =a.courseId 
      where  a.isDelete =false && c.isDelete =false and a.status ='0' 
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
      status:rest.status
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
      c.course 
      from assignments a 
      inner join courses c on c.course_id =a.courseId 
      where  a.isDelete =false && c.isDelete =false and a.status ='0' 
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

const courseAssignmentById = async (req, res) => {
  const {id}=req.query
  try {
    const assignmentData = await db.sequelize.query(
      `
      select a.id ,a.assignmentsName ,a.assignmentsPathsUrl ,a.lastDate ,a.instituteId ,a.courseId ,
      c.course 
      from assignments a 
      inner join courses c on c.course_id =a.courseId 
      where  a.isDelete =false && c.isDelete =false and a.status ='0'  && a.id=${id}
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
  const {courseId}=req.query
  try {
    const assignmentData = await db.sequelize.query(
      `
      select a.id ,a.assignmentsName ,a.assignmentsPathsUrl ,a.lastDate ,a.instituteId ,a.courseId ,
      c.course 
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
      select a.id ,a.assignmentsName ,a.assignmentsPathsUrl ,a.lastDate ,a.instituteId ,a.courseId ,
      c.course 
      from assignments a 
      inner join courses c on c.course_id =a.courseId 
      where  a.isDelete =false && c.isDelete =false and a.status ='0' 
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
  AssignmentByCourseId
};
