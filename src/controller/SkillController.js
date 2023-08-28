const { skill } = require("../Config/dbConnection");

const insertSkill = async (req, res) => {
  const { ...rest } = req.body;
  try {
    const skillData = await skill.findOne({
      where: {
        skillName: rest.skillName,
        isDelete: false,
      },
    });
    if (skillData != null) {
      res.status(400).json({ msg: `allready persent  ${rest.skillName}` });
    } else {
      const insert = await skill.create(req.body);
      res
        .status(200)
        .json({ msg: "create skillData successfully", data: insert });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "skillData is not insert data", err });
  }
};

const getSkillData = async (req, res) => {
  try {
    const getData = await skill.findAll({
      where: {
        isDelete: false,
      },
    });
    res
      .status(200)
      .json({ msg: "get skillData successfully all ", data: getData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "data not found successfully", err });
  }
};

const getSkillById = async (req, res) => {
  try {
    const getData = await skill.findOne({
      where: {
        isDelete: false,
        id: req.query.id,
      },
    });
    res.status(200).json({
      msg: `get skillData By Id successfully ${req.query.id}`,
      data: getData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "data not found successfully By Id", err });
  }
};

const updateSkillById = async (req, res) => {
  const { ...rest } = req.body;
  console.log("rest", rest);
  try {
    const updateData = await skill.update(rest, {
      where: {
        isDelete: false,
        id: req.query.id,
      },
    });
    res.status(200).json({
      msg: `update skillData successfully ${req.query.id}`,
      data: updateData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "data not update successfully By Id", err });
  }
};

const deleteSkillById = async (req, res) => {
  const id = req.query.id;
  try {
    const data = {
      isDelete: true,
    };
    const deleteData = await skill.update(data, {
      where: {
        isDelete: false,
        id: id,
      },
    });
    res
      .status(200)
      .json({ msg: `delete skillData successfully ${id}`, data: deleteData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "data not delete successfully By Id", err });
  }
};

module.exports = {
  insertSkill,
  getSkillData,
  getSkillById,
  updateSkillById,
  deleteSkillById,
};
