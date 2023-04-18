const QRCode = require("qrcode");

const generateQRCode = async (strData) => {
  try {
    const qrImage = await QRCode.toString(strData);
    return qrImage;
  } catch (err) {
    console.error("err", err);
  }
};

module.exports ={
    generateQRCode
}
