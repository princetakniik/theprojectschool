const { userskill, skill } = require("../Config/dbConnection");
const { QueryTypes } = require("sequelize");
const db = require("../Config/dbConnection");

const insertuserskill = async (req, res) => {
  const { ...rest } = req.body;
  try {
    const skillData = await skill.findOne({
      where: {
        id: rest.skill_id,
        isDelete: false,
      },
    });

    const users = await userskill.findOne({
      where: {
        skill_id: rest.skill_id,
        isDelete: false,
      },
    });
    if (skillData == null) {
      res.status(401).json({ msg: `this skill is not persent in masterSkill` });
    } else if (users !== null) {
      res.status(400).json({ msg: `already persent ` });
    } else {
      const insert = await userskill.create(req.body);
      res
        .status(200)
        .json({ msg: "create user skill successfully", data: insert });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "skill is not insert data", err });
  }
};

const getuserskill = async (req, res) => {
  try {
    const getdata = await db.sequelize.query(
      `select u.id ,u.user_id ,u.skill_id ,s.skillName  from userskills u 
      inner join skills s on s.id =u.skill_id 
      where u.isDelete =false `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res
      .status(200)
      .json({ msg: "get user skill successfully all ", data: getdata });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "data not found", err });
  }
};

const getuserskillById = async (req, res) => {
  const { user_id, Institute } = req.query;
  try {
    const getdata = await db.sequelize.query(
      `   select u.user_id ,JSON_ARRAYAGG(s.skillName) as skillName  from userskills u 
      inner join skills s on s.id =u.skill_id 
      where u.isDelete =false && u.user_id =${user_id}
      group by u.user_id  `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).json({
      msg: `get user skill By Id successfully ${user_id}`,
      data: getdata,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "data no found   By Id", err });
  }
};

const updateuserskillById = async (req, res) => {
  const { ...rest } = req.body;
  const id = req.query.id;
  try {
    const skillData = await skill.findOne({
      where: {
        id: rest.skill_id,
        isDelete: false,
      },
    });
    const users = await userskill.findOne({
      where: {
        skill_id: rest.skill_id,
        user_id: rest.user_id,
        isDelete: false,
      },
    });
    if (skillData == null) {
      res
        .status(401)
        .json({ msg: `skill data not persent in master skill table` });
    } else if (users != null) {
      res
        .status(401)
        .json({ msg: `this user skill allready persent in this table ` });
    } else {
      const updateData = await userskill.update(rest, {
        where: {
          isDelete: false,
          id: id,
        },
      });
      res.status(200).json({
        msg: `update user skill successfully ${id}`,
        data: updateData,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "data not update successfully By Id", err });
  }
};

const deleteuserskillById = async (req, res) => {
  const id = req.query.id;
  try {
    const data = {
      isDelete: true,
    };
    const updateData = await userskill.update(data, {
      where: {
        isDelete: false,
        id: id,
      },
    });
    res.status(200).json({
      msg: `update userSkill successfully ${id}`,
      data: updateData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "data not delete successfully By Id", err });
  }
};

module.exports = {
  insertuserskill,
  getuserskill,
  getuserskillById,
  updateuserskillById,
  deleteuserskillById,
};
