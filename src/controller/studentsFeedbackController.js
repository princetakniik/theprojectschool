const { QueryTypes } = require("sequelize");
const db = require("../Config/dbConnection");
const { userfeedback } = require("../Config/dbConnection");

const insertFeedbackByStu = async (req, res) => {
  const { ...rest } = req.body;
  try {
    const studentFeedback = await userfeedback.create({
      userId: rest.userId,
      name: rest.name,
      feedback: rest.feedback,
      institutionId: rest.institutionId,
      courseId: rest.courseId,
      subCourseId: rest.subCourseId,
      rating: rest.rating,
    });
    res
      .status(200)
      .json({ msg: `student feedback data are...`, data: studentFeedback });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `student feedback data not insert....`, err });
  }
};

const studentFeedbackAll = async (req, res) => {
  try {
    const userData = await db.sequelize.query(
      `
      select DISTINCT u.id ,u.userId ,s.email ,s.name ,u.name as feedbackName ,u.feedback ,u.courseId ,u.rating,c.course  
      from userfeedbacks u 
      inner join studentdetails s on s.user_id =u.userId and s.institutionId =u.institutionId 
      inner join courses c on c.course_id =u.courseId and c.Institute =u.institutionId
      where s.isDelete =false and u.isDelete =false  and s.role='Student'
      order by u.id desc
`,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: `students feedback data are...`, data: userData });
  } catch (err) {
    res.status(500).json({ msg: `students feedback not found ....`, err });
  }
};

const studentFeedbackById = async (req, res) => {
  const { id } = req.query;
  try {
    const userData = await db.sequelize.query(
      `
      select DISTINCT u.id ,u.userId ,s.email ,s.name ,u.name as feedbackName ,u.feedback ,u.courseId ,u.rating,c.course  
      from userfeedbacks u 
      inner join studentdetails s on s.user_id =u.userId and s.institutionId =u.institutionId 
      inner join courses c on c.course_id =u.courseId and c.Institute =u.institutionId
      where s.isDelete =false and u.isDelete =false  and s.role='Student' and u.id =${id}
`,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: `student feedback by id are...`, data: userData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `student feedback data not found ....`, err });
  }
};

const updateFeedbackByStu = async (req, res) => {
  const { id } = req.query;
  const { ...rest } = req.body;
  try {
    const data = {
      userId: rest.userId,
      name: rest.name,
      feedback: rest.feedback,
      institutionId: rest.institutionId,
      courseId: rest.courseId,
      rating: rest.rating,
    };
    const updateData = await userfeedback.update(data, {
      where: {
        id: id,
        isDelete: false,
      },
    });
    res
      .status(200)
      .json({ msg: `student feedback data updated....`, data: updateData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `student feedback data not update...`, err });
  }
};

const deleteFeedbackByStu = async (req, res) => {
  const { id } = req.query;
  try {
    const data = {
      isDelete: true,
    };
    const deleteFeedback = await userfeedback.update(data, {
      where: {
        id: id,
        isDelete: false,
      },
    });
    res
      .status(200)
      .json({ msg: `student feedback deleted are ...`, data: deleteFeedback });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `student feedback data not deleted...`, err });
  }
};

const studentFeedbackSubAll = async (req, res) => {
  try {
    const userData = await db.sequelize.query(
      `
      select u.id ,u.userId ,s.email ,s.name ,u.name as feedbackName ,u.feedback ,u.courseId ,u.rating,c.course,u.subCourseId ,s2.subcourses  
      from userfeedbacks u 
      inner join studentdetails s on s.user_id =u.userId and s.institutionId =u.institutionId 
      inner join courses c on c.course_id =u.courseId and c.Institute =u.institutionId
      inner join subcourses s2 on s2.subcourses_id =u.subCourseId and s2.InstituteId =u.institutionId 
      where s.isDelete =false and u.isDelete =false  and s.role='Student'
      order by u.id desc
        `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).json({
      msg: `student Feedback Subcourses all data are...`,
      data: userData,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ msg: `student Feedback Subcourse all data not found ...`, err });
  }
};

const studentFeedbackSubById = async (req, res) => {
  const { id } = req.query;
  try {
    const userData = await db.sequelize.query(
      `
      select u.id ,u.userId ,s.email ,s.name ,u.name as feedbackName ,u.feedback ,u.courseId ,
      u.rating,c.course,u.subCourseId ,s2.subcourses  
      from userfeedbacks u 
      inner join studentdetails s on s.user_id =u.userId and s.institutionId =u.institutionId 
      inner join courses c on c.course_id =u.courseId and c.Institute =u.institutionId
      inner join subcourses s2 on s2.subcourses_id =u.subCourseId and s2.InstituteId =u.institutionId 
      where s.isDelete =false and u.isDelete =false  and s.role='Student' and u.id =${id}
       `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: `student Feedback Subcourse By Id are...`, data: userData });
  } catch (err) {
    console.log(err);
    res
      .status(200)
      .json({ msg: `student Feedback Subcourse By Id not found `, err });
  }
};

const studentFeedbackByInstitute = async (req, res) => {
  const { institutionId} = req.query;
  try {
    const feedbackData = await db.sequelize.query(
      `
      SELECT DISTINCT u.id ,u.userId ,s.email ,s.name ,u.name as feedbackName ,u.feedback ,
      u.courseId ,u.rating,c.course,u.institutionId 
      from userfeedbacks u 
      inner join studentdetails s on s.user_id =u.userId 
      inner join institutes i on u.institutionId =i.institute_id 
      INNER join courses c on c.course_id =u.courseId 
      where u.isDelete =FALSE and s.isDelete =FALSE and i.isDelete =FALSE and c.isDelete =false and s.role='Student' and 
      u.institutionId=${institutionId}
      `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).json({
      msg: `feedback data are by institute id ${institutionId}...`,
      feedbackData,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json(
        { msg: `feedback data not found by institute Id ${institutionId}` },
        err
      );
  }
};

module.exports = {
  insertFeedbackByStu,
  studentFeedbackAll,
  studentFeedbackById,
  updateFeedbackByStu,
  deleteFeedbackByStu,
  studentFeedbackSubAll,
  studentFeedbackSubById,
  studentFeedbackByInstitute,
};
