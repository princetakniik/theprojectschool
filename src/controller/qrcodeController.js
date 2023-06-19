const {
  register,
  studentdetails,
  institute,
  subcourses,
} = require("../Config/dbConnection");
const { QueryTypes } = require("sequelize");
const db = require("../Config/dbConnection");
const nodeCron = require("node-cron");
const jwt = require("jsonwebtoken");
const Config = require("../Config/config");
const moment = require("moment");
const QRCode = require("qrcode");
const job = nodeCron.schedule("05 55 23 * * *", function () {
  absent();
});
const { generateQRCode } = require("../middleware/QrCodeGenerate");
const upload = require("../middleware/uploadQr");

const generateQR = async (req, res) => {
  try {
    let result = [];
    let userDetails = await studentdetails.findOne({
      where: {
        user_id: req.query.user_id,
        isDelete: false,
      },
    });
    //  console.log("userDetail", userDetails);

    if (userDetails !== null && userDetails.subCoursesId !== null) {
      user = {
        user_id: userDetails.user_id,
        section: userDetails.section,
        class: userDetails.class,
        coursesId: userDetails.coursesId,
        institutionId: userDetails.institutionId,
        subCoursesId: userDetails.subCoursesId,
      };
      let strData = JSON.stringify(user);
      // console.log("user", strData);
      const qrImage = await generateQRCode(strData);
      console.log(qrImage);
      res.status(200).json({ msg: `QR code get successfull`, data: qrImage });
    } else if (userDetails !== null) {
      user = {
        user_id: userDetails.user_id,
        section: userDetails.section,
        class: userDetails.class,
        coursesId: userDetails.coursesId,
        institutionId: userDetails.institutionId,
      };
      let strData = JSON.stringify(user);
      //  console.log("user", strData);
      const qrImage = await generateQRCode(strData);
      console.log(qrImage);
      res.status(200).json({ msg: `QR code get successfull`, data: qrImage });
    } else {
      return res.status(400).json({ message: "Data not found" });
    }
  } catch (err) {
    console.error("err", err);
  }
};

const cronJob = nodeCron.schedule("09 09 00 * * *", function () {
  instituteQr();
});

const instituteQr = async (req, res) => {
  const { institute_id, subcourses_id } = req.query;
  try {
    const instituteDetails = await db.sequelize.query(
      `select s.subcourses_id ,s.InstituteId ,current_date() as date ,date_add(s.updatedAt ,interval 5 hour) as updatedAt,s.token 
      from subcourses s
      inner join institutes i on i.institute_id =s.InstituteId
      where i.isDelete =false && s.isDelete =false && s.InstituteId =${institute_id}
       && s.subcourses_id=${subcourses_id} `,
      {
        type: QueryTypes.SELECT,
      }
    );

    if (instituteDetails.length === 0) res.send("Empty Data!");

    for (let i = 0; i < instituteDetails.length; i++) {
      var anusaran = {
        application: "Anusaran",
        institutionId: instituteDetails[i].InstituteId,
        subCoursesId: instituteDetails[i].subcourses_id,
        date: instituteDetails[i].date,
        updatedAt:instituteDetails[i].updatedAt,
        token:instituteDetails[i].token
      };
 
      if (moment(anusaran.updatedAt).format("YYYY-MM-DD") == anusaran.date && anusaran.token !=null) {
        const token = anusaran.token;
        var Anusaran = {
          application: "Anusaran",
          institutionId: instituteDetails[i].InstituteId,
          subCoursesId: instituteDetails[i].subcourses_id,
          date: instituteDetails[i].date,
          token: token,
        };
        let strData = JSON.stringify(Anusaran);

        QRCode.toDataURL(strData, function (err, url) {
          if (err) console.log("err", err);
          res.json({ msg: `QR code get successfull`, data: url });
        });
      } else {
        let data={
          application: "Anusaran",
          institutionId: instituteDetails[i].InstituteId,
          subCoursesId: instituteDetails[i].subcourses_id,
          date: instituteDetails[i].date,
        }
        const token = jwt.sign(data, Config.JWT_SECRET);

        var Anusaran = {
          application: "Anusaran",
          institutionId: instituteDetails[i].InstituteId,
          subCoursesId: instituteDetails[i].subcourses_id,
          date: instituteDetails[i].date,
          token: token,
        };

        let strData = JSON.stringify(Anusaran);

        QRCode.toDataURL(strData, function (err, url) {
          if (err) console.log("err", err);
          res.json({ msg: `QR code get successfull`, data: url });
        });

        const Data = {
          token: token,
        };
        const updatetoken = await subcourses.update(Data, {
          where: {
            subcourses_id: subcourses_id,
            InstituteId: institute_id,
          },
        });
      }
    }

    // return res
    //   .status(200)
    //   .json({ msg: `QR code get successfull`, data: resultData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `institute QR is not created`, err });
  }
};

module.exports = {
  generateQR,
  instituteQr,
};
