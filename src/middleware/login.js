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
    bcrypt.compare(rest.password, User.password, async (err, result) => {
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
    const payload = jwt.verify(token, Config.JWT_SECRET);
    // console.log('email',payload.email);

    const userDetails = await studentdetails.findOne({
      where: {
        email: payload.email,
      },
    });
    if (userDetails) {
      const getData =await db.sequelize.query(`select r.email,r.fname,r.lname,r.username,r.phone,
      s.institutionname,s.courseenrolled,s.class,s.section,s.classteacher,s.teacherId,s.role 
      from registers r 
      inner join studentdetails s on s.email =r.email 
      where s.email=${payload.email} && r.isDelete =false && s.isDelete=false `,
          {
              //&& ad.date=${date}
              type: QueryTypes.SELECT,
            }
          );
          res
          .status(200)
          .send({ msg: "user is register but not fill details", data: getData }); 
    } else {
      let RegisterUser = await register.findOne({
        where: {
          email: payload.email,
        },
      });
      console.log("data......", userDetails);
      if (RegisterUser) {
        user = {
          email: RegisterUser.email,
          fname: RegisterUser.fname,
          lname: RegisterUser.lname,
          phone: RegisterUser.phone,
          username: RegisterUser.username,
        };
        //console.log(user);
        res
          .status(200)
          .send({ msg: "user is register but not fill details", data: user });
      } else {
        return res.json({
          message: "Authentication invalid ! Please register",
        });
      }
    }
  } catch (error) {
    console.log("invalid signature");
    return res.json({ message: "Authentication invalid" });
  }
};

module.exports = {
  LoginUser,
  Verify,
};
