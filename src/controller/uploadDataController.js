const { QueryTypes } = require("sequelize");
const db = require("../Config/dbConnection");
const { uploaddata } = require("../Config/dbConnection");

const getAllUploadData = async (req, res) => {
  try {
    // const getdata = await db.sequelize.query(`select u.id ,u.fileName  from uploaddata u `,
    // {
    //   type: QueryTypes.SELECT,
    // }
    // );

    const getdata = await uploaddata.findAll({
      attributes: ["id", "fileName"],
    });
    res.status(200).json({ msg: `all uploaded data are....`, data: getdata });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `all upload data are` });
  }
};

const getUploadDataById = async (req, res) => {
  const { id } = req.query;
  try {
    const allData = await uploaddata.findOne({
      attributes: ["id", "fileName", "fileData"],
      where: { id: id },
    });
    res.status(200).json({ msg: ` uploaded data are....`, data: allData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `all upload data are` });
  }
};

const destroyUploadData = async (req, res) => {
  const { id } = req.query;
  console.log(id);
  try {
    const deletedBlobData = await uploaddata.destroy({
      where: { id: id },
    });

    if (deletedBlobData === 1) {
      res.json({ message: "BLOB data deleted successfully" });
    } else {
      res.status(404).json({ error: "BLOB data not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete BLOB data" });
  }
};

module.exports = {
  getAllUploadData,
  getUploadDataById,
  destroyUploadData,
};
