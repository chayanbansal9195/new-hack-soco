var socket = io.connect("http://localhost:3000");

$(function() {
  var socket = io();

 
  $("form").submit(function(e) {
    e.preventDefault(); // prevents page reloading
    socket.emit("chat message", $("#mu").val());
    $("#mu").val("");
    return false;
  });
  socket.on("chat message", function(msg) {
    console.log(msg);
    if (msg.indexOf(".") !== -1) {
      $("#messages").append(
        $(`<li><audio controls src="/audio/${msg}" type="audio/mpeg"></audio>`)
      );
    } else {
      $("#messages").append($(`<li>`).text(msg));
    }
  });
});

