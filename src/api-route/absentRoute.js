const { absent } = require("../controller/absentController")

module.exports =(app)=>{
    app.post('/absent',(req,res)=>absent(req,res))
}