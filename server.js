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
var coinsUsers = [];
var eatenCoins = 0;
var gameInProgress = false;

// socket.io connections
io.on('connection', function(socket) {
	console.log('user connected');

	socket.on('eatcoin', function(data) {
		coinsUsers[data.player]++;
		eatenCoins++;
		io.emit('eatcoin', data.coin);

		if (eatenCoins >= 59) {
			io.emit('endgame', coinsUsers);
			gameInProgress = false;
			eatencoins = 0;
			coinsUsers = [];
		}
	});

	socket.on('getid', function(msg){
		var n = coinsUsers.length;
		coinsUsers.push(0);
    	io.emit('getid', n.toString());
		if (n === 0) {
			eatenCoins = 0;
			gameInProgress = true;
		}
  	});

	socket.on('disconnect', function () {
    	io.emit('user disconnected');
  	});
});

http.listen(3000, function() {
	console.log('We are listening on port 3000');
});
