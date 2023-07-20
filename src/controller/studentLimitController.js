const { QueryTypes } = require("sequelize");
const db = require("../Config/dbConnection");
const { studentlimit } = require("../Config/dbConnection");

const isertStudentLimit = async (req, res) => {
  const { ...rest } = req.body;
  try {
    const instituteData = await studentlimit.findOne({
      where: {
        instituteId: rest.instituteId,
        isDelete: false,
      },
    });
    console.log("instituteData", instituteData.instituteId);

    if (instituteData.instituteId !== rest.instituteId) {
      log;
      const limitData = await studentlimit.create({
        instituteId: rest.instituteId,
        maxNoOfStudents: rest.maxNoOfStudents,
      });
      res
        .status(200)
        .json({ msg: `student limit data inserted....`, data: limitData });
    } else {
      res.status(400).json({ msg: `this institute is allready created...` });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `student limit not inserted data...`, err });
  }
};

const getStudentLimit = async (req, res) => {
  try {
    const limitData = await db.sequelize.query(
      `select s.instituteId ,s.maxNoOfStudents ,i.InstituteName ,i.InstituteLogo ,s2.user_id ,s2.name 
      from studentlimits s 
      inner join institutes i on i.institute_id =s.instituteId 
      inner join studentdetails s2 on s2.institutionId =s.instituteId 
      where s.isDelete =false and i.isDelete =false and s2.isDelete =false`,
      {
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).json({ msg: `student limit data are...`, data: limitData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `student limit not found...`, err });
  }
};

const getStudentLimitById = async (req, res) => {
  const { instituteId } = req.query;
  try {
    const userData = await db.sequelize.query(
      `select s.instituteId ,s.maxNoOfStudents ,i.InstituteName ,i.InstituteLogo ,s2.user_id ,
      s2.name 
       from studentlimits s 
       inner join institutes i on i.institute_id =s.instituteId 
       inner join studentdetails s2 on s2.institutionId =s.instituteId 
       where s.isDelete =false and i.isDelete =false and s2.isDelete =false and s.instituteId =${instituteId}`,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: `get student limit data by id ....`, data: userData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `student limit data not found by id...`, err });
  }
};

const updateStudentLimit = async (req, res) => {
  const { instituteId } = req.query;
  const { ...rest } = req.body;
  try {
    const data = {
      maxNoOfStudents: rest.maxNoOfStudents,
    };
    const userData = await studentlimit.findOne({
      where: {
        instituteId: instituteId,
        isDelete: false,
      },
    });
    console.log("userData", userData);
    if (userData !== null) {
      const updateData = await studentlimit.update(data, {
        where: {
          instituteId: instituteId,
          isDelete: false,
        },
      });
      res
        .status(200)
        .json({ msg: `Student Limit data updated...`, data: updateData });
    } else {
      res.status(400).json({ msg: `this institute is not persent` });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `Student Limit data not update.....`, err });
  }
};

const deleteStudentLimit = async (req, res) => {
  const { instituteId } = req.query;
  try {
    const data = {
      isDelete: true,
    };
    const deleteData = await studentlimit.update(data, {
      where: {
        isDelete: false,
        instituteId: instituteId,
      },
    });
    res
      .status(200)
      .json({ msg: `student limit data deleted are...`, data: deleteData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `student limit data not deleted...`, err });
  }
};

module.exports = {
  isertStudentLimit,
  getStudentLimit,
  getStudentLimitById,
  updateStudentLimit,
  deleteStudentLimit,
};
