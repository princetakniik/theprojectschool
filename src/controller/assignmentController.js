const { assignment } = require("../Config/dbConnection");
const { QueryTypes } = require("sequelize");
const db = require("../Config/dbConnection");

const inserAssignment = async (req, res) => {
  const { ...rest } = req.body;
  try {
    const assignmentData = await assignment.create({
      assignmentsName: rest.assignmentsName,
      lastDate: rest.lastDate,
      instituteId: rest.instituteId,
      courseId: rest.courseId,
      subCourseId: rest.subCourseId,
      userId: rest.userId,
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
select a.id ,a.assignmentsName ,a.lastDate ,a.instituteId ,a.courseId ,a.subCourseId ,a.userId ,s.subcourses 
from assignments a 
inner join subcourses s on s.subcourses_id =a.subCourseId && s.InstituteId =a.instituteId 
where s.isDelete =false && a.isDelete =false 
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
select a.assignmentsName ,a.lastDate ,a.instituteId ,a.courseId ,a.subCourseId ,a.userId ,s.subcourses 
from assignments a 
inner join subcourses s on s.subcourses_id =a.subCourseId && s.InstituteId =a.instituteId 
where s.isDelete =false && a.isDelete =false && id=${id}

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
      lastDate: rest.lastDate,
      instituteId: rest.instituteId,
      courseId: rest.courseId,
      subCourseId: rest.subCourseId,
      userId: rest.userId,
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
    res.status(200).json({msg:`Assignment data are deleted...`,data:deleteData})
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
  deleteAssignment
};
