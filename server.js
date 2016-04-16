var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//puntuacio o algo random
var coinsUsers = [];
var coinsPositions = null;
var gameInProgress = false;

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


app.listen(3000, function() {
	console.log('We are listening on port 3000');
});

function isGameFinished() {
	var inProgress = true;
}