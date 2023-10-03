// const multer = require("multer");
// const Config = require("../Config/config");
// const { uploaddata } = require("../Config/dbConnection");

// module.exports = (app) => {
//   const storage = multer.memoryStorage();
//   const upload = multer({ storage });

//   app.post("/uploadData", upload.array("file", 4), async (req, res) => {
//     let base_url = Config.basePort;

//     const fileDataList = req.files.map((file) => {
//       return {
//         //filePath: `${base_url}/profile/${file.originalname}`,
//         fileData: file.buffer,
//         fileName: file.originalname,
//       };
//     });

//     try {
//       const createdVideoData = await uploaddata.bulkCreate(fileDataList);
//       console.log("Uploaded video data:", createdVideoData);

//       res.json({
//         message: "Files uploaded successfully",
//         data: createdVideoData,
//       });
//     } catch (error) {
//       console.error("Error uploading files:", error);
//       res.status(500).json({ error: "Failed to upload files" });
//     }
//   });
//   //update Data

//   app.put("/updateData/:id", upload.single("file"), async (req, res) => {
//     const id = req.params.id;
//     const file = req.file;
//     console.log(id);

//     try {
//       const updatedVideoData = await uploaddata.update(
//         {
//           fileData: file.buffer,
//           fileName: file.originalname,
//         },
//         { where: { id } }
//       );
//       if (updatedVideoData[0] === 1) {
//         console.log("Updated video data:", updatedVideoData);

//         res.json({ message: "File updated successfully" });
//       } else {
//         res.status(404).json({ error: "Video data not found" });
//       }
//     } catch (error) {
//       console.error("Error updating file:", error);
//       res.status(500).json({ error: "Failed to update file" });
//     }
//   });
// };


const fluent_ffmpeg = require('fluent-ffmpeg');
const ffmpeg = require('@ffmpeg-installer/ffmpeg'); // Install using npm i @ffmpeg-installer/ffmpeg
const thumbsupply = require('thumbsupply');
const multer = require('multer');
const path = require('path');
const Config = require('../Config/config');

// Set the ffmpeg path for fluent-ffmpeg
fluent_ffmpeg.setFfmpegPath('/path/to/Downloads/ffprobe/executable');

module.exports = (app) => {
  let filestorageEngine = multer.diskStorage({
    destination: 'upload',
    filename: (req, file, cb) => {
      cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    },
  });
  const upload = multer({ storage: filestorageEngine });

  app.post('/uploades', upload.array('file', 4), async (req, res) => {
    let base_url = Config.basePort;
    let doc_url = req.files
      ? req.files.map((i) => `${base_url}/profiles/${i.filename}`)
      : [];

    try {
      // Check if the uploaded file is a video
      if (req.files[0].mimetype === 'video/mp4') {
        thumbsupply.generateThumbnail(req.files[0].path, {
          size: thumbsupply.ThumbSize.LARGE,
          forceCreate: true,
          cacheDir: './thumb',
          mimetype: 'video/mp4',
        }).then((thumb) => {
          console.log(thumb);
          // You can do something with the generated thumbnail, if needed
        });
      }
    } catch (error) {
      console.error('Error generating thumbnail:', error);
    }

    return res.json({
      status: 'success',
      message: 'Data uploaded successfully',
      url: doc_url,
    });
  });
};
