
function Ship(containerElement) {
    var self = this;
    this.el = containerElement;
    this.x = 0;
    this.y = 200;
    this.z = 0;
    this.rX = 90;
    this.rY = 0;
    this.rZ = 0;
    updatePosition();

    this.moveLeft = function () {
        this.x += 5;
        updatePosition();
    };
    this.moveRight = function () {
        this.x -= 5;
        updatePosition();
    };

    function updatePosition() {
        self.el.style.transform =
            'translateZ(' + self.z + 'px) ' +
            'translateX(' + self.x + 'px) ' +
            'translateY(' + self.y + 'px) ' +
            'rotateX(' + self.rX + 'deg) ' +
            'rotateY(' + self.rY + 'deg) ' +
            'rotateZ(' + self.rZ + 'deg) ';
    }

    function debounce(func, wait, immediate) {
        var timeout, result;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                }
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) {
                result = func.apply(context, args);
            }
            return result;
        };
    }
}

var ship = new Ship(document.querySelector('.ship-container'));


/**
 * Globals
 */
var keyDown = 0;

/**
 * Game loop
 */
(function tick() {
    if (keyDown !== 0) {
        switch(keyDown) {
            case 39:
                ship.moveLeft();
                break;
            case 37:
                ship.moveRight();
                break;
        }
    }
    setTimeout(tick, 30);
})();

/**
 * Event handlers
 */
document.addEventListener('keydown', function(e) {
    keyDown = e.which;
});
document.addEventListener('keyup', function(e) {
    keyDown = 0;
});