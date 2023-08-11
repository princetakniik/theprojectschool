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
        //filePath: `${base_url}/profile/${file.originalname}`,
        fileData: file.buffer,
        fileName: file.originalname,
      };
    });

    try {
      const createdVideoData = await uploaddata.bulkCreate(fileDataList);
      console.log("Uploaded video data:", createdVideoData);

      res.json({
        message: "Files uploaded successfully",
        data: createdVideoData,
      });
    } catch (error) {
      console.error("Error uploading files:", error);
      res.status(500).json({ error: "Failed to upload files" });
    }
  });
//update Data 

  app.put("/updateData/:id", upload.single("file"), async (req, res) => {
    const id = req.params.id;
    const file = req.file;
    console.log(id);

    try {
      const updatedVideoData = await uploaddata.update(
        {
          fileData: file.buffer,
          fileName: file.originalname,
        },
        { where: { id } }
      );
      if (updatedVideoData[0] === 1) {
        console.log("Updated video data:", updatedVideoData);

        res.json({ message: "File updated successfully" });
      } else {
        res.status(404).json({ error: "Video data not found" });
      }
    } catch (error) {
      console.error("Error updating file:", error);
      res.status(500).json({ error: "Failed to update file" });
    }
  });
};
