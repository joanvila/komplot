var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//app.use(express.static('public'));

// initialization variables
var users = [];
var eatenCoins = 0;
var eatenCoinsArray = [];
var gameInProgress = false;

// socket.io connections
io.on('connection', function(socket) {
	console.log('user connected');

	socket.on('eatcoin', function(data) {
		users[data.player]+=10;
		eatenCoins++;
		eatenCoinsArray.push(data.coin);
		io.emit('eatcoin', data.coin);
		io.emit('SyncScore', users);

		if (eatenCoins === 59) {
			io.emit('endgame', users);
			gameInProgress = false;
			eatencoins = 0;
			users = [];
			eatenCoinsArray = [];
		}
	});

	socket.on('getid', function(msg){
		var n = users.length;
		users.push(0);
    	io.emit('getid', {
			userId: n.toString(),
			eatenCoinsArray: eatenCoinsArray
		});
		if (n === 0) {
			eatenCoins = 0;
			gameInProgress = true;
		}
  	});

	socket.on('disconnect', function (userId) {
		users[userId] = null;
    	console.log('user disconnected');
  	});
});

http.listen(3000, function() {
	console.log('We are listening on port 3000');
});
