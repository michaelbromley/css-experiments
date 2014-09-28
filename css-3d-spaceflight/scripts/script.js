
var ship = new Ship(
    document.querySelector('.ship-container'),
    document.documentElement.clientWidth,
    document.documentElement.clientHeight);


/**
 * Globals
 */
var keysDown = [];

/**
 * Game loop
 */
(function tick() {
    if (0 < keysDown.length) {
        if (keysDown.indexOf(39) !== -1) {
            ship.moveLeft();
        }
        if (keysDown.indexOf(37) !== -1) {
            ship.moveRight();
        }
        if (keysDown.indexOf(38) !== -1) {
            ship.moveUp();
        }
        if (keysDown.indexOf(40) !== -1) {
            ship.moveDown();
        }
    }

    ship.updatePosition();


    setTimeout(tick, 30);
})();

/**
 * Event handlers
 */
document.addEventListener('keydown', function(e) {
    var keyCode = e.which;
    if (keysDown.indexOf(keyCode) === -1) {
        keysDown.push(keyCode);
    }
});
document.addEventListener('keyup', function(e) {
    var keyCode = e.which;
    keysDown.splice(keysDown.indexOf(keyCode), 1);
});