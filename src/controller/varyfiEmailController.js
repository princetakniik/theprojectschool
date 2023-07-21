const { emailveryfi } = require("../Config/dbConnection");

const VeryfiEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const veryfi = await emailveryfi.findOne({
      where: {
        email,
      },
    });
    if (otp === veryfi.otp) {
      console.log("email veryfi...");
      res.send({ msg: "email is veryfied ...." });
    } else {
      res.send({ msg: "mail is not veryfied..." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "email not veryfied ...", err });
  }
};

module.exports = {
  VeryfiEmail,
};
