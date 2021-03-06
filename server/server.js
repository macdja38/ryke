// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// var numUsers = 0;

io.on('connection', function (socket) {
  console.log("new connection");
  // var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('new location', function (data) {
    // console.log("new location information from id: " + data.id);
    // we tell the client to execute 'new location'
    socket.id = data.id;
    socket.broadcast.emit('new location', data);
  });

  socket.on('disconnect', function () {
    // echo globally that this client has left
    console.log("disconnect event");
    socket.broadcast.emit('user left', {
      id: socket.id
    });
  });
  // when the client emits 'add user', this listens and executes
  // socket.on('add user', function (username) {
  //   if (addedUser) return;

  //   // we store the username in the socket session for this client
  //   socket.username = username;
  //   ++numUsers;
  //   addedUser = true;
  //   socket.emit('login', {
  //     numUsers: numUsers
  //   });
  //   // echo globally (all clients) that a person has connected
  //   socket.broadcast.emit('user joined', {
  //     username: socket.username,
  //     numUsers: numUsers
  //   });
  // });
});
