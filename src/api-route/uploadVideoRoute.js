const {
  getVideos,
  insertVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  getAllVideoModuleWise,
  getVideoModuleWise,
} = require("../controller/uploadVideoController");

module.exports = (app) => {
  app.post("/insertVideo", (req, res) => insertVideo(req, res));
  app.get("/getVideos", (req, res) => getVideos(req, res));
  app.get("/getVideoById", (req, res) => getVideoById(req, res));
  app.get("/getAllVideoModuleWise", (req, res) =>
    getAllVideoModuleWise(req, res)
  );
  app.get("/getVideoModuleWise", (req, res) => getVideoModuleWise(req, res));
  app.put("/updateVideo", (req, res) => updateVideo(req, res));
  app.delete("/deleteVideo", (req, res) => deleteVideo(req, res));
};
