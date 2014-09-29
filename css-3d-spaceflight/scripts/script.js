function Perspective(backgroundContainer, midgroundContainer) {
    var background = backgroundContainer;
    var midground = midgroundContainer;

    this.update = function(ship) {
        var x = ship.x * -0.3;
        var y = ship.y * -0.3;
        midground.style.transform = "translateX(" + x + 'px) translateY(' + y + 'px)';
        //background.style.transform = "translateX(" + x * 0.3 + 'px) translateY(' + y * 0.3 + 'px)';
    }
}


var ship = new Ship(
    document.querySelector('.ship-container'),
    document.documentElement.clientWidth,
    document.documentElement.clientHeight);

var perspective = new Perspective(
    document.querySelector('.background'),
    document.querySelector('.midground'));

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
    perspective.update(ship);

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