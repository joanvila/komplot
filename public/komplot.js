var game = new Phaser.Game(1152, 448, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });
var socket = io('http://localhost:3000');

function preload() {

    game.load.tilemap('test', 'level1.json', null, Phaser.Tilemap.TILED_JSON);

    game.load.image('tiles', 'my_assets/tileset2.png');

}

var map;
var layer;

function create() {

    // socket.io stuff
    socket.emit('coin', { my: 'data'});

    //  The 'mario' key here is the Loader key given in game.load.tilemap
    map = game.add.tilemap('test');

    //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
    //  The second parameter maps this name to the Phaser.Cache key 'tiles'
    map.addTilesetImage('tiles', 'tiles');

    //  Creates a layer from the World1 layer in the map data.
    //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
    layer = map.createLayer('Tile Layer 1');

    //  This resizes the game world to match the layer dimensions
    layer.resizeWorld();

}
