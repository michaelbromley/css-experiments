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

    // linear velocity
    self.vx = 0;
    self.vy = 0;

    // rotational position
    self.rx = 90;
    self.ry = 0;
    self.rz = 0;

    // rotational velocity
    self.vrx = 0;
    self.vry = 0;
    self.vrz = 0;

    self.moveLeft = function () {
        self.vx += A;
        self.vry += AA;
        self.vrz += AA;
    };

    self.moveRight = function () {
        self.vx-= A;
        self.vry -= AA;
        self.vrz -= AA;
    };

    self.moveUp = function () {
        self.vy -= A;
        self.vrx -= AA;
    };

    self.moveDown = function () {
        self.vy += A;
        self.vrx += AA;
    };

    self.updatePosition = function() {
        enforceFieldBoundary();

        self.x += self.vx;
        self.y += self.vy;
        self.ry += self.vry;
        self.rz += self.vrz;
        self.rx += self.vrx;

        self.vx = applyDeceleration(self.vx, D);
        self.vy = applyDeceleration(self.vy, D);
        self.vrx = applyRotationalDeceleration(self.vrx, self.rx, 90, AD);
        self.vry = applyRotationalDeceleration(self.vry, self.ry, 0, AD);
        self.vrz = applyRotationalDeceleration(self.vrz, self.rz, 0, AD);

        self.el.style.transform =
            'translateZ(' + self.z + 'px) ' +
            'translateX(' + self.x + 'px) ' +
            'translateY(' + self.y + 'px) ' +
            'rotateX(' + self.rx + 'deg) ' +
            'rotateY(' + self.ry + 'deg) ' +
            'rotateZ(' + self.rz + 'deg) ';
    };

    function enforceFieldBoundary() {
        var bounceFactor = 0.1;
        var delta;
        if (MAX_X < self.x) {
            delta = self.x - MAX_X;
            self.vx -= delta * bounceFactor;
        }
        if (self.x < MIN_X) {
            delta = MIN_X - self.x;
            self.vx += delta * bounceFactor;
        }
        if (MAX_Y < self.y) {
            delta = self.y - MAX_Y;
            self.vy -= delta * bounceFactor;
        }
        if (self.y < MIN_Y) {
            delta = MIN_Y - self.y;
            self.vy += delta * bounceFactor;
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
