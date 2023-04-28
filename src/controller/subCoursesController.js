const { subcourses, courses } = require("../Config/dbConnection");
const { QueryTypes } = require("sequelize");
const db = require("../Config/dbConnection");

const insertsubCourses = async (req, res) => {
    const {...rest}=req.body
  try {
    const courseData = await courses.findOne({
        where:{
            user_id:rest.course  
        }
    })
    console.log('data',courseData);
    if(!courseData){
        res.status(400).json(`create coures then create subCourses ${rest.course}`);
    }else{
    const insert = await subcourses.create(req.body);
    res.status(200).json({ msg: "create courses successfully", data: insert });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "course is not insert data", err });
  }
};

const getsubCourses = async (req, res) => {
  try {
    const getData = await db.sequelize.query(
        `select s.user_id as subCourseId,c.course,s.subcourses  from courses c 
        inner join subcourses s on s.course =c.user_id where s.isDelete =false `,
        {
          //&& ad.date=${date}
          type: QueryTypes.SELECT,
        }
      );
      console.log("data", getData);
    res.status(200).json({ msg: "get courses successfully all ", data: getData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "data get successfully", err });
  }
};

const getsubCoursesById = async (req, res) => {
    const id=req.query.id
  try {
    const getData = await db.sequelize.query(
        `select s.user_id as subCourseId,c.course,s.subcourses  from courses c 
        inner join subcourses s on s.course =c.user_id
         where s.user_id=${id} && s.isDelete =false `,
        {
          //&& ad.date=${date}
          type: QueryTypes.SELECT,
        }
      );
      console.log("data", getData);
      res.status(200).json({ msg: `get courses By Id successfully ${id}`, data: getData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "data get successfully By Id", err });
  }
};

const updatesubCoursesById = async (req, res) => {
    const {...rest}=req.body
    const id=req.query.id
  try {
    const courseData = await courses.findOne({
        where:{
            user_id:rest.course  
        }
    })
    if(!courseData){
        res.status(400).json(`create coures then update subCourses ${rest.course}`);
    }
    const updateData = await subcourses.update(rest,{
        where: {
          isDelete: false,
          user_Id:id
        },
      });
      res.status(200).json({ msg: `update courses successfully ${id}`, data: updateData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "data get successfully By Id", err });
  }
};

const deletesubCoursesById = async (req, res) => {
    const id=req.query.id
  try {
    const data ={
        isDelete:true
    }
    const deleteData = await subcourses.update(data,{
        where: {
          isDelete: false,
          user_Id:id
        },
      });
      res.status(200).json({ msg: `update courses successfully ${id}`, data: deleteData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "data get successfully By Id", err });
  }
};
module.exports = {
  insertsubCourses,
  getsubCourses,
  getsubCoursesById,
  updatesubCoursesById,
  deletesubCoursesById,
};