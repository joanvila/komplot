var game = new Phaser.Game(1152+64, 448+64, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update:update, render:render });

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
var facing = 'left';
var jumpTimer = 0;
var coins;

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

    //map.setCollisionBetween(15, 16);
    //map.setCollisionBetween(20, 25);
    //map.setCollisionBetween(27, 29);
    for (var i = 0; i < 61; ++i) {
        if (i !== 27) {
            map.setCollision(i);
        }
    }
    
    //  Creates a layer from the World1 layer in the map data.
    //  A Layer is effectively like a Phaser.player, so is added to the display list.
    layer = map.createLayer('Tile Layer 1');

    //layer.debug = true;

    //  This resizes the game world to match the layer dimensions
    layer.resizeWorld();

    player = game.add.sprite(32, 32, 'player');
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.bounce.y = 0.2;
    player.body.collideWorldBounds = true;
    player.body.setSize(16, 16, 8, 8);

    coins = game.add.sprite(100, 100, 'coin');

    game.camera.follow(player);

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    player.body.velocity.x = 0;
}

var jumps = 0;

function update() {

    game.physics.arcade.collide(player, layer);

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

        /*if (facing != 'left')
        {
            player.animations.play('left');
            facing = 'left';
        }*/
    } else if (cursors.right.isDown)
    {
        player.body.velocity.x = 125;

        /*if (facing != 'right')
        {
            player.animations.play('right');
            facing = 'right';
        }*/
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

    game.debug.text(game.time.suggestedFps, 32, 32);

    // game.debug.text(game.time.physicsElapsed, 32, 32);
    game.debug.body(player);
    // game.debug.bodyInfo(player, 16, 24);

}