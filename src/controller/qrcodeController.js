const { register } = require("../Config/dbConnection");
const { generateQRCode } = require("../middleware/QrCodeGenerate");

const generateQR = async (req, res) => {
  try {
    const data = await register.findOne({
      where: {
        user_id: req.query.user_id,
      },
    });
    if (data == null || data == undefined) {
      res.json({ msg: "no data found" });
    }else{
      let userData={
        user_id:data.user_id,
        email:data.email,
        fname: data.fname,
        lname:data.lname,
        username:data.username,
        phone:data.phone
      }
      console.log('userData',userData);
    let strData = JSON.stringify(userData);
    console.log("user", strData);
    const qrImage = await generateQRCode(strData);
    // const qrImage = await QRCode.toString(strData);
    console.log(qrImage);
    res.status(200).json({ msg: `QR code get successfull`, data: qrImage });
    }
  } catch (err) {
    console.error("err", err);
  }
};

module.exports = {
  generateQR,
};
