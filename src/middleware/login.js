const { register } = require("../Config/dbConnection");
const Config = require("../Config/config");
const bcrypt = require ('bcrypt');
const jwt = require("jsonwebtoken");

//    Login User
const LoginUser = async (req, res) => {
  const { ...rest } = req.body;
  console.log(" ownerRegister controller ", rest);
  try {
    if (!rest.email) {
      res.send({ msg: "Please provide email" });
    }
    //checking if user exist in DB
    const User = await register.findOne({
      where: { email: rest.email },
    });
    console.log("user", User);
    console.log('pass',User.password);
    //Throwing an error
    if (!User) {
      //  console.log("User is not registered");
      res.send({ msg: "User is not Registered" });
    }
    bcrypt.compare(rest.password, User.password, function(err, result) {
        if (result) {
          console.log("It matches!")
          const data = {
            email: User.email,
            password: User.password,
            fname: User.fname,
            lname: User.lname,
            phone: User.phone,
          };
          const token = jwt.sign(data,Config.JWT_SECRET);
          console.log(`${User.role} has login`);
          res.send({ data: token });
        }
        else {
          console.log("Invalid password!");
        }
    })

  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Incorrect email or password" });
  }
};

module.exports = {
  LoginUser,
};
