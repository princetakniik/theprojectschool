const { QueryTypes } = require("sequelize");
const db = require("../Config/dbConnection");
const { uploaddata } = require("../Config/dbConnection");

const getAllUploadData = async (req, res) => {
  try {
    const allData = await db.sequelize.query(`
    select * from uploaddata u  
    `, {
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).json({ msg: `all uploaded data are....`, data: allData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `all upload data are` });
  }
};

const getUploadDataById = async (req, res) => {
  const { id } = req.query;
  try {
    const allData = await uploaddata.findOne({
      where: {
        id: id,
      },
    });
    res.status(200).json({ msg: ` uploaded data are....`, data: allData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `all upload data are` });
  }
};


module.exports = {
  getAllUploadData,
  getUploadDataById,
};
