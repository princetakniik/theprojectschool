const { qualifications } = require("../Config/dbConnection");
const { QueryTypes } = require("sequelize");
const db = require("../Config/dbConnection");

const studentQualification = async (req, res) => {
  const { ...rest } = req.body;
  try {
    const qualification = await qualifications.findOne({
      where: {
        user_id: rest.user_id,
        isDelete: false,
      },
    });
    console.log("qualification", qualification);
    if (qualification !== null) {
      res.status(400).json({ msg: `qualifications data found this userid` });
    } else {
      const insert = await qualifications.create(req.body);
      res
        .status(200)
        .json({ msg: "create qualification successfully", data: insert });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "qualification is not insert data", err });
  }
};

const getstudentQualification = async (req, res) => {
  try {
    const getdata = await db.sequelize.query(
      `select q.id ,q.user_id,q.X_Passed as X_pass,q.X_marks as X_marks,q.X_PassedYear as X_PassedYear,
      q.XII_Passed as XII_pass,q.XII_Marks as XII_marks,q.XII_PassedYear as XII_PassedYear,q.Stream as stream 
            from studentdetails s 
            inner join qualifications q on q.user_id =s.user_id 
            where s.role='Student' && q.isDelete =false `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: "get Qualification successfully all ", data: getdata });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "data not found successfully", err });
  }
};

const getstudentQualificationById = async (req, res) => {
  const { user_id } = req.query;
  console.log("user_id", user_id);
  try {
    const getdata = await db.sequelize.query(
      `select q.id ,q.user_id,q.X_Passed as X_pass,q.X_marks as X_marks,q.X_PassedYear as X_PassedYear,
      q.XII_Passed as XII_pass,q.XII_Marks as XII_marks,q.XII_PassedYear as XII_PassedYear,q.Stream as stream 
            from studentdetails s 
            inner join qualifications q on q.user_id =s.user_id 
      where s.role='Student' && q.isDelete =false && q.user_id=${user_id}`,
      {
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).json({
      msg: `get user By Id successfully ${user_id}`,
      data: getdata,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "data not found successfully By Id", err });
  }
};

const updatestudentQualificationById = async (req, res) => {
  const { ...rest } = req.body;
  try {
    const updateData = await qualifications.update(rest, {
      where: {
        isDelete: false,
        user_id: req.query.user_id,
      },
    });
    res.status(200).json({
      msg: `update qualification successfully ${req.query.user_id}`,
      data: updateData,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ msg: "qualification not update  successfully By Id", err });
  }
};

const deletestudentQualificationById = async (req, res) => {
  const user_id = req.query.user_id;
  try {
    const data = {
      isDelete: true,
    };
    const deleteData = await qualifications.update(data, {
      where: {
        isDelete: false,
        user_id: user_id,
      },
    });
    res.status(200).json({
      msg: `delete qualification successfully ${user_id}`,
      data: deleteData,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ msg: " qualification data not delete successfully By Id", err });
  }
};

const teacherQualification = async (req, res) => {
  const { ...rest } = req.body;
  try {
    const qualification = await qualifications.findOne({
      where: {
        user_id: rest.user_id,
      },
    });
    console.log("qualification", qualification);
    if (qualification !== null) {
      res.status(400).json({ msg: `qualifications data found this userid` });
    } else {
      const insert = await qualifications.create(req.body);
      res
        .status(200)
        .json({ msg: "create qualification successfully", data: insert });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "qualification is not insert data", err });
  }
};

const getTeacherQualification = async (req, res) => {
  try {
    const getdata = await db.sequelize.query(
      `select q.id ,q.user_id,q.graduate_Year as graduate_Year,q.graduation as graduation,q.Marks_Graduare as Marks_Graduare,
      q.Highest_degree as Highest_degree,q.FieldsOfStudy as FieldsOfStudy,
      q.ProfessionalCertificationApp as ProfessionalCertificationApp,q.ProfessionalCertificationName as ProfessionalCertificationName
                  from studentdetails s 
                  inner join qualifications q on q.user_id =s.user_id 
                  where s.role='Teacher' && q.isDelete =false `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: "get Qualification successfully all ", data: getdata });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "data not found successfully", err });
  }
};

const getTeacherQualificationById = async (req, res) => {
  const { user_id } = req.query;
  console.log("user_id", user_id);
  try {
    const getdata = await db.sequelize.query(
      `select q.id ,q.user_id,q.graduate_Year as graduate_Year,q.graduation as graduation,q.Marks_Graduare as Marks_Graduare,
      q.Highest_degree as Highest_degree,q.FieldsOfStudy as FieldsOfStudy,
      q.ProfessionalCertificationApp as ProfessionalCertificationApp,q.ProfessionalCertificationName as ProfessionalCertificationName
                  from studentdetails s 
                  inner join qualifications q on q.user_id =s.user_id 
                  where s.role='Teacher' && q.isDelete =false && q.user_id=${user_id}`,
      {
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).json({
      msg: `get user By Id successfully ${user_id}`,
      data: getdata,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "data not found successfully By Id", err });
  }
};

const updateTeacherQualificationById = async (req, res) => {
  const { ...rest } = req.body;
  try {
    const updateData = await qualifications.update(rest, {
      where: {
        isDelete: false,
        user_id: req.query.user_id,
      },
    });
    res.status(200).json({
      msg: `update qualification successfully ${req.query.user_id}`,
      data: updateData,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ msg: "qualification not update  successfully By Id", err });
  }
};

const deleteTeacherQualificationById = async (req, res) => {
  const user_id = req.query.user_id;
  try {
    const data = {
      isDelete: true,
    };
    const deleteData = await qualifications.update(data, {
      where: {
        isDelete: false,
        user_id: user_id,
      },
    });
    res.status(200).json({
      msg: `delete qualification successfully ${user_id}`,
      data: deleteData,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ msg: " qualification data not delete successfully By Id", err });
  }
};

module.exports = {
  studentQualification,
  getstudentQualification,
  getstudentQualificationById,
  updatestudentQualificationById,
  deletestudentQualificationById,
  teacherQualification,
  getTeacherQualification,
  getTeacherQualificationById,
  updateTeacherQualificationById,
  deleteTeacherQualificationById,
};
