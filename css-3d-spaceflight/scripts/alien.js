/**
 * Created by Michael on 02/10/2014.
 */

function Alien(el, x, y, speed) {
    var self = this;
    var range = -15000;
    self.el = el;
    self.x = x;
    self.y = y;
    self.z = range;
    self.vz = speed;
    self.hit = false; // has the alien been hit by a shot?

    /**
     * The x and y is the position of the ship, which affects how the shots will be offset
     * @param x
     * @param y
     * @returns {boolean}
     */
    self.updatePosition = function(x, y) {
        var offsetX = self.x - x;
        var offsetY = self.y - y;
        var opacity =  Math.min(1 - self.z / range / 2, 1);
        self.z += self.vz;
        self.el.style.transform =
            'translateY(' + (self.y + offsetY) + 'px) ' +
            'translateX(' + (self.x + offsetX) + 'px) ' +
            'translateZ(' + self.z + 'px) ';
        self.el.style.opacity = opacity;
        self.el.style.display = 'block';
        return 500 < self.z || self.hit;
    };
}


var alienFactory = (function() {
    var alienElement;
    var aliens = [];
    return {
        setTemplate: function(el) {
            alienElement = el.cloneNode(true);
        },
        spawn: function() {
            var newElement = alienElement.cloneNode(true);
            var spawnX = document.documentElement.clientWidth * (Math.random() - 0.5);
            var spawnY = document.documentElement.clientHeight * (Math.random() - 0.5) * 0.8;
            var sceneDiv = document.querySelector('.scene');
            sceneDiv.insertBefore(newElement, sceneDiv.children[0]);
            aliens.push(new Alien(newElement, spawnX, spawnY, 100));
        },
        updatePositions: function(ship) {
            var aliensToRemove = [];
            var remove, i;
            for(i = 0; i < aliens.length; i++) {
                remove = aliens[i].updatePosition(ship.x, ship.y);
                if (remove) {
                    aliensToRemove.push(i);
                }
            }

            // remove any shots that have gone too distant
            for(i = aliensToRemove.length - 1; i >= 0; --i) {
                var el = aliens[aliensToRemove[i]].el;
                aliens.splice(aliensToRemove[i], 1);
                document.querySelector('.scene').removeChild(el);
            }
        },
        aliens: function() {
            return aliens;
        }
    };
})();