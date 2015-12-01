var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require('socket.io')(server);


app.use(express.static(__dirname + "/dist"));

app.get("*", function(req, res) {
  var options = {
    root: __dirname + '/dist/',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };
  res.sendFile("index.html", options, function(err) {
    if (err) {
      console.log("Error: %s", err);
    } else {
      console.log("SENT APP :D");
    }
  });
});

io.on('connection', function(socket) {
  console.log("a user connected");
});

server.listen(3000, function() {
  console.log("Magic is happening on :3000");
});
