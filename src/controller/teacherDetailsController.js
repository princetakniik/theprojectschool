const { studentdetails } = require("../Config/dbConnection");
const { QueryTypes } = require("sequelize");
const db = require("../Config/dbConnection");

const getAllTeacher = async (req, res) => {
  try {
    const getTeacher = await db.sequelize.query(`select r.email,r.fname,r.lname,r.username,r.phone,s.user_id,
    s.institutionname,s.courseenrolled,s.class,s.section,s.classteacher,s.teacherId,s.role 
    from registers r 
    inner join studentdetails s on s.email =r.email 
    where s.role='Teacher' && r.isDelete =false && s.isDelete=false `,
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

module.exports = {
  getAllTeacher,
};
