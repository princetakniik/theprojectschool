const { studentdetails } = require("../Config/dbConnection");
const { QueryTypes } = require("sequelize");
const db = require("../Config/dbConnection");

const getAllTeacher = async (req, res) => {
  try {
    const getTeacher = await db.sequelize.query(`select s.user_id ,s.email,s.name ,s.profilePhoto ,s.phone ,s.institutionId ,s.coursesId ,s.subCoursesId 
    from registers r 
    inner join studentdetails s on s.email =r.email 
    where s.role ='Teacher' && s.isDelete =false  `,
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

const getTeacherByInstitute =async (req,res)=>{
  try{
    const getTeacher = await db.sequelize.query(`select s.user_id ,s.email,s.name ,s.profilePhoto ,s.phone ,s.institutionId ,s.coursesId ,s.subCoursesId 
    from registers r 
    inner join studentdetails s on s.email =r.email 
    where s.role ='Teacher' && s.isDelete =false  `,
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
}
module.exports = {
  getAllTeacher,
};
