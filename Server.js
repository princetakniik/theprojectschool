const express = require("express");
const router = express.Router();
const path = require("path");
const ejs = require("ejs");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const http = require("http");
const server = http.createServer(app);
const Config = require("./src/Config/config");
const { Server } = require("socket.io");
const session = require("express-session");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);
router.use((req, res, next) => {
  console.log("Time:", Date.now());
  next();
});
app.use("/", router);
const port = Config.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Anusaran");
});

app.use("/profile", express.static("upload"));
//app.use("/qrcode", express.static("upload"));
require("./src/middleware/fileUpload")(app);
require('./src/middleware/uploadVideosMulter')(app)
app.use("/profile", express.static("videos"));
require("./src/middleware/uploadVideo")(app);
require("./Router")(app);

io.on("connection", (socket) => {
  console.log("New user connected");
  //emit message from server to user
  socket.emit("newMessage", {
    from: "jen@mds",
    text: "hepppp",
    createdAt: 123,
  });

  // listen for message from user
  socket.on("createMessage", (newMessage) => {
    console.log("newMessage", newMessage);
  });
  socket.on("disconnect", () => {
    console.log("disconnected from user");
  });
});

server.listen(port, () => {
  console.log(`server is connected ${port}`);
});
