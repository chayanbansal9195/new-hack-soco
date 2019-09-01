const express = require("express");
const app = express();
const router = express.Router();
const mongodb = require("mongodb");
var http = require("http").createServer(app);
var io = require("socket.io")(http);


router.get("/", function(req, res) {
  res.render("chat/chat");
});



module.exports = router;
