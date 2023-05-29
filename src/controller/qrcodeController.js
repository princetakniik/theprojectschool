const {
  register,
  studentdetails,
  institute,
  subcourses,
} = require("../Config/dbConnection");
const { QueryTypes } = require("sequelize");
const db = require("../Config/dbConnection");
const nodeCron = require("node-cron");
const moment = require("moment");
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

const cronJob = nodeCron.schedule("05 05 00 * * *", function () {
  instituteQr();
});

const instituteQr = async (req, res) => {
  try {
    const instituteDetails = await db.sequelize.query(
      ` select s.subcourses_id,i.institute_id,current_date() as date  from subcourses s 
      inner join institutes i on i.institute_id =s.InstituteId 
      where s.isDelete =false && i.isDelete=false && "01:02:20" between s.startTime and s.endTime `,
      {
        type: QueryTypes.SELECT,
      }
    );

    let resultData = [];
    for (let i = 0; i < instituteDetails.length; i++) {
      var Anusaran = {
        application: "Anusaran",
        institutionId: instituteDetails[i].institute_id,
        subCoursesId: instituteDetails[i].subcourses_id,
        date: instituteDetails[i].date,
      };
      let strData = JSON.stringify(Anusaran);

      console.log("user", strData);
      const qrImage = await generateQRCode(strData);
      resultData.push(qrImage);
    }

    console.log(resultData);

    req.session.data =  resultData;

   return res.status(200).json({ msg: `QR code get successfull`, data: resultData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `institute QR is not created`, err });
  }
};

module.exports = {
  generateQR,
  instituteQr,
};
