function Ship(containerElement, fieldWidth, fieldHeight) {
    var self = this;

    // Constants
    var A = 2; // acceleration factor
    var D = 0.6; // deceleration factor
    var AA = 2; // angular acceleration factor
    var AD = 0.1; // angular deceleration factor
    var MAX_A = 25; // maximum permitted linear acceleration
    var MAX_AA = 10; // maximum permitted angular acceleration
    // field boundary limits
    var MIN_X = -fieldWidth * 0.4;
    var MAX_X = fieldWidth * 0.4;
    var MAX_Y = fieldHeight * 0.4;
    var MIN_Y = -fieldHeight * 0.4;

    self.el = containerElement;

    // linear position
    self.x = 0;
    self.y = 100;
    self.z = 0;

    // linear acceleration
    self.ax = 0;
    self.ay = 0;

    // rotational position
    self.rX = 90;
    self.rY = 0;
    self.rZ = 0;

    // rotational acceleration
    self.arX = 0;
    self.arY = 0;
    self.arZ = 0;

    self.moveLeft = function () {
        self.ax += A;
        self.arY += AA;
        self.arZ += AA;
    };

    self.moveRight = function () {
        self.ax-= A;
        self.arY -= AA;
        self.arZ -= AA;
    };

    self.moveUp = function () {
        self.ay -= A;
        self.arX -= AA;
    };

    self.moveDown = function () {
        self.ay += A;
        self.arX += AA;
    };

    self.updatePosition = function() {
        enforceFieldBoundary();

        self.x += self.ax;
        self.y += self.ay;
        self.rY += self.arY;
        self.rZ += self.arZ;
        self.rX += self.arX;

        self.ax = applyDeceleration(self.ax, D);
        self.ay = applyDeceleration(self.ay, D);
        self.arX = applyRotationalDeceleration(self.arX, self.rX, 90, AD);
        self.arY = applyRotationalDeceleration(self.arY, self.rY, 0, AD);
        self.arZ = applyRotationalDeceleration(self.arZ, self.rZ, 0, AD);

        self.el.style.transform =
            'translateZ(' + self.z + 'px) ' +
            'translateX(' + self.x + 'px) ' +
            'translateY(' + self.y + 'px) ' +
            'rotateX(' + self.rX + 'deg) ' +
            'rotateY(' + self.rY + 'deg) ' +
            'rotateZ(' + self.rZ + 'deg) ';
    };

    function enforceFieldBoundary() {
        var bounceFactor = 0.1;
        var delta;
        if (MAX_X < self.x) {
            delta = self.x - MAX_X;
            self.ax -= delta * bounceFactor;
        }
        if (self.x < MIN_X) {
            delta = MIN_X - self.x;
            self.ax += delta * bounceFactor;
        }
        if (MAX_Y < self.y) {
            delta = self.y - MAX_Y;
            self.ay -= delta * bounceFactor;
        }
        if (self.y < MIN_Y) {
            delta = MIN_Y - self.y;
            self.ay += delta * bounceFactor;
        }

    }

    function applyDeceleration(oldValue, decelerationFactor) {
        var newValue;

        if (0 < oldValue) {
            newValue  =  oldValue - decelerationFactor;
        } else if (oldValue < 0) {
            newValue = oldValue + decelerationFactor;
        } else {
            newValue = oldValue;
        }

        if (Math.abs(oldValue) < decelerationFactor) {
            newValue = 0;
        }

        if (MAX_A < newValue) {
            newValue = MAX_A;
        }
        if (newValue < -MAX_A) {
            newValue = -MAX_A;
        }

        return newValue;
    }

    function applyRotationalDeceleration(oldValue, currentAngle, targetAngle, decelerationFactor) {
        var newValue;

        var delta = currentAngle - targetAngle;
        if (0 < delta) {
            newValue =  -delta * decelerationFactor;
        } else if (delta < 0) {
            newValue = -delta * decelerationFactor;
        } else {
            newValue = oldValue;
        }

        if (Math.abs(targetAngle - currentAngle) < decelerationFactor) {
           newValue = 0;
        }

        if (MAX_AA < newValue) {
            newValue = MAX_AA;
        }
        if (newValue < -MAX_AA) {
            newValue = -MAX_AA;
        }

        return newValue;
    }
}
