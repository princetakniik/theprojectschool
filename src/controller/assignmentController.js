const { assignment } = require("../Config/dbConnection");

const inserAssignment =async(req,res)=>{
    const {...rest} =req.body
    try{
const assignmentData = await assignment.create({
    assignmentsName:rest,
      lastDate:rest,
      instituteId:rest,
      courseId:rest,
      subCourseId:rest,
      userId:rest
})
    }catch(err){
        console.log(err);
        res.status(500).json({msg:`assignment not created ....`,err})
    }
}