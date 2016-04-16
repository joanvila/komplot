var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//app.use(express.static('public'));

// initialization variables
var coinsUsers = [];
var coinsPositions = null;
var gameInProgress = false;

// main entrance point to serve the html
/*app.get('/', function(req, res){
  res.sendFile(path.join(__dirname+'/public/index.html'));
});*/

// socket.io connections
io.on('connection', function(socket) {
	console.log('user connected');
	socket.on('coin', function(data) {
		console.log(data);
	});
});


// express routes
app.get('/getId', function(req, res, next) {
	var n = coinsUsers.length;
	coinsUsers.push(0);
	res.send(n.toString());
});

app.get('/startGame', function(req, res, next) {
	coinsPositions = req.body.coinsPositions;
	console.log(coinsPositions); // TODO: Validate this
	// initialize all coins to visible
	for (var i = 0; i < coinsPositions.length; i++) {
		coinsPostiions[i].visible = true;
	}
	gameInProgress = true;
});

app.post('/addCoins/:userId', function(req, res, next) {
	var userId = req.params.userId;
	var coinPositoin = req.body.position;
	console.log(coinPosition); // TODO: Validate this
	coinsUsers[userId]++;
	res.sendStatus(200);
});


app.listen(8080, function() {
	console.log('We are listening on port 8080');
});
