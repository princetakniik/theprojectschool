const { getAllInstitute, insertInstitute, getInstituteById, updateInstitute, deleteInstitute } = require("../controller/InstituteController")


module.exports =(app)=>{
    app.post('/insertInstitute',(req,res)=>insertInstitute(req,res))
    app.get('/getAllInstitute',(req,res)=>getAllInstitute(req,res))
    app.get('/getInstituteById',(req,res)=>getInstituteById(req,res))
    app.put('/updateInstitute',(req,res)=>updateInstitute(req,res))
    app.delete('/deleteInstitute',(req,res)=>deleteInstitute(req,res))
}