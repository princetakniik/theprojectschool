const { register } = require("../Config/dbConnection");
const Config = require("../Config/config");
const bcrypt = require("bcrypt");
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
    console.log("pass", User.password);
    //Throwing an error
    if (!User) {
      //  console.log("User is not registered");
      res.send({ msg: "User is not Registered" });
    }
    bcrypt.compare(rest.password, User.password, async (err, result)=> {
      if (result) {
        console.log("It matches!");
        const data = {
          email: User.email,
          password: User.password,
          fname: User.fname,
          lname: User.lname,
          phone: User.phone,
        };
        const token = jwt.sign(data, Config.JWT_SECRET);
        console.log(`${User.role} has login`);
        const user = await register.upsert(
          {
            email: User.email,
            token: token,
          },
          { email: User.email }
        );
        res.send({ data: token });
      } else {
        console.log("Invalid password!");
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Incorrect email or password" });
  }
};

const verify = async (req, res, next) => {
  const authHeader = req.body.token;
  console.log("authHeader", authHeader);
  if (!authHeader ) {
    return res.json({ message: 'please provide jwt token' });
  }
  const token = authHeader.split(" ")[0];
  console.log("token", token);
  try {
    const payload = jwt.verify(token, Config.JWT_SECRET);
    console.log('email',payload.email);
    let validateUser = await register.findOne({ email: payload.email });
    if (validateUser) {
      req.user = {
        email: validateUser.email,
        fname: validateUser.fname,
        lname: validateUser.lname,
        phone: validateUser.phone
      };
      console.log(req.user);
      res.send ({msg:'jwt veryfi successfully',data:req.user})
    } else {
      return res.json({ message: "Authentication invalid ! Please register" });
    }
  } catch (error) {
    console.log("invalid signature");
    return res.json({ message: "Authentication invalid" });
  }
};

module.exports = {
  LoginUser,
  verify,
};
