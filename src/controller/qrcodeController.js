const { register, studentdetails } = require("../Config/dbConnection");
const { generateQRCode } = require("../middleware/QrCodeGenerate");

const generateQR = async (req, res) => {
  try {
      let result = [];
      let userDetails = await studentdetails.findOne({
        where: {
          user_id:req.query.user_id
        },
      });
  // console.log("userDetail", userDetails);
  
      if (userDetails !== null || userDetails !== undefined) {
       // console.log("userDetails", userDetails.name);
        user = {
          user_id: userDetails.user_id,
          section: userDetails.section,
          class: userDetails.class,
          courseenrolled: userDetails.courseenrolled,
          institutionname: userDetails.institutionname,
        };
        let strData = JSON.stringify(user);
        console.log("user", strData);
        const qrImage = await generateQRCode(strData);
        console.log(qrImage);
        res.status(200).json({ msg: `QR code get successfull`, data: qrImage });
      } else {
        return res.status(400).json({ message:  "Data not found" });
      }
     // console.log('userData',result);
 

  } catch (err) {
    console.error("err", err);
  }
};

module.exports = {
  generateQR,
};
