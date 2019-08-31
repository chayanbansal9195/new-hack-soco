const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');

//connect port
const PORT = process.env.PORT || 3000;
const app = express();

//bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//load routes
const users = require('./routes/users')

//static files
app.use(express.static(__dirname+'/public'));


//handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

//mongoose
//db
const db = require("./config/database");


//index route
app.get("/", (req, res) => {
  res.render("index")
});


//use routes
app.use("/users",users)

//connection
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
