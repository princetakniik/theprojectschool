const AWS = require("aws-sdk");
const multer = require("multer");
const uuid = require("uuid");
const Config = require("../Config/config");
require("dotenv").config();

module.exports = (app) => {
  const s3bucket = new AWS.S3({
    accessKeyId: Config.AWS_ACCESS_KEY_ID,
    secretAccessKey: Config.AWS_SECRET_ACCESS_KEY,
    region: Config.S3_REGION,
  });

  const storage = multer.memoryStorage({
    // destination: function (req, file, callback) {
    //   callback(null, "");
    // },
  });

  const multipleUpload = multer({ storage: storage }).array("file");
  //const upload = multer({ storage: storage }).single("file");

  // ------------------------Upload File ----------------------------------

  app.post("/uploadFile", multipleUpload, function (req, res) {
    const file = req.files;

    s3bucket.createBucket(() => {
      var ResponseData = [];

      file !== undefined &&
        file.map((item) => {
          const params = {
            Bucket: Config.S3_BUCKET,
            Key: Date.now() + item.originalname,
            Body: item.buffer,
          };

          s3bucket.upload(params, function (err, data) {
            if (err) {
              return res.json({ error: true, Message: err });
            } else {
              ResponseData.push(data);
              if (ResponseData.length == file.length) {
                let url = ResponseData.map((i) => i.Location);
                return res.json({
                  status: "success",
                  message: "File Uploaded SuceesFully",
                  data: url,
                });
              }
            }
          });
        });
    });
  });
};
