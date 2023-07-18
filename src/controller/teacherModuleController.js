const { teachermodule } = require("../Config/dbConnection");
const { QueryTypes } = require("sequelize");
const db = require("../Config/dbConnection");

const insertTeacherModule = async (req, res) => {
  const { ...rest } = req.body;
  try {
    const userData = await teachermodule.create({
      instituteId: rest.instituteId,
      courseId: rest.courseId,
      subcourseId: rest.subcourseId,
      userId: rest.userId,
      teachDate: rest.teachDate,
      startTime: rest.startTime,
      endTime: rest.endTime,
    });
    res
      .status(200)
      .json({ msg: `teacher module data inserted ....`, data: userData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `teacher module data not insert...`, err });
  }
};

const getTeacherModule = async (req, res) => {
  try {
    const moduleData = await db.sequelize.query(
      `
      select t.id,s.user_id ,s.name,s2.subcourses ,t.instituteId ,t.subcourseId ,t.teachDate  ,
      c.course ,c.course_id,t.startTime ,t.endTime 
      from studentdetails s 
      inner join subcourses s2 on s2.InstituteId =s.institutionId 
      inner join teachermodules t on t.instituteId =s2.InstituteId && s2.subcourses_id =t.subcourseId && t.userId =s.user_id 
      inner join courses c on c.course_id =t.courseId && c.Institute =t.instituteId 
      where s.isDelete =false && s2.isDelete =false && t.isDelete =false && t.teachDate =current_date() 
`,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: `Teacher Module data are...`, data: moduleData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Teacher Module data not found...`, err });
  }
};

const TeacherModuleById = async (req, res) => {
  const { courseId, instituteId } = req.query;
  try {
    const teacherData = await db.sequelize.query(
      `
select t.id,s.user_id ,s.name,s2.subcourses ,t.instituteId ,t.subcourseId ,t.teachDate  ,c.course ,
c.course_id ,t.startTime ,t.endTime 
from studentdetails s 
inner join subcourses s2 on s2.InstituteId =s.institutionId 
inner join teachermodules t on t.instituteId =s2.InstituteId && s2.subcourses_id =t.subcourseId && t.userId =s.user_id 
inner join courses c on c.course_id =t.courseId && c.Institute =t.instituteId 
where s.isDelete =false && s2.isDelete =false && t.isDelete =false && t.teachDate =current_date()
 && t.courseId =${courseId} && t.instituteId =${instituteId}
`,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: `teacher module wise data found...`, data: teacherData });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ msg: `Teacher Module wise data not found....`, err });
  }
};

const updateTeacherModule = async (req, res) => {
  const { id } = req.query;
  const { ...rest } = req.body;
  try {
    const data = {
      instituteId: rest.instituteId,
      courseId: rest.courseId,
      subcourseId: rest.subcourseId,
      userId: rest.userId,
      teachDate: rest.teachDate,
      startTime: rest.startTime,
      endTime: rest.endTime,
    };
    const updateData = await teachermodule.update(data, {
      where: {
        id: id,
        isDelete: false,
      },
    });
    res
      .status(200)
      .json({ msg: `teacher module data updated...`, data: updateData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `teacher module not update...`, err });
  }
};

const deleteTeacherModule = async (req, res) => {
  const { id } = req.query;
  try {
    const data = {
      isDelete: true,
    };
    const deleteData = await teachermodule.update(data, {
      where: {
        id: id,
        isDelete: false,
      },
    });
    res
      .status(200)
      .json({ msg: `Teacher Module data deleted...`, data: deleteData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `teacher module data not deleted...`, err });
  }
};

module.exports = {
  insertTeacherModule,
  getTeacherModule,
  TeacherModuleById,
  updateTeacherModule,
  deleteTeacherModule,
};
