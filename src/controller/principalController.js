const { studentdetails, register } = require("../Config/dbConnection");
const { QueryTypes } = require("sequelize");
const db = require("../Config/dbConnection");

const insertPrincipal = async (req, res) => {
  const { ...rest } = req.body;
  try {
    const registerData = await register.findOne({
      where: {
        email: rest.email,
      },
    });

    const details = await studentdetails.findOne({
      where: { email: rest.email }
    });
   
    if (registerData === null) {
      res.status(401).json({ msg: `please register` });
    } else if (details === null ) {
      const insertData = await studentdetails.create({
        user_id: registerData.user_id,
        email: registerData.email,
        name: registerData.fname + " " + registerData.lname,
        profilePhoto: rest.profilePhoto,
        address: rest.address,
        city: rest.city,
        Additional: rest.Additional,
        zipCode: rest.zipCode,
        state: rest.state,
        country: rest.country,
        phone: registerData.phone,
        institutionId: rest.institutionId,
        role: "Principal",
        gender: rest.gender,
        dob: rest.dob,
        eContactName: rest.eContactName,
        eContactNum: rest.eContactNum,
        eContactRela: rest.eContactRela,
      });
      console.log("insertData", insertData);
      res
        .status(200)
        .json({ msg: `principal data insert successfully`, data: insertData });
    } else {
      res.status(401).json({ msg: `allready fill this mail` });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `principal data not insert` });
  }
};

const principalAllData = async (req, res) => {
  try {
    const getdata = await db.sequelize.query(
        `select s.user_id,s.email ,s.name ,s.profilePhoto ,s.address ,s.city ,s.Additional ,s.zipCode ,s.state ,s.country ,
        s.phone ,s.institutionId ,s.gender,i.InstituteName ,i.InstituteLogo 
        from studentdetails s 
        inner join registers r on r.email =s.email 
        inner join institutes i on i.institute_id =s.institutionId 
        where s.role='Principal' && s.isDelete =false  `,
        {
          type: QueryTypes.SELECT,
        }
      );
      res
        .status(200)
        .json({ msg: "get principal data successfully all ", data: getdata });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: `principal data not found` });
  }
};

const principalDataById = async(req,res)=>{
    const {user_id}=req.query
    try{
        const getdata = await db.sequelize.query(
            `select s.user_id,s.email ,s.name ,s.profilePhoto ,s.address ,s.city ,s.Additional ,s.zipCode ,s.state ,s.country ,
            s.phone ,s.institutionId ,s.gender,i.InstituteName ,i.InstituteLogo 
            from studentdetails s 
            inner join registers r on r.email =s.email 
            inner join institutes i on i.institute_id =s.institutionId 
            where s.role='Principal' && s.isDelete =false && s.user_id =${user_id} `,
            {
              type: QueryTypes.SELECT,
            }
          );
          res
            .status(200)
            .json({ msg: `get principal data successfully by id ${user_id} `, data: getdata });
    }catch(err){
        console.log(err);
        res.status(500).json({msg:`principal data not found by id `})
    }
}

const updatePrincipal = async(req,res)=>{
    const {user_id}=req.query;
    const {...rest}=req.body;
    try{
const updateData = await studentdetails.update(rest, {
    where: {
      isDelete: false,
      user_id: user_id,
      role:"Principal"
    },
  });
  res.status(200).json({msg:`principal data update by id ${user_id}`,data:updateData})
    }catch(err){
        console.log(err);
        res.status(500).json({msg:`principal data not update ${user_id}`,})
    }
}

const deletePrincipal = async(req,res)=>{
    const {user_id}=req.query
    try{
        const data = {
            isDelete: true,
          };
          const deleteData = await studentdetails.update(data, {
            where: {
              isDelete: false,
              user_id: user_id,
              role:"Principal"
            },
          });
          res.status(200).json({msg:`principle data delete on ${user_id}`,data:deleteData})
    }catch(err){
        console.log(err);
        res.status(500).json({msg:`principal data is not delete by id ${user_id}`,err})
    }
}

module.exports = {
  insertPrincipal,
  principalAllData,
  principalDataById,
  updatePrincipal,
  deletePrincipal
};
