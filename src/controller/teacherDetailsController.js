const { studentdetails, register } = require("../Config/dbConnection");
const { QueryTypes } = require("sequelize");
const db = require("../Config/dbConnection");

const createTeacher = async (req, res) => {
  const { ...rest } = req.body;
  let result = [];
  try {
    const userRegister = await register.findOne({
      where: {
        email: rest.email,
        isDelete: false,
      },
    });
    console.log("user", userRegister);

    if (userRegister != null || userRegister != undefined) {
      const getData = await studentdetails.findOne({
        where: {
          email: rest.email,
          isDelete: false,
        },
      });
      console.log("get", getData);
      if (getData === null) {
        const data = {
          user_id: userRegister.user_id,
          email: userRegister.email,
          name: userRegister.fname + userRegister.lname,
          profilePhoto: rest.profilePhoto,
          phone: userRegister.phone,
          institutionId: rest.institutionId,
          role: "Teacher",
          address: rest.address,
          Additional: rest.Additional,
          zipCode: rest.zipCode,
          city: rest.city,
          state: rest.state,
          country: rest.country,
          gender: rest.gender,
          dob: rest.dob,
          Department_Id: rest.Department_Id,
          Semester: rest.Semester,
          eContactName: rest.eContactNume,
          eContactNum: rest.eContactNum,
          eContactRela: rest.eContactRela,
          Employee_ID: rest.Employee_ID,
          TIWExperience: rest.TIWExperience,
          TTWExperience: rest.TTWExperience,
          Title: rest.Title,
        };

        const create = await studentdetails.create(data);
        result.push(create);
        console.log("data", result);
      } else {
        res.send({ msg: "this email is already filled details" });
      }
    } else {
      res.status(400).json({ msg: "user is not register" });
    }
    res.status(200).json({ msg: "create data successfully", data: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "students deatils not created ...", err });
  }
};

const getAllTeacher = async (req, res) => {
  try {
    const getTeacher = await db.sequelize.query(
      `select s.user_id ,s.email ,s.name ,s.profilePhoto ,s.phone ,s.institutionId, 
      s.coursesId, s.subCoursesId, s.class,s.section ,s.teacherId,i.InstituteName,i.InstituteLogo,
      s.Additional,s.address,s.city,s.state,s.country,s.zipCode 
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
      s.coursesId, s.subCoursesId,s.class,s.section ,s.teacherId,i.InstituteName,i.InstituteLogo,
      s.Additional,s.address,s.city ,s.state,s.country,s.zipCode
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

const updateTeacherProfile = async (req, res) => {
  const { ...rest } = req.body;
  try {
    const data = {
      profilePhoto: rest.profilePhoto,
      phone: rest.phone,
      institutionId: rest.institutionId,
      teacherId: rest.teacherId,
      address: rest.address,
      Additional: rest.Additional,
      zipCode: rest.zipCode,
      city: rest.city,
      state: rest.state,
      country: rest.country,
      gender: rest.gender,
      dob: rest.dob,
      Department_Id: rest.Department_Id,
      Semester: rest.Semester,
      eContactName: rest.eContactNume,
      eContactNum: rest.eContactNum,
      eContactRela: rest.eContactRela,
      Employee_ID: rest.Employee_ID,
      TIWExperience: rest.TIWExperience,
      TTWExperience: rest.TTWExperience,
      Title: rest.Title,
    };
    const teacherDetail = await studentdetails.update(data, {
      where: { email: rest.email, role: "Teacher", isDelete: false },
    });
    res
      .status(200)
      .json({ msg: `teacher details update`, data: teacherDetail });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `teacher details is not register`, err });
  }
};

module.exports = {
  getAllTeacher,
  getTeacherByInstitute,
  updateTeacherProfile,
  createTeacher,
};
