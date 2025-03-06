
//variable intialize//
var radius = screen.width < 768 ? 145 : 390;
var autoRotate = true;
var rotatespeed = -60;
var imgwidth = screen.width < 768 ? 120 : 324;
var imgheight = screen.width < 768 ? 170 : 459;

setTimeout(init, 1000);
//select dom car elements//

var odrag = document.querySelector('#drag-container');
var ospin = document.querySelector('#spin-container');
var aImg = ospin.getElementsByTagName('img');
var aEle = [...aImg];

//set image width and height//

ospin.style.width = imgwidth + 'px';
ospin.style.height = imgheight + 'px';

var ground = document.querySelector('#ground');
ground.style.width = radius * 3 + 'px';
ground.style.height = radius * 3 + 'px';

function init(delayTime) {
    for (var i = 0; i < aEle.length; i++) {
        aEle[i].style.transform = `rotateY(${i * (360 / aEle.length)}deg) translateZ(${radius}px)`;
        aEle[i].style.transition = 'transform 1s';
        aEle[i].style.transitionDelay = delayTime || (aEle.length- i) / 4
    }
}

//  setup object transfrom//

function applyTransform(obj) {
    if (tY > 180) tY = 180;
    if (tY < 0) tY = 0;
    obj.style.transform = `rotateX(${-tY}deg)  rotateY(${tX}deg)`;
}

function playSpin(yes = true) {
    ospin.style.animationPlayState = yes ? 'running' : 'paused';
}

var sX,
    sY,
    nX,
    nY,
    desX = 0,
    desY = 0,
    tX = 0,
    tY = 0;

//  enable auto rotating effect

if (autoRotate) {
    var animationName = rotatespeed > 0 ? `spin` : ` spinRevert`;
    ospin.style.animation = `${animationName} ${Math.abs(rotatespeed)
        }s infinite linear`;
}

//enable on pointer down effect

odrag.onpointerdown = function (e) {
    clearInterval(odrag.timer);
    var sX = e.clientX,
        sY = e.clientY;
    /// pointer move effect
    this.onpointermove = function (e) {
        var nX = e.clientX,
            nY = e.clientY;
        desX = nX - sX;
        desY = nY - sY;
        tX += desX * 0.1;
        tY += desY * 0.1;
        applyTransform(odrag);
        sX = nX;
        sY = nY;
    };
    //pointer up effect
    this.onpointerup = function (e) {
        odrag.timer = setInterval(() => {
            desX *= 0.95;
            desY *= 0.95;
            tX += desX * 0.1;
            tY += desY * 0.1;
            applyTransform(odrag);
            playSpin(false);
            if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
                clearInterval(odrag.timer);
                playSpin(true);
            }
        }, 17);
        this.onpointermove = this.onpointerup = null;
    };
    return false;
};

odrag.onmousewheel = function(e) {
    e = e || window.event;
    var d = e.wheelDelta / 20 || -e.detail;
    radius += d;
    init(1);
};



// 36.42