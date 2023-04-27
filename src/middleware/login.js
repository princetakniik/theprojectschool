const { register, studentdetails } = require("../Config/dbConnection");
const Config = require("../Config/config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//    Login User
const LoginUser = async (req, res) => {
  const { ...rest } = req.body;
  console.log(" ownerRegister controller ", rest);
  try {
    if (!rest.email) {
      res.status(400).json({ msg: "Please provide email" });
    }
    //checking if user exist in DB
    const User = await register.findOne({
      where: { email: rest.email },
    });

    const userDetails = await studentdetails.findOne({
      where: { email: rest.email },
    });

    if (!User) {
      res.status(200).json({ msg: "User is not Registered" });
    }
    bcrypt.compare(rest.password, User.password, async (err, result) => {
      if (result) {
        res.status(200).json({ msg: "It matches!" });
        const data = {
          email: User.email,
          password: User.password,
          fname: User.fname,
          lname: User.lname,
          phone: User.phone,
        };
        console.log("data", data);
        const token = jwt.sign(data, Config.JWT_SECRET);
        if(!token){
          res.status(400).json({msg:'token not found'})
        }
        console.log("token", token);
        res.status(200).json({msg:'user token',token})

        const user = await studentdetails.upsert(
          {
            email: User.email,
            token: token,
          },
          { email: User.email }
        );

        // res
        //   .status(200)
        //   .json({ msg: `${userDetails.role} has login `, data: token });
      } else {
        // console.log("Invalid password!");
        res.status(400).send({ msg: "Invalid password!" });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Incorrect email or password" });
  }
};

const Verify = async (req, res, next) => {
  const authHeader = req.body.token;
  //console.log("authHeader", authHeader);
  if (!authHeader) {
    return res.json({ message: "please provide jwt token" });
  }
  const token = authHeader.split(" ")[0];
  //console.log("token", token);
  try {
    let data = [];
    const payload = jwt.verify(token, Config.JWT_SECRET);
    // console.log('email',payload.email);
    let userDetails = await studentdetails.findOne({
      where: {
        email: payload.email,
      },
    });
    //console.log("userDetail", userDetails);

    const userRegister = await register.findOne({
      where: {
        email: payload.email,
      },
    });
    //console.log('userReg',userRegister);

    if (userDetails != null || userDetails != undefined) {
      console.log("userDetails", userDetails.name);
      user = {
        user_id: userDetails.user_id,
        name: userDetails.name,
        email: userDetails.email,
        phone: userDetails.phone,
        role: userDetails.role,
        teacherId: userDetails.teacherId,
        classteacher: userDetails.classteacher,
        section: userDetails.section,
        class: userDetails.class,
        courseenrolled: userDetails.courseenrolled,
        institutionname: userDetails.institutionname,
      };
      data.push({ msg: "user details", user });
    } else if (userRegister !== null || userRegister !== undefined) {
      // console.log('userRegister',userRegister);
      user = {
        user_id: userRegister.user_id,
        email: userRegister.email,
        fname: userRegister.fname,
        lname: userRegister.lname,
        phone: userRegister.phone,
      };
      data.push({ msg: "user is register but not fill details", user });
    } else {
      return res.json({ message: "Authentication invalid ! Please register" });
    }
    res.status(200).json(data);
  } catch (error) {
    // console.log("invalid signature");
    return res.json({ message: "Authentication invalid" });
  }
};

module.exports = {
  LoginUser,
  Verify,
};
