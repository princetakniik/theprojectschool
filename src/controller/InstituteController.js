const { studentdetails, institute } = require("../Config/dbConnection");

const insertInstitute = async (req, res) => {
  console.log("data", req.body);
  try {
    const instituteName = await institute.findOne({
      where: {
        InstituteName: req.body.InstituteName,
        isDelete: false,
      },
    });
    if (instituteName != null) {
      res.status(400).json({ msg: `allready persent in this institute name` });
    } else {
      const insert = await institute.create(req.body);
      res.status(200).json({ msg: `resgister Institute `, data: insert });
    }
  } catch (err) {
    res.status(500).json({ msg: `data does not insert` });
  }
};

const getAllInstitute = async (req, res) => {
  try {
    const getInstitute = await institute.findAll({
      where: {
        isDelete: false,
      },
    });
    res
      .status(200)
      .json({ msg: "get all Institute data successfully", data: getInstitute });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "details not found", err });
  }
};

const getInstituteById = async (req, res) => {
  try {
    const getData = await institute.findOne({
      where: {
        isDelete: false,
        institute_id: req.query.institute_id,
      },
    });
    res.status(200).json({
      msg: `get institute by id ${req.query.institute_id}`,
      data: getData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `get institute by id `, err });
  }
};

const updateInstitute = async (req, res) => {
  try {
    const update = await institute.update(req.body, {
      where: {
        institute_id: req.query.institute_id,
        isDelete: false,
      },
    });
    res.status(200).json({
      msg: `update institute successfully ${req.query.institute_id}`,
      data: update,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `update not data`, err });
  }
};

const deleteInstitute = async (req, res) => {
  const data = {
    isDelete: true,
  };
  try {
    const updateData = await institute.update(data, {
      where: {
        institute_id: req.query.institute_id,
        isDelete: false,
      },
    });
    res
      .status(200)
      .json({ msg: `institute delete successfully`, data: updateData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `institute not delete `, err });
  }
};
module.exports = {
  insertInstitute,
  getAllInstitute,
  getInstituteById,
  updateInstitute,
  deleteInstitute,
};
