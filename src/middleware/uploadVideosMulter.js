const multer = require("multer");
const Config = require("../Config/config");
const { uploaddata } = require("../Config/dbConnection");

module.exports = (app) => {
  const storage = multer.memoryStorage();
  const upload = multer({ storage });

  app.post("/uploadData", upload.array("file", 4), async (req, res) => {
    let base_url = Config.basePort;

    const fileDataList = req.files.map((file) => {
      return {
        filePath: `${base_url}/profile/${file.originalname}`,
        fileData: file.buffer,
        fileName: file.originalname,
      };
    });

    try {
      const createdVideoData = await uploaddata.bulkCreate(fileDataList);
      console.log("Uploaded video data:", createdVideoData);

      res.json({ message: "Files uploaded successfully",data:createdVideoData });
    } catch (error) {
      console.error("Error uploading files:", error);
      res.status(500).json({ error: "Failed to upload files" });
    }
  });
};


