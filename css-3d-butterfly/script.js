var timer;
document.addEventListener('click', moveTo);

function moveTo(e) {
    var container = document.querySelector('.container');
    var currentX = parseInt(container.style.left, 10);
    var currentY = parseInt(container.style.top, 10);
    var newX = e.clientX - 60;
    var newY = e.clientY - 10;
    var deltaX = newX - currentX;
    var deltaY = newY - currentY;

    var rotateZ = -Math.min(deltaX / 10, 180);
    var rotateX = 90 - Math.min(deltaY / 10, 90);
    var translateZ = newY - 500;

    container.style.left = newX + 'px';
    container.style.top = newY + 'px';
    container.style.transform = 'translateZ(' + translateZ + 'px) rotateX(' + rotateX + 'deg) rotateZ(' + rotateZ + 'deg)';

    clearTimeout(timer);
    timer = setTimeout(function() {
        container.style.transform = 'rotateX(' + rotateX + 'deg) rotateZ(0deg)';
    }, 2000);
}

document.querySelector('.close').addEventListener('click', function() {
    document.querySelector('.info').classList.add('hidden');
    return false;
});