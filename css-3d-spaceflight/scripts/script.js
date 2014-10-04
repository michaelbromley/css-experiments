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
alienFactory.setTemplate(document.querySelector('.alien-container'));

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
        }
    }

    ship.updatePosition();
    perspective.update(ship);
    shotFactory.updatePositions(ship);
    alienFactory.updatePositions(ship);
    collisionDetector.check(shotFactory.shots(), alienFactory.aliens());

    document.querySelector('.firepower').innerHTML = shotFactory.firepower();

    setTimeout(tick, 30);
})();

/**
 * Event handlers
 */
document.addEventListener('keydown', function(e) {
    var keyCode = e.which;
    if (keysDown.indexOf(keyCode) === -1) {
        keysDown.push(keyCode);
        if (keyCode === 65) {
            alienFactory.spawn();
        }
    }
});
document.addEventListener('keyup', function(e) {
    var keyCode = e.which;
    keysDown.splice(keysDown.indexOf(keyCode), 1);
});