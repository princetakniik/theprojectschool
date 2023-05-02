const { studentdetails, register } = require("../Config/dbConnection");
const { QueryTypes } = require("sequelize");
const db = require("../Config/dbConnection");

const createStudentsDetails = async (req, res) => {
  const { ...rest } = req.body;
  let result = [];
  try {
    const userRegister = await register.findOne({
      where: {
        email: rest.email,
      },
    });
  
    if (userRegister != null || userRegister != undefined) {
      const getData = await studentdetails.findOne({
        where: {
          email: rest.email,
        },
      });
  
      if (getData == null || getData.email !== rest.email) {
        const data={
          user_id:userRegister.user_id,
          email:rest.email,
          name: rest.name,
          profilePhoto:rest.profilePhoto,
          phone: rest.phone,
          institutionId: rest.institutionId,
          coursesId: rest.coursesId,
          subCoursesId:rest.subCoursesId,
          class: rest.class,
          section: rest.section,
          role:rest.role,
          teacherId: rest.teacherId
        }
     
        const create = await studentdetails.create(data);
        result.push(create);
        console.log('data',result);
      } else {
        res.send({ msg: "this email is already students" });
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

const getDataAllSt = async (req, res) => {
  try {
    const data = await db.sequelize.query(
      `select s.user_id ,s.email ,s.name ,s.profilePhoto ,s.phone ,s.institutionId, 
      s.coursesId, s.subCoursesId, s.class,s.section ,s.teacherId,i.InstituteName 
      from studentdetails s 
      inner join institutes i on i.institute_id =s.institutionId 
      where s.role ='Student' && s.isDelete =false   `,
      {
        //&& ad.date=${date}
        type: QueryTypes.SELECT,
      }
    );
    console.log("data", data);
    res.status(200).json({ msg: "student data get successfully", data: data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "students data not founds" });
  }
};

const getStudentByInstitute =async(req,res)=>{
  try{
const data =  await db.sequelize.query(
  `select s.user_id ,s.email ,s.name ,s.profilePhoto ,s.phone ,s.institutionId, 
  s.coursesId, s.subCoursesId, s.class,s.section ,s.teacherId,i.InstituteName 
  from studentdetails s 
  inner join institutes i on i.institute_id =s.institutionId 
  where s.role ='Student' && s.institutionId=${req.query.institutionId} && s.isDelete =false    `,
  {
    //&& ad.date=${date}
    type: QueryTypes.SELECT,
  }
);
console.log("data", data);
res.status(200).json({ msg: "student data get successfully", data: data });
  }catch(err){
    console.log(err);
    res.status(500).json({msg:`data not get `,err})
  }
}
const getDataClassWise = async (req, res) => {
  const { Class,institutionId } = req.body;
  console.log("apidata....", req.body);
  try {
    const data =  await db.sequelize.query(
      `select s.user_id ,s.email ,s.name ,s.profilePhoto ,s.phone ,s.institutionId, 
      s.coursesId, s.subCoursesId, s.class,s.section ,s.teacherId,i.InstituteName 
      from studentdetails s 
      inner join institutes i on i.institute_id =s.institutionId 
      where s.role ='Student' && s.class =${Class} && s.institutionId=${institutionId} && s.isDelete =false     `,
      {
        //&& ad.date=${date}
        type: QueryTypes.SELECT,
      }
    );
    console.log("data", data);
    res.status(200).json({ msg: "student data get successfully", data: data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "students data not founds" });
  }
};

const getDataTeacherWise = async (req, res) => {
  const { Class, teacherId,institutionId } = req.body;
  console.log("api..", req.body);
  try {
    const data =  await db.sequelize.query(
      `select s.user_id ,s.email ,s.name ,s.profilePhoto ,s.phone ,s.institutionId, 
      s.coursesId, s.subCoursesId, s.class,s.section ,s.teacherId,i.InstituteName 
      from studentdetails s 
      inner join institutes i on i.institute_id =s.institutionId 
      where s.role ='Student' && s.class =${Class}&& s.teacherId=${teacherId} && s.institutionId=${institutionId} && s.isDelete =false     `,
      {
        //&& ad.date=${date}
        type: QueryTypes.SELECT,
      }
    );
    console.log("data", data);
    res.status(200).json({ msg: "student data get successfully", data: data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "students data not founds" });
  }
};

const getDetailById = async (req, res) => {
  const { user_id } = req.query;
  try {
    const data =  await db.sequelize.query(
      `select s.user_id ,s.email ,s.name ,s.profilePhoto ,s.phone ,s.institutionId, 
      s.coursesId, s.subCoursesId, s.class,s.section ,s.teacherId,i.InstituteName 
      from studentdetails s 
      inner join institutes i on i.institute_id =s.institutionId 
      where s.user_id =${user_id}&& s.isDelete =false     `,
      {
        //&& ad.date=${date}
        type: QueryTypes.SELECT,
      }
    );
    console.log("data", data);
    res.status(200).json({ msg: "student data get successfully", data: data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "students data not found", err });
  }
};
const updateDetailsSt = async (req, res) => {
  const { ...rest } = req.body;
  try {
    const data = {
      name: rest.name,
      profilePhoto:rest.profilePhoto,
      phone: rest.phone,
      institutionId:rest.institutionId,
      coursesId:rest.coursesId,
      subCoursesId:rest.subCoursesId,
      class: rest.class,
    section: rest.section,
      teacherId: rest.teacherId
    };
    console.log("data", data);
    const updateData = await studentdetails.update(data, {
      where: {
        user_id: req.query.user_id,
      },
    });
    res.status(200).json({ msg: "update data successfully", data: updateData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "students details not update", err });
  }
};

const updateProfilePic = async(req,res)=>{
  const { ...rest } = req.body;
  try{
    const data={
      profilePhoto:rest.profilePhoto,
    }
const profilePic = await studentdetails.update(data,{
  where:{
    user_id: req.query.user_id,
  }
})
res.status(200).json({msg:`update profilePhoto successfully ${req.query.user_id}`,data:profilePic})
  }catch(err){
    console.log(err);
    res.status(500).json({msg:`profile pic not update id ${req.query.user_id}`})
  }
}
const deteteDetailsSt = async (req, res) => {
  const {user_id}=req.query
  try {
    const data = {
      isDelete: true,
    };
    const deleteData = await studentdetails.update(data, {
      where: {
        user_id,
      },
    });
    res
      .status(200)
      .json({ msg: "students details delete successfully", data: deleteData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "students details not delete ..", err });
  }
};

module.exports = {
  createStudentsDetails,
  getDataAllSt,
  getDetailById,
  updateDetailsSt,
  deteteDetailsSt,
  getDataClassWise,
  getDataTeacherWise,
  getStudentByInstitute,
  updateProfilePic
};
