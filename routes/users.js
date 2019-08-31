const mongodb = require("mongodb");
const express = require("express");
const router = express.Router();

//mongo
const MongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017/socomodb";

//add user data
function insertUser(){
    //now here return a promise
    return new Promise((resolve, reject) => {
MongoClient.connect(url, function(err, db) {
  if (err) reject(err);
  var dbo = db.db("socomudb");
  var newUser = { 
      user_id: "j",
      name:"ch",
      login_password:"ghn",
      artists:['g','j'],
      genres:['d','l'],
      languages:['h','l'],
      dob:"13/7/199",
      email_id:"dhdh@hjh",
      communities:['k','k']
    };
  dbo.collection("users").insertOne(newUser, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
    resolve()
  });
});
});
}

//index
router.get("/",async (req, res) => {
    await insertUser()
  res.render("users/index");
});

module.exports = router;
