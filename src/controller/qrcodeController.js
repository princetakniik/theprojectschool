const {
  register,
  studentdetails,
  institute,
} = require("../Config/dbConnection");
const { generateQRCode } = require("../middleware/QrCodeGenerate");

const generateQR = async (req, res) => {
  try {
    let result = [];
    let userDetails = await studentdetails.findOne({
      where: {
        user_id: req.query.user_id,
        isDelete:false
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

const instituteQr = async (req, res) => {
  try {
    const instituteDetails = await institute.findOne({
      where: {
        institute_id: req.query.institute_id,
        isDelete:false
      },
    });
    if (instituteDetails !== null) {
      Anusaran = {
        application:"Anusaran",
        institutionId: instituteDetails.institute_id,
      };
      let strData = JSON.stringify(Anusaran);
       console.log("user", strData);
      const qrImage = await generateQRCode(strData);
      console.log(qrImage);
      res.status(200).json({ msg: `QR code get successfull`, data: qrImage });
    } else {
      return res.status(400).json({ message: "Data not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `institute QR is not created`, err });
  }
};

module.exports = {
  generateQR,
  instituteQr,
};
