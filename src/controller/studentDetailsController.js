const { studentdetails } = require("../Config/dbConnection");
const { QueryTypes } = require("sequelize");
const db = require("../Config/dbConnection");

const createStudentsDetails = async (req, res) => {
  const { ...rest } = req.body;
  let data = [];
  try {
    const getData = await studentdetails.findOne({
      where: {
        email: rest.email,
      },
    });
    console.log("email", getData);
    if (getData == null || getData.email !== rest.email) {
      const create = await studentdetails.create(req.body);
      data.push(create);
    } else {
      res.send({ msg: "this email is already students" });
    }
    res.status(200).json({ msg: "create data successfully", data: data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "students deatils not created ...", err });
  }
};

const getDataAll = async (req, res) => {
  try {
    const data = await studentdetails.findAll ({
      where:{
        role:'Student',
        isDelete: false,
      }
    })
    console.log("data", data);
    res.status(200).json({ msg: "student data get successfully", data: data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "students data not founds" });
  }
};

const getDataClassWise = async (req, res) => {
  const { clas, classteacher, teacherId } = req.body;
  console.log('apidata....',req.body);
  try {
    const data = await studentdetails.findAll ({
      where:{
        role:'Student',
        class:clas,
        isDelete: false,
      }
    })
    console.log("data", data);
    res.status(200).json({ msg: "student data get successfully", data: data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "students data not founds" });
  }
};

const getDataTeacherWise = async (req, res) => {
  const { clas, classteacher, teacherId } = req.body;
  console.log('api..',req.body);
  try {
    const data = await studentdetails.findAll ({
      where:{
        role:'Student',
        classteacher:classteacher,
        isDelete: false,
      }
    })
    console.log("data", data);
    res.status(200).json({ msg: "student data get successfully", data: data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "students data not founds" });
  }
};

const getDetailByIdSt = async (req, res) => {
  const { email } = req.body;
  try {
    const getDataById = await studentdetails.findOne({
      where: {
        email: email,
        isDelete:false
      },
    });
    res
      .status(200)
      .json({ msg: "students details found by id ", data: getDataById });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "students data not found", err });
  }
};
const updateDetailsSt = async (req, res) => {
  const { ...rest } = req.body;
  try {
    const data = {
        name:rest.name,
      phone: rest.phone,
      institutionname: rest.institutionname,
      courseenrolled: rest.courseenrolled,
      class: rest.class,
      section: rest.section,
      classteacher: rest.classteacher,
      teacherId: rest.teacherId,
    };
    console.log("data", data);
    const updateData = await studentdetails.update(data, {
      where: {
        email: rest.email,
      },
    });
    res.status(200).json({ msg: "update data successfully", data: updateData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "students details not update", err });
  }
};
const deteteDetailsSt  = async (req,res) => {
    const {email} =req.body;
    try{
        const data={
            isDelete:true
        }
const deleteData = await studentdetails.update(data,{
    where: {
        email,
      },
})
res.status(200).json({msg:'students details delete successfully',data:deleteData})
    }catch(err){
        console.log(err);
        res.status(500).json({msg:'students details not delete ..',err})
    }
}
module.exports = {
  createStudentsDetails,
  getDataAll,
  getDetailByIdSt,
  updateDetailsSt,
  deteteDetailsSt,
  getDataClassWise,
  getDataTeacherWise
};
