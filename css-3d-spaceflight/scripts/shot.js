
function Shot(el, x, y) {
    var self = this;
    var range = 15000; // how far into the distance before it disappears
    self.el = el;
    self.x = x;
    self.y = y;
    self.z = 0;
    self.vz = -200;
    self.hit = false; // has the shot collided with an alien?

    /**
     * The x and y is the position of the ship, which affects how the shots will be offset
     * @param x
     * @param y
     * @returns {boolean}
     */
    self.updatePosition = function(x, y) {
        var offsetX = self.x - x;
        var offsetY = self.y - y;
        var opacity = (range + self.z) / range;
        self.z += self.vz;
        self.el.style.transform =
            'translateY(' + (self.y + offsetY) + 'px) ' +
            'translateX(' + (self.x + offsetX) + 'px) ' +
            'translateZ(' + self.z + 'px) ';
        self.el.style.opacity = opacity;
        return self.z < -range || self.hit;
    };
}

var shotFactory = (function() {
    var shotElement;
    var shots = [];
    return {
        setTemplate: function(el) {
            shotElement = el.cloneNode(false);
            shotElement.style.display = 'block';
        },
        create: function(x, y) {
            var newElement = shotElement.cloneNode(false);
            document.querySelector('.scene').appendChild(newElement);
            shots.push(new Shot(newElement, x, y));
        },
        updatePositions: function(ship) {
            var shotsToRemove = [];
            var remove, i;
            for(i = 0; i < shots.length; i++) {
                remove = shots[i].updatePosition(ship.x, ship.y);
                if (remove) {
                    shotsToRemove.push(i);
                }
            }

            // remove any shots that have gone too distant
            for(i = shotsToRemove.length - 1; i >= 0; --i) {
                var el = shots[shotsToRemove[i]].el;
                shots.splice(shotsToRemove[i], 1);
                document.querySelector('.scene').removeChild(el);
            }
        },
        shots: function() {
            return shots;
        }
    };
})();