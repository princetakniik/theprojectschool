const { generateOtp } = require("../middleware/generateOtp");
const { LoginUser, Verify } = require("../middleware/login");
const { sendMail } = require("../middleware/nodemailer");

module.exports = (app) => {
  app.get("/LoginUser", (req, res) => LoginUser(req, res));
  app.post("/verify", (req, res) => Verify(req, res));
  app.post("/sendMail", (req, res) => sendMail(req, res));
  app.get("/generateOtp", (req, res) => generateOtp(req, res));
};
