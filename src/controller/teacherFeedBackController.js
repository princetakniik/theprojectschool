const { QueryTypes } = require("sequelize");
const db = require("../Config/dbConnection");
const { userfeedback, studentdetails } = require("../Config/dbConnection");

const insertFeedbackTeac = async (req, res) => {
  const { ...rest } = req.body;
  try {
    const feedbackData = await userfeedback.create({
      userId: rest.userId,
      name: rest.name,
      feedback: rest.feedback,
      institutionId: rest.institutionId,
      courseId: rest.courseId,
      subCourseId: rest.subCourseId,
      rating: rest.rating,
      studentId: rest.studentId,
      responsiveness: rest.responsiveness,
      attentive: rest.attentive,
      politeness: rest.politeness,
    });
    res
      .status(200)
      .json({ msg: `teacher feedback data are...`, data: feedbackData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `teacher feedback data not insert...`, err });
  }
};

const teacherFeedbackAll = async (req, res) => {
  try {
    const userData = await db.sequelize.query(
      `
    select u.id ,u.userId as teacherId,u.name ,u.feedback ,u.institutionId ,u.courseId ,u.subCourseId,
    u.rating ,u.studentId ,s2.name as studentName,u.responsiveness ,u.attentive ,u.politeness,c.course
    from userfeedbacks u 
    inner join studentdetails s on s.user_id =u.userId and s.institutionId =u.institutionId 
    inner join studentdetails s2 on s2.user_id =u.studentId 
    inner join courses c on c.course_id =u.courseId  
    where s.role ='Teacher' and s.isDelete =false and u.isDelete =false and s2.isDelete =false 
`,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: `all teacher feedback are...`, data: userData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `teacher Feedback are not found...`, err });
  }
};

const teacherFeedbackById = async (req, res) => {
  const { id } = req.query;
  try {
    const userData = await db.sequelize.query(
      `
      select u.id ,u.userId as teacherId,u.name ,u.feedback ,u.institutionId ,u.courseId ,u.subCourseId,
      u.rating ,u.studentId ,s2.name as studentName,u.responsiveness ,u.attentive ,u.politeness,c.course 
      from userfeedbacks u 
      inner join studentdetails s on s.user_id =u.userId and s.institutionId =u.institutionId 
      inner join studentdetails s2 on s2.user_id =u.studentId
      inner join courses c on c.course_id =u.courseId  
      where s.role ='Teacher' and s.isDelete =false and u.isDelete =false and s2.isDelete =false and 
      u.id =${id}
`,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: `teacher feedback data are...`, data: userData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `teacher feedback data not found...`, err });
  }
};

const updateFeedbackByTea = async (req, res) => {
  const { id } = req.query;
  const { ...rest } = req.body;
  try {
    const data = {
      name: rest.name,
      feedback: rest.feedback,
      institutionId: rest.institutionId,
      courseId: rest.courseId,
      subCourseId: rest.subCourseId,
      rating: rest.rating,
      studentId: rest.studentId,
      responsiveness: rest.responsiveness,
      attentive: rest.attentive,
      politeness: rest.politeness,
    };
    const updateFeedback = await userfeedback.update(data, {
      where: {
        id: id,
        isDelete: false,
      },
    });
    res.status(200).json({
      msg: `teacher feedback data updated are...`,
      data: updateFeedback,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `teacher feedback data not update...`, err });
  }
};

const deleteFeedbackByTea = async (req, res) => {
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
    res.status(200).json({
      msg: `teacher feedback data are deleted...`,
      data: deleteFeedback,
    });
  } catch (err) {
    res
      .status(500)
      .json({ msg: `feedback not deleted by teacher are...`, err });
  }
};

const teacherFeedbackByInstitute = async (req, res) => {
  const { institutionId } = req.query;
  try {
    const feedbackData = await db.sequelize.query(
      `
    select u.id ,u.userId as teacherId,u.name ,u.feedback ,u.institutionId ,u.courseId ,u.subCourseId,
    u.rating ,u.studentId ,s2.name as studentName,u.responsiveness ,u.attentive ,u.politeness,c.course
    from userfeedbacks u 
    inner join studentdetails s on s.user_id =u.userId and s.institutionId =u.institutionId 
    inner join studentdetails s2 on s2.user_id =u.studentId 
    inner join courses c on c.course_id =u.courseId  
    where s.role ='Teacher' and s.isDelete =false and u.isDelete =false and s2.isDelete =false and
     u.institutionId =${institutionId}
     `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).json({
      msg: `teacher feedback data are institute id : ${institutionId}`,
      data: feedbackData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: `teacher feedback data are institute id : ${institutionId} is not found `,
      err,
    });
  }
};

module.exports = {
  insertFeedbackTeac,
  teacherFeedbackAll,
  teacherFeedbackById,
  updateFeedbackByTea,
  deleteFeedbackByTea,
  teacherFeedbackByInstitute,
};
