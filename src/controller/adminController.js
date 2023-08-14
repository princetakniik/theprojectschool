const { QueryTypes } = require("sequelize");
const db = require("../Config/dbConnection");

const getAdmin = async (req, res) => {
  try {
    const adminData = await db.sequelize.query(
      `
      SELECT s.id ,s.user_id ,s.email ,s.name ,s.profilePhoto ,s.address ,s.city ,s.phone ,
      s.gender ,s.country ,s.state 
      from studentdetails s 
      inner join registers r on r.email =s.email 
      where s.role ='Admin' and s.isDelete =FALSE 
        `,
      { type: QueryTypes.SELECT }
    );
    res.status(200).json({ msg: `admin data are ....`, data: adminData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `admin data not found `, err });
  }
};

module.exports = {
  getAdmin,
};
