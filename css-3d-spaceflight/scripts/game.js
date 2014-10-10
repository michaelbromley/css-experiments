/**
 * Initialize
 */
var ship = new Ship(
    document.querySelector('.ship-container'),
    document.documentElement.clientWidth,
    document.documentElement.clientHeight);
var track = new Track(document.querySelector('.midground'));

display.setAnnouncerElement(document.querySelector('.announcement'));
display.setFirepowerElement(document.querySelector('.announcement'));
shotFactory.setTemplate(document.querySelector('.shot'));
alienFactory.setTemplate(document.querySelector('.alien-container'));
levelPlayer.setLevel(levelData);

/**
 * Globals
 */
var keysDown = [];

/**
 * Game loop
 */
function tick(timestamp) {
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

    var event = levelPlayer.getEvents(timestamp);

    display.update(event, shotFactory.firepower());
    ship.updatePosition(timestamp);
    track.update(ship);
    shotFactory.updatePositions(ship, timestamp);
    alienFactory.spawn(event);
    alienFactory.updatePositions(ship, timestamp);
    collisionDetector.check(shotFactory.shots(), alienFactory.aliens());

    window.requestAnimationFrame(tick);
}
window.requestAnimationFrame(tick);

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