const { register } = require("../Config/dbConnection");

const getAllTeacher = async (req,res) => {
    try{
const getTeacher = await register.findAll({
    where:{
        role:'Teacher',
        isDelete: false,
    }
})
res.status(200).json({msg:'get all teacher data successfully',data:getTeacher})
    }catch(err){
        console.log(err);
        res.status(500).json({msg:'details not found',err})
    }
}

module.exports ={
    getAllTeacher
}