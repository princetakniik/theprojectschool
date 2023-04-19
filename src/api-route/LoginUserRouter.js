const { generateOtp } = require("../middleware/generateOtp");
const { LoginUser, verify } = require("../middleware/login");
const { sendMail } = require("../middleware/nodemailer");

module.exports = (app) => {
  app.post("/LoginUser", (req, res) => LoginUser(req, res));
  app.post("/verify", (req, res) => verify(req, res));
  app.post("/sendMail", (req, res) => sendMail(req, res));
  app.get("/generateOtp", (req, res) => generateOtp(req, res));
};
