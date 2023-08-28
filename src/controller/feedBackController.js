const { feedBack } = require("../Config/dbConnection");
const { QueryTypes } = require("sequelize");
const db = require("../Config/dbConnection");

const insertFeedback = async (req, res) => {
  console.log("api data..", req.body);
  try {
    const insertData = await feedBack.create(req.body);
    res.status(200).json({ msg: `feedback data insert...`, data: insertData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `feedback not insert` });
  }
};

const getFeedback = async (req, res) => {
  const { instituteId } = req.query;
  try {
    const getdata = await db.sequelize.query(
      `select f.id ,f.email,f.name,f.image,f.feedback 
       from feedBacks f  
       where f.institutionId =${instituteId} && isDelete =false 
       order by id desc `,
      {
        type: QueryTypes.SELECT,
      }
    );

    res.status(200).json({ msg: `All feedback data are...`, data: getdata });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `feedback data not found` });
  }
};

const getFeedbackById = async (req, res) => {
  const { id } = req.query;
  try {
    const getdata = await db.sequelize.query(
      `select f.id ,f.email,f.name,f.image,f.feedback 
    from feedBacks f  
    where f.id =${id} && isDelete =false 
    order by id desc `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).json({ msg: `feedback data by id...`, data: getdata });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `feedback data not found` });
  }
};

const getFeedbackByUserId = async (req, res) => {
  const { email } = req.body;
  console.log("data..", email);
  try {
    const getdata = await db.sequelize.query(
      `select f.id ,f.email,f.name,f.image,f.feedback 
    from feedBacks f  
    where f.email='${email}' && isDelete =false 
    order by id desc `,
      {
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).json({ msg: `feedback data by user...`, data: getdata });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `feedback data not found` });
  }
};

module.exports = {
  insertFeedback,
  getFeedback,
  getFeedbackById,
  getFeedbackByUserId,
};
