const nodemailer = require("nodemailer");
const { emailveryfi } = require("../Config/dbConnection");
const { generateOtp } = require("./generateOtp");
const {
  assignmentNotsubmitte,
} = require("../controller/userAssignmentController");

const nodeCron = require("node-cron");

const job = nodeCron.schedule("05 45 23 * * *", function () {
  sendMail();
});

const sendMail = async (req, res) => {
  try {
    const UserData = await assignmentNotsubmitte();

    let data = [];
    for (let user of UserData) {
      var userData = {
        email: user.email,
        assignmentsName: user.assignmentsName,
        name: user.name,
      };
      console.log("userData", userData.email);

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
        to: [userData.email],
        subject: "Email School for ... ",
        Text: "First Email send from nodejs nodemailer own made Package ( for auto emails of banking)",
        html: `<p> ${userData.name} please submmit your assignment is ${userData.assignmentsName}`,
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log(err);
          return false;
        } else {
          res.json({ msg: "Email sent successfully" });
          res.send(transporter);
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  sendMail,
};
