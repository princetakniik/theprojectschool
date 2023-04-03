const express=require('express');
const router = express.Router();
const path = require('path');
const ejs=require('ejs')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const bodyParser = require('body-parser');
const app=express();
const http = require('http');
const server = http.createServer(app);
const Config =require('./src/Config/config')
const { Server } = require("socket.io");
const connection=require('./src/Config/dbConnection')
const io = new Server(server,{
  cors:{
    origin:"*",
    methods:["GET","POST","PUT","DELETE"]
  }
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser())
router.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
  })
  app.use('/', router)
const port =Config.PORT||5000;
app.get('/',(req,res)=>{
  res.send('Anusaran')
})
//require('./Router')(app)

io.on('connection', (socket)=>{
  console.log('New user connected');
   //emit message from server to user
   socket.emit('newMessage', {
     from:'jen@mds',
     text:'hepppp',
     createdAt:123
   });
 
   // listen for message from user
  socket.on('createMessage', (newMessage)=>{
    console.log('newMessage', newMessage);
  });
  socket.on('disconnect', ()=>{
    console.log('disconnected from user');
  });
});

server.listen(port,()=>{
    console.log(`server is connected ${port}`);
})