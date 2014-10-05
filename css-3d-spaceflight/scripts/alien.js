/**
 * Created by Michael on 02/10/2014.
 */

function Alien(el, x, y, speed, motionFunction) {
    var self = this;
    var range = -15000;
    self.el = el;
    self.x = x;
    self.y = y;
    self.z = range;
    self.vz = speed;
    self.motionFunction = motionFunction;
    self.hit = false; // has the alien been hit by a shot?
    self.destroyed = false; // has it exploded from being hit?

    /**
     * The x and y is the position of the ship, which affects how the shots will be offset
     * @param x
     * @param y
     * @returns {boolean}
     */
    self.updatePosition = function(x, y) {
        var xy = applyMotionFunction();
        var offsetX = self.x - x;
        var offsetY = self.y - y;
        var opacity =  Math.min(1 - self.z / range / 2, 1);
        self.z += self.vz;
        self.el.style.transform =
            'translateY(' + (xy.y + offsetY) + 'px) ' +
            'translateX(' + (xy.x + offsetX) + 'px) ' +
            'translateZ(' + self.z + 'px) ';
        self.el.style.opacity = opacity;
        self.el.style.display = 'block';

        if (self.hit) {
            destroy();
        }
        return 500 < self.z || self.destroyed;
    };

    function applyMotionFunction() {
        return self.motionFunction.call(self);
    }

    function destroy() {
        self.el.classList.add('hit');
        setTimeout(function() {
            self.destroyed = true;
        }, 1200);
    }
}


var alienFactory = (function() {
    var alienElement;
    var aliens = [];
    var viewportWidth = document.documentElement.clientWidth;
    var viewportHeight = document.documentElement.clientHeight;

    /**
     * Alien motion functions. All take the z position of the alien as an argument, and return
     * an object with x and y properties.
     * The functions are called within the context of an alien object, so `this` will refer to
     * the alien itself.
     */
    var noMotion = function() {
        return {
            x: this.x,
            y: this.y
        };
    };
    
    var verticalOscillation = function(z) {
        var y = this.y + Math.sin(this.z/1000) * viewportHeight/4;
        var x = this.x;
        return {
            x: x,
            y: y
        };
    };

    return {
        setTemplate: function(el) {
            alienElement = el.cloneNode(true);
        },
        spawn: function() {
            var newElement = alienElement.cloneNode(true);
            var spawnX = viewportWidth * (Math.random() - 0.5) * 0.8;
            var spawnY = viewportHeight * (Math.random() - 0.5) * 0.5;
            var sceneDiv = document.querySelector('.scene');
            sceneDiv.insertBefore(newElement, sceneDiv.children[0]);
            aliens.push(new Alien(newElement, spawnX, spawnY, 30, verticalOscillation));
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