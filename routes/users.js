const mongodb = require("mongodb");
const express = require("express");
const router = express.Router();

//mongo
const MongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017/socomodb";

//add user data
function insertUser(newUser){
    //now here return a promise
    return new Promise((resolve, reject) => {
MongoClient.connect(url, function(err, db) {
  if (err) reject(err);
  var dbo = db.db("socomudb");
  dbo.collection("users").insertOne(newUser, function(err, res) {
    if (err) throw err;
    db.close();
    resolve()
  });
});
});
}

//Index
router.get('/', (req,res)=>{
  res.render("users/register");
})

//index
router.post("/add",async (req, res) => {
  console.log(req.body);
  var newUser = { 
    name:req.body.name,
    login_password:req.body.password,
    dob:req.body.dob,
    email_id:req.body.email
  };
    await insertUser(newUser)
  res.render("users/index");
});

module.exports = router;
