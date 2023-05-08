const { studentdetails } = require("../Config/dbConnection");
const { QueryTypes } = require("sequelize");
const db = require("../Config/dbConnection");

const getAllTeacher = async (req, res) => {
  try {
    const getTeacher = await db.sequelize.query(
      `select s.user_id ,s.email ,s.name ,s.profilePhoto ,s.phone ,s.institutionId, 
    s.coursesId, s.subCoursesId, s.class,s.section ,s.teacherId,i.InstituteName,i.InstituteLogo 
    from studentdetails s 
    inner join institutes i on i.institute_id =s.institutionId 
    where s.role ='Teacher'  && s.isDelete =false    `,
      {
        //&& ad.date=${date}
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: "get all teacher data successfully", data: getTeacher });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "details not found", err });
  }
};

const getTeacherByInstitute = async (req, res) => {
  try {
    const getTeacher = await db.sequelize.query(
      `select s.user_id ,s.email ,s.name ,s.profilePhoto ,s.phone ,s.institutionId, 
    s.coursesId, s.subCoursesId, s.class,s.section ,s.teacherId,i.InstituteName,i.InstituteLogo 
    from studentdetails s 
    inner join institutes i on i.institute_id =s.institutionId 
    where s.role ='Teacher' && s.institutionId =${req.query.institutionId} && s.isDelete =false   `,
      {
        //&& ad.date=${date}
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: "get all teacher data successfully", data: getTeacher });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "details not found", err });
  }
};

const updateTeacherProfile= async (req, res) => {
  const { ...rest } = req.body;
  try {
    const data=  {
      profilePhoto:rest.profilePhoto,
      email: rest.email,
      address: rest.address,
      Additional: rest.Additional,
      zipCode: rest.zipCode,
      state: rest.state,
      country: rest.country,
    }
    const teacherDetail = await studentdetails.update(data,{
    where:{ email: rest.email }
  });
    res.status(200).json({msg:`teacher details update`,data:teacherDetail})
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `teacher details is not register`, err });
  }
};

module.exports = {
  getAllTeacher,
  getTeacherByInstitute,
  updateTeacherProfile
};
