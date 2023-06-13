const { register, studentdetails } = require("../Config/dbConnection");
const Config = require("../Config/config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { QueryTypes } = require("sequelize");
const db = require("../Config/dbConnection");

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

    //console.log('user',User);
    const userDetails = await studentdetails.findOne({
      where: { email: rest.email },
    });
    console.log("UserDetails", userDetails);
    if (!User) {
      //  console.log("User is not registered");
      res.status(400).send({ msg: "User is not Registered" });
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
        //        console.log(`${userDetails.role} has login`);
        const user = await register.upsert(
          {
            email: User.email,
            token: token,
          },
          { email: User.email }
        );
        res
          .status(200)
          .send({ msg: `${userDetails.role} has login`, data: token });
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
    console.log("userDetail", userDetails.role);

    const userRegister = await register.findOne({
      where: {
        email: payload.email,
      },
    });
    //console.log('userReg',userRegister);

    if (userDetails != null && userDetails.role === "Student") {
      console.log("Student", userDetails.name);
      const userDetail = await db.sequelize.query(
        ` select s.user_id ,s.email ,s.name ,s.profilePhoto ,s.phone ,s.institutionId,s.role, 
        s.class,s.section ,s.teacherId,i.InstituteName ,i.InstituteLogo
        from studentdetails s 
        inner join institutes i on i.institute_id =s.institutionId 
        where s.user_id =${userDetails.user_id}  && s.isDelete =false `,
        {
          //&& ad.date=${date}
          type: QueryTypes.SELECT,
        }
      );
      const course_enrolled = await db.sequelize.query(
        `select u.course_id,c.course ,JSON_ARRAYAGG( u2.subcourses_id) as subcourses_id,
        JSON_ARRAYAGG(s.subcourses) as subcourses 
        from usercourses u 
        inner join usersubcourses u2 on u2.course_id =u.course_id 
        inner join courses c on c.course_id =u.course_id
        inner join subcourses s on s.subcourses_id =u2.subcourses_id 
        where u.user_id =${userDetails.user_id} && u.isDelete =false  && s.isDelete =FALSE && c.isDelete=FALSE  
        group by u.course_id  `,
        {
          //&& ad.date=${date}
          type: QueryTypes.SELECT,
        }
      );
      data.push({
        msg: `user details ${userDetails.role}`,
        userDetail,
        course_enrolled,
      });
    } else if (userDetails != null && userDetails.role === "Teacher") {
      // console.log("Teacher", userDetails.name);
      const userDetail = await db.sequelize.query(
        `  select s.user_id ,s.email ,s.name ,s.profilePhoto ,s.phone ,s.institutionId,s.role, 
        s.coursesId, s.subCoursesId, s.class,s.section ,i.InstituteName ,i.InstituteLogo 
        from studentdetails s 
        inner join institutes i on i.institute_id =s.institutionId 
        where s.user_id =${userDetails.user_id} `,
        {
          //&& ad.date=${date}
          type: QueryTypes.SELECT,
        }
      );

      const course_enrolled = await db.sequelize.query(
        `select u.course_id,c.course ,JSON_ARRAYAGG( u2.subcourses_id) as subcourses_id,
        JSON_ARRAYAGG(s.subcourses) as subcourses 
        from usercourses u 
        inner join usersubcourses u2 on u2.course_id =u.course_id 
        inner join courses c on c.course_id =u.course_id
        inner join subcourses s on s.subcourses_id =u2.subcourses_id 
        where u.user_id =${userDetails.user_id} && u.isDelete =false && u2.isDelete =false 
        && c.isDelete =FALSE && s.isDelete =FALSE 
        group by u.course_id  `,
        {
          //&& ad.date=${date}
          type: QueryTypes.SELECT,
        }
      );

      data.push({
        msg: `user details ${userDetails.role}`,
        userDetail,
        course_enrolled,
      });
    } else if (userDetails != null && userDetails.role == "Principal") {
      const userDetail = await db.sequelize.query(
        ` select s.user_id,s.email ,s.name ,s.profilePhoto ,s.address ,s.city ,s.Additional ,
        s.zipCode ,s.state ,s.country ,s.role,
        s.phone ,s.institutionId ,s.gender,i.InstituteName ,i.InstituteLogo 
        from studentdetails s 
        inner join registers r on r.email =s.email 
        inner join institutes i on i.institute_id =s.institutionId 
        where s.role='Principal' && s.isDelete =false && s.user_id =${userDetails.user_id} `,
        {
          //&& ad.date=${date}
          type: QueryTypes.SELECT,
        }
      );

      const course_enrolled = await db.sequelize.query(
        `  select c.course_id ,c.course , JSON_ARRAYAGG(s2.subcourses_id ) as subcourses_id,JSON_ARRAYAGG(s2.subcourses) as subcourses
        from studentdetails s 
        inner join courses c on c.Institute =s.institutionId 
        inner join subcourses s2 on s2.InstituteId =s.institutionId && s2.courseId =c.course_id 
        where s.isDelete =false && c.isDelete =false && s2.isDelete =false && s.user_id =${userDetails.user_id}
          group by c.course_id   `,
        {
          //&& ad.date=${date}
          type: QueryTypes.SELECT,
        }
      );

      data.push({
        msg: `user details ${userDetails.role}`,
        userDetail,
        course_enrolled,
      });
    } else if (userDetails != null && userDetails.role === "Admin") {
      console.log("Admin", userDetails.name);
      const user = await db.sequelize.query(
        `select s.user_id ,s.email ,s.name ,s.profilePhoto ,s.role,s.phone 
        from studentdetails s
        where s.user_id =${userDetails.user_id}  `,
        {
          //&& ad.date=${date}
          type: QueryTypes.SELECT,
        }
      );
      data.push({ msg: `user details ${userDetails.role}`, user });
    } else if (userRegister !== null) {
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
