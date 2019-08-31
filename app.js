const express = require("express");
const exphbs = require("express-handlebars");

//connect port
const PORT = process.env.PORT || 3000;
const app = express();

//load routes
const users = require('./routes/users')


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
