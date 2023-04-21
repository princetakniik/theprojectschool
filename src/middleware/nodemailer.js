const nodemailer = require("nodemailer");
const { emailveryfi } = require("../Config/dbConnection");
const { generateOtp } = require("./generateOtp");

const sendMail = async (req, res) => {
    try {
      const { email } = req.body;
      const Otp = await generateOtp()
      console.log("otp", Otp, "email", email);

      const user = await emailveryfi.upsert(
        {
            email: email,
            otp: Otp
        },
        { email: email }
      )
      console.log('user',user);
    
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "prince@takniik.com", // generated ethereal user
          pass: "moizhjibtfvmwwcs", // generated ethereal password
        },
      });
  
      var mailOptions = {
        from: "prince@takniik.com",
        to: email,
        subject: "Email School for ... ",
        Text: "First Email send from nodejs nodemailer own made Package ( for auto emails of banking)",
        html: `<p>please veryfi your email ${Otp}`,
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log(err);
          return false;
        } else {
        res.json({msg:"Email sent successfully"});
          res.send(transporter);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  module.exports ={
    sendMail
  }