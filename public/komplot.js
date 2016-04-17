var game = new Phaser.Game(1216, 512, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update:update, render:render });

function preload() {

    game.load.tilemap('test', 'level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'my_assets/tileset2.png');
    game.load.spritesheet('coin', 'assets/sprites/coin.png', 32, 32);
    game.load.image('player', 'my_assets/player.png'); 

}

var map;
var layer;
var player;
var cursors;
var facing = 'right';
var jumpTimer = 0;
var coinGroup;

var coins = [
    [4,2],[5,2],[6,2],[7,2],
    [2,5],[3,5],[4,5],[7,5],[8,5],
    [3,8],[5,8],[7,8],[9,8],
    [4,11],[5,11],[6,11],[7,11],[8,11],
    [11,4],[12,4],[14,3],[15,3],[17,1],[18,1],[17,2],[18,2],
    [12,12],[14,11],[16,10],[18,6],[18,7],[18,8],[20,10],[22,11],[24,12],
    [22,4],[25,4],[23,3],[24,3],[23,2],[24,2],[22,1],[25,1],
    [34,7],[35,7],[28,11],[29,11],[31,9],[32,9],[30,2],[31,1],[32,1],[33,2],[28,7],[29,7],[28,11],[29,11],[34,11],[35,11],
    [15,13],[17,12],[19,12],[21,13],

];
var TILE_X = 38;
var TILE_Y = 16;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#ffffff';
    game.time.desiredFps = 30;
    game.physics.arcade.gravity.y = 250;

    //  The 'mario' key here is the Loader key given in game.load.tilemap
    map = game.add.tilemap('test');

    //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
    //  The second parameter maps this name to the Phaser.Cache key 'tiles'
    map.addTilesetImage('tiles', 'tiles');
    
    for (var i = 0; i < 61; ++i) {
        if (/*i !== 28 && */i !== 27) {
            map.setCollision(i);
        }
    }
    
    //  Creates a layer from the World1 layer in the map data.
    //  A Layer is effectively like a Phaser.player, so is added to the display list.
    layer = map.createLayer('Tile Layer 1');

    layer.debug = true;

    //  This resizes the game world to match the layer dimensions
    layer.resizeWorld();

    coinGroup = game.add.group();   
    coinGroup.enableBody = true;
    coins.forEach(function(c) {
        coin = coinGroup.create((1216/TILE_X)*c[0], (512/TILE_Y)*c[1], 'coin');
        coin.body.allowGravity = false;
    })
    coinGroup.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5], 10, true);  
    coinGroup.callAll('animations.play', 'animations', 'spin');

    player = game.add.sprite(32, 32, 'player');
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.bounce.y = 0.2;
    player.body.collideWorldBounds = true;
    player.body.setSize(16, 16, 8, 8);
    player.anchor.x = 0.5;
    player.anchor.y = 0.5;


    game.camera.follow(player);

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    player.body.velocity.x = 0;
}

var jumps = 0;

function update() {

    game.physics.arcade.collide(player, layer);
    game.physics.arcade.collide(coinGroup, layer); 
    game.physics.arcade.overlap(player, coinGroup, collectCoin, null, this); 

    if (player.body.velocity.x > 0) {
        player.body.velocity.x /= 1.05;
        if (player.body.velocity.x < 0.05) {
            player.body.velocity.x = 0;
        }
    }
    if (player.body.velocity.x < 0) {
        player.body.velocity.x /= 1.05;
        if (player.body.velocity.x > -0.05) {
            player.body.velocity.x = 0;
        }
    }

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -125;

        if (facing != 'left')
        {
            player.angle -= -180;
            facing = 'left';
        }
    } else if (cursors.right.isDown)
    {
        player.body.velocity.x = 125;

        if (facing != 'right')
        {
            player.angle += 180;
            facing = 'right';
        }
    }
    
    if (jumpButton.isDown && player.body.onFloor())
    {
        player.body.velocity.y = -250;
        ++jumps;

    } else if (jumpButton.isDown && jumps === 1) {
        player.body.velocity.y = -250;
        jumps = 0;
    }

}


function render () {

    //game.debug.text(game.time.suggestedFps, 32, 32);

    // game.debug.text(game.time.physicsElapsed, 32, 32);
    game.debug.body(player);
    game.debug.body(map);
    // game.debug.bodyInfo(player, 16, 24);

}

function collectCoin(player, coin) {

    coin.kill();

}