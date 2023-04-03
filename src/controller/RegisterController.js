const { register } = require("../Config/dbConnection");
const Config = require("../Config/config");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  console.log("api data user by client ...", req.body);
  const { ...rest } = req.body;
  try {
    if (!rest.email) {
      console.log("Please provide all values");
      res.send({ msg: "Please provide all values" });
    }

    //checking if user exist
    const userAlreadyExist = await register.findOne({
      where: {
        email: rest.email,
      },
    });
    if (userAlreadyExist) {
      res.send({ msg: "User already exist" });
    }
    //encrypting the password
    const round = parseInt(Config.saltRound);
    const salt = bcrypt.genSaltSync(round);
    const hash = bcrypt.hashSync(rest.password, salt);

    const insertData = await register.create({
      email: rest.email,
      otp: rest.otp,
      password: hash,
      fname: rest.fname,
      lname: rest.lname,
      username: rest.username,
      phone: rest.phone,
      institutionname: rest.institutionname,
      courseenrolled: rest.courseenrolled,
    });
    res.status(200).json({ msg: "Insert data by client", data: insertData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Data not insert by client", err });
  }
};

const getUser = async (req, res) => {
  try {
    const getData = await register.findAll({
      where: {
        isDelete: "false",
      },
    });
    res.status(200).json({ msg: "data get user ", data: getData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "data not get user ..", err });
  }
};

const getByIdUserDetail = async (req, res) => {
  const { ...rest } = req.body;
  try {
    const getByIdData = await register.findOne({
      where: {
        email: rest.email,
        isDelete: "false",
      },
    });
    res.status(200).json({
      msg: "data get by id user created by client..",
      data: getByIdData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "data not get user ..", err });
  }
};

const updateUserDetails = async (req, res) => {
  console.log("api data update ....", req.body);
  const { ...rest } = req.body;

  const round = parseInt(Config.saltRound);
  const salt = bcrypt.genSaltSync(round);
  const hash = bcrypt.hashSync(rest.password, salt);

  const data = {
    // email:rest.email,
    otp: rest.otp,
    password: hash,
    fname: rest.fname,
    lname: rest.lname,
    username: rest.username,
    phone: rest.phone,
    institutionname: rest.institutionname,
    courseenrolled: rest.courseenrolled,
  };
  try {
    const updateData = await register.update(data, {
      where: {
        email: rest.email,
      },
    });
    res
      .status(200)
      .json({
        msg: "data update by id user created by client..",
        data: updateData,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "data not get user ..", err });
  }
};

const deleteUserDetails = async (req, res) => {
  const { email } = req.body;
  const data = { isDelete: "true" };
  console.log("email...", email);
  try {
    const deleteData = await register.update(data, {
      where: {
        email,
      },
    });
    res.status(200).json({
      msg: "data delete by id user created by client..",
      data: deleteData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "data not get user ..", err });
  }
};

module.exports = {
  registerUser,
  getUser,
  getByIdUserDetail,
  updateUserDetails,
  deleteUserDetails,
};
