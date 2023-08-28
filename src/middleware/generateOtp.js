const otpGenerator = require("otp-generator");

const generateOtp = async (req, res) => {
  const OTP = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  console.log(OTP);
  // res.send({ msg: "send otp succesfully", data: OTP });
  return OTP;
};

module.exports = {
  generateOtp,
};
