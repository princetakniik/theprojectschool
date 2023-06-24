const { uploadvideo, viewvideo } = require("../Config/dbConnection");
const { QueryTypes } = require("sequelize");
const db = require("../Config/dbConnection");

const viewUser = async (req, res) => {
  const { ...rest } = req.body;
  try {
    const uploadData = await uploadvideo.findOne({
      where: {
        id: rest.videoId,
      },
    });

    const userData = await viewvideo.findOne({
      where: {
        videoId: rest.videoId,
        userId: rest.userId,
      },
    });

    if (uploadData === null) {
      res.status(400).json({ msg: `video is not persent this id ...` });
    } else if (userData !== null) {
      const data = {
        videoId: rest.videoId,
        instituteId: rest.instituteId,
        courseId: rest.courseId,
        subCourseId: rest.subCourseId,
        userId: rest.userId,
        videoMin: rest.videoMin,
        videoSawMin: rest.videoSawMin,
        status: rest.status,
      };
      const userData = await viewvideo.update(data, {
        where: {
          videoId: rest.videoId,
          userId: rest.userId,
        },
      });
      res
        .status(400)
        .json({ msg: `video is persent this id ...`, data: userData });
    } else {
      const userData = await viewvideo.create({
        videoId: rest.videoId,
        instituteId: rest.instituteId,
        courseId: rest.courseId,
        subCourseId: rest.subCourseId,
        userId: rest.userId,
        videoMin: rest.videoMin,
        videoSawMin: rest.videoSawMin,
        status: rest.status,
      });
      res.status(200).json({ msg: `user saw this video...`, data: userData });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `user not view this video....`, err });
  }
};

const getViewUser = async (req, res) => {
  try {
    const userData = await db.sequelize.query(
      `
      select v.id,v.instituteId ,v.courseId ,v.subCourseId ,v.userId ,v.videoId ,v.videoMin ,
      v.videoSawMin ,v.status,u.videosPaths ,u.videoName  ,s.subcourses 
      from viewvideos v
      inner join uploadvideos u on u.id =v.videoId 
      inner join subcourses s on s.subcourses_id =u.subCourseId 
      where u.isDelete=false && v.isDelete =false  
`,
      {
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).json({ msg: `user data found ....`, data: userData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `user data not found...`, err });
  }
};

const getViewUserById = async (req, res) => {
  const { id } = req.query;
  try {
    const userData = await db.sequelize.query(
      `
      select v.instituteId ,v.courseId ,v.subCourseId ,v.userId ,v.videoId ,v.videoMin ,
      v.videoSawMin ,v.status,u.videosPaths ,u.videoName  ,s.subcourses 
      from viewvideos v
      inner join uploadvideos u on u.id =v.videoId 
      inner join subcourses s on s.subcourses_id =u.subCourseId  
      where u.isDelete=false && v.isDelete =false  && v.id =${id}
`,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: `user data found by user id...`, data: userData });
  } catch (err) {
    console.log(err);
    res.status(200).json({ msg: `user data not found by id...`, err });
  }
};

const videoNotViewUser = async (req,res)=>{
    const {subcoursesId} =req.query
    try{
const userData = await db.sequelize.query(`
select s.user_id ,s.name ,s.email ,s.phone,u.id ,u.videosPaths ,u.videoName  from studentdetails s 
inner join courses c on c.Institute =s.institutionId 
inner join subcourses s2 on s2.InstituteId =s.institutionId 
inner join uploadvideos u on u.instituteId =s.institutionId && u.subCourseId =s2.subcourses_id 
where s2.subcourses_id =${subcoursesId} && s.role='Student' && s.user_id not in 
(select v.userId  from viewvideos v where v.subCourseId=${subcoursesId})
group by s.id ,u.id 
`, {
    type: QueryTypes.SELECT,
  })
  res.status(200).json({msg:``})
    }catch(err){
        console.log(err);
        res.status(500).json({msg:`data not found ...`,err})
    }
}   

const updateViewData = async (req, res) => {
  const { id } = req.query;
  const { ...rest } = req.body;
  try {
    const data = {
      videoId: rest.videoId,
      instituteId: rest.instituteId,
      courseId: rest.courseId,
      subCourseId: rest.subCourseId,
      userId: rest.userId,
      videoMin: rest.videoMin,
      videoSawMin: rest.videoSawMin,
      status: rest.status,
    };
    const userData = await viewvideo.update(data, {
      where: {
        id: id,
      },
    });
    res.status(200).json({ msg: `user data update...`, data: userData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `user data not update`, err });
  }
};

const deleteViewData = async (req, res) => {
  const { id } = req.query;
  try {
    const data = {
      isDelete: true,
    };
    const userData = await viewvideo.update(data, {
      where: {
        id,
      },
    });
    res.status(200).json({ msg: `user data is deleted ...`, data: userData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `user data not deleted...`, err });
  }
};

module.exports = {
  viewUser,
  getViewUser,
  getViewUserById,
  updateViewData,
  deleteViewData,
};
