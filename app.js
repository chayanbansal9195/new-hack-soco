const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const socket = require('socket.io')
const mongodb = require("mongodb");
//connect port
const PORT = process.env.PORT || 3000;
const app = express();
//connection
const server=app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
//bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//load routes
const users = require("./routes/users");
const chat = require("./routes/chat");
//static files
app.use(express.static(__dirname + "/public"));

//handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");
//mongo/mongo
const MongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017/socomodb";
//add user data
function insertUser(newMessage) {
  //now here return a promise
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function(err, db) {
      if (err) reject(err);
      var dbo = db.db("socomudb");
      dbo.collection("messages").insertOne(newMessage, function(err, res) {
        if (err) throw err;
        db.close();
        resolve();
      });
    });
  });
}
//Socket setup
var io = socket(server)
//io emit
io.emit("some event", { for: "everyone" });

io.on("connection", function(socket) {
    console.log
  socket.on("chat message", function(msg) {
    io.emit("chat message", msg);
    var newUser = {
      body: msg
    };
    insertUser(newUser);
  });
});
//mongoose
//db
const db = require("./config/database");

//index route
app.get("/", (req, res) => {
  res.render("index");
});


//use routes
app.use("/users", users);
app.use("/chat", chat);

