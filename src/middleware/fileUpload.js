const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Config = require("../Config/config");

module.exports = (app) => {
  let filestorageEngine = multer.diskStorage({
    destination: "upload",

    filename: (req, file, cb) => {
      cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    },
  });
  const upload = multer({ storage: filestorageEngine });

  app.post("/uploads", upload.array("file", 4), async (req, res) => {
    let base_url = Config.basePort;
    //console.log('url',base_url);
    let doc_url = req.files
      ? req.files.map((i) => `${base_url}/profile/${i.filename}`)
      : [];
    // return doc_url;
    return res.json({
      status: "suceess",
      message: "data upload sucessfully",
      url: doc_url,
    });
  });
};
