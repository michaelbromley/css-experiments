function Perspective(midgroundContainer) {
    var midground = midgroundContainer;

    this.update = function(ship) {
        var x = ship.x * -0.3;
        var y = ship.y * -0.3;
        midground.style.transform = "translateX(" + x + 'px) translateY(' + y + 'px)';
    }
}


var ship = new Ship(
    document.querySelector('.ship-container'),
    document.documentElement.clientWidth,
    document.documentElement.clientHeight);

var perspective = new Perspective(document.querySelector('.midground'));

shotFactory.setTemplate(document.querySelector('.shot'));

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
        if (keysDown.indexOf(32) !== -1) {
            shotFactory.create(ship.x, ship.y);
            console.log('ship.x: ' +ship.x+', ship.y: ' + ship.y);
        }
    }

    ship.updatePosition();
    perspective.update(ship);
    shotFactory.updatePositions(ship);

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