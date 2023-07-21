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

const getAllViewVideoModule = async (req, res) => {
  try {
    const userData = await db.sequelize.query(
      `
      select v.id,v.instituteId ,v.courseId ,v.subCourseId ,v.userId ,v.videoId ,v.videoMin ,
      v.videoSawMin ,v.status,u.videosPaths ,u.videoName  ,c.course 
      from viewvideos v
      inner join uploadvideos u on u.id =v.videoId 
      inner join courses c on c.course_id =u.courseId 
      where u.isDelete=false && v.isDelete =false 
`,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: `module wise all videos are...`, data: userData });
  } catch (err) {
    console.log(err);
    res.status({ msg: `All View Video Module are not found....`, err });
  }
};

const getViewVideoModule = async (req, res) => {
  const { id } = req.query;
  try {
    const viewData = await db.sequelize.query(
      `select v.id ,v.instituteId ,v.courseId ,v.subCourseId ,v.userId ,v.videoId ,v.videoMin ,
v.videoSawMin ,v.status,u.videosPaths ,u.videoName  ,c.course 
from viewvideos v
inner join uploadvideos u on u.id =v.videoId 
inner join courses c on c.course_id =u.courseId 
where u.isDelete=false && v.isDelete =false && c.isDelete =false  && v.id =${id}
`,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: `View Video by id data are...`, data: viewData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `View Video Module not found by id...`, err });
  }
};

const videoNotViewUser = async (req, res) => {
  const { subcoursesId, instituteId } = req.query;
  try {
    const userData = await db.sequelize.query(
      `
select s.user_id ,u.id as videoId ,u.videoName ,u.subCourseId ,u.instituteId,u.videosPaths
 from studentdetails s 
inner join uploadvideos u on u.instituteId =s.institutionId 
where u.instituteId =${instituteId} && u.subCourseId =${subcoursesId} && u.isDelete =false && s.role ='Student' &&
 (u.id,s.user_id ) not in
(select v.videoId as id , v.userId as user_id  from viewvideos v where v.isDelete=false &&
   v.subCourseId=${subcoursesId} && v.instituteId=${instituteId})

`,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: `user not view videos are ...`, data: userData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `data not found ...`, err });
  }
};

const videoNotViewUserModule = async (req, res) => {
  const { instituteId, courseId } = req.query;
  try {
    const videoData = await db.sequelize.query(
      `
       select s.user_id ,u.id as videoId ,u.videoName ,u.subCourseId ,u.instituteId,u.videosPaths,
       u.courseId 
       from studentdetails s 
       inner join uploadvideos u on u.instituteId =s.institutionId 
       where u.instituteId =${instituteId} && u.courseId=${courseId} && u.isDelete =false 
       && s.role ='Student' && (u.id,s.user_id ) not in
       (select v.videoId as id , v.userId as user_id  from viewvideos v where v.isDelete=false &&
       v.courseId=${courseId}  && v.instituteId=${instituteId})
       `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: `user not view video data are...`, data: videoData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `data not found...`, err });
  }
};

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
  getAllViewVideoModule,
  getViewVideoModule,
  videoNotViewUser,
  videoNotViewUserModule,
  updateViewData,
  deleteViewData,
};
