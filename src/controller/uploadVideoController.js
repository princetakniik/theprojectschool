const { QueryTypes } = require("sequelize");
const db = require("../Config/dbConnection");
const { uploadvideo } = require("../Config/dbConnection");

const insertVideo = async (req, res) => {
  const { ...rest } = req.body;
  console.log("rest", rest);
  try {
    const videoUpload = await uploadvideo.create({
      videosPaths: rest.videosPaths,
      videoName: rest.videoName,
      courseId: rest.courseId,
      subCourseId: rest.subCourseId,
      instituteId: rest.instituteId,
      userId: rest.userId,
    });
    res
      .status(200)
      .json({ msg: `insert successfull data ..`, data: videoUpload });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `video not upload ...` });
  }
};

const getVideos = async (req, res) => {
  try {
    const getVideos = await db.sequelize.query(
      `select u.id ,u.videosPaths,u.videoName ,u.courseId ,u.subCourseId ,u.userId ,u.instituteId,
      s.subcourses ,c.course 
      from uploadvideos u 
      inner join subcourses s on s.subcourses_id =u.subCourseId 
      inner join courses c on c.course_id =u.courseId 
      where u.isDelete =false  `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: `get all videos successfully....`, data: getVideos });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `viseos not found `, err });
  }
};

const getVideoById = async (req, res) => {
  const { id } = req.query;
  try {
    const videoData = await db.sequelize.query(`
      select u.id ,u.videosPaths,u.videoName ,u.courseId ,u.subCourseId ,u.userId ,u.instituteId ,
      s.subcourses ,c.course 
      from uploadvideos u 
      inner join subcourses s on s.subcourses_id =u.subCourseId 
      inner join courses c on c.course_id =u.courseId  
      where u.id =${id} && u.isDelete =false 
`);
    res.status(200).json({ msg: `get video by id ....`, data: videoData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `video not found by id...`, err });
  }
};

const getAllVideoModuleWise = async (req, res) => {
  try {
    const videoData = await db.sequelize.query(
      `
      select u.id ,u.videosPaths,u.videoName ,u.courseId ,u.userId ,u.instituteId,c.course 
      from uploadvideos u 
      inner join courses c on c.course_id =u.courseId 
      where u.isDelete =false && c.isDelete =false 
`,
      {
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).json({ msg: `module wise videos are...`, data: videoData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `video not found by module wise...`, err });
  }
};

const getVideoModuleWise = async (req, res) => {
  const { courseId } = req.query;
  try {
    const videoData = await db.sequelize.query(
      `
      select u.id ,u.videosPaths,u.videoName ,u.courseId ,u.userId ,u.instituteId,c.course 
      from uploadvideos u 
      inner join courses c on c.course_id =u.courseId 
      where u.isDelete =false && c.isDelete =false && c.course_id =${courseId}
`,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: `video module wise data are...`, data: videoData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `module wise data not found by id...`, err });
  }
};

const updateVideo = async (req, res) => {
  const { id } = req.query;
  const { ...rest } = req.body;
  try {
    const updateData = await uploadvideo.update(rest, {
      where: {
        id: id,
      },
    });
    res.status(200).json({ msg: `video update by id...`, data: updateData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `video not update by id ...`, err });
  }
};

const deleteVideo = async (req, res) => {
  const { id } = req.query;
  try {
    const data = {
      isDelete: true,
    };
    const videoDelete = await uploadvideo.update(data, {
      where: {
        id: id,
      },
    });
    res.status(200).json({ msg: `video delete by id...`, data: videoDelete });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `video not delete by id ...`, err });
  }
};

module.exports = {
  insertVideo,
  getVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
  getAllVideoModuleWise,
  getVideoModuleWise
};
