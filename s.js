function a(e) { return document.querySelector(e) }
var movement = 0, mousedown = 'false', el = a('ul'), angle = 0, startAngle = 0, originX = 160, originY = 160,
  spinner = {
    handleEvent: function(e) {
      if (e.type == 'touchstart') this.rotateStart(e);
      else if (e.type == 'touchmove') this.rotateMove(e);
      else if (e.type == 'touchend') this.rotateStop(e);
      else if (e.type == 'mousedown') {
        mousedown = 'true';
        this.rotateStart(e);
      } else if (e.type == 'mousemove' && mousedown == 'true') this.rotateMove(e);
      else if (e.type == 'mouseup') {
        mousedown = 'false';
        this.rotateStop(e);
      }
    },
    init: function() {
      originX = innerWidth / 2;
      originY = innerHeight / 2;
      el.style.transitionDuration = '0';
      el.addEventListener('touchstart', this, false);
      el.addEventListener('touchmove', this, false);
      el.addEventListener('touchend', this, false);
      if (!navigator.userAgent.match(/iPhone|iPad|iPod/i) && !navigator.userAgent.match(/Android/i)) {
        document.addEventListener('mousedown', this, false);
        document.addEventListener('mousemove', this, false);
        document.addEventListener('mouseup', this, false);
      }
    },
    rotateStart: function(e) {
      e.preventDefault();
      originX = innerWidth / 2;
      originY = innerHeight / 2;
      setTimeout(function() { movement = 0 }, 2000);
      el.style.transitionDuration = '0ms';
      el.style.transform = '';
      if (e.touches) var startX = e.touches[0].pageX - originX,
        startY = e.touches[0].pageY - originY;
      else var startX = e.clientX - originX,
        startY = e.clientY - originY;

      startAngle = Math.atan2(startY, startX) - angle;
      movement = 0;
    },
    rotateMove: function(e) {
      originX = innerWidth / 2;
      originY = innerHeight / 2;
      if (e.touches) var dx = e.touches[0].pageX - originX,
        dy = e.touches[0].pageY - originY;
      else var dx = e.clientX - originX,
        dy = e.clientY - originY;
      angle = Math.atan2(dy, dx) - startAngle;
      el.style.transform = 'rotate(' + angle + 'rad)';
      movement = parseFloat(movement) + 0.02;
    },
    rotateStop: function(e) {
      angle = movement * 1000;
      if (movement < 0.5) {
        el.style.transitionDuration = '16000ms';
        angle = angle * 5;
      } else el.style.transitionDuration = Math.round(movement * 6000) + 'ms';
      el.style.transform = 'rotate(' + angle + 'rad)';
      movement = 0;
    }
  };
function loaded() { spinner.init() }
addEventListener("load", function() {
  localStorage.spinner = localStorage.spinner || 1;
  el.style.backgroundImage = 'url(img/' + localStorage.spinner + '.png)';
  var eles = document.querySelectorAll('header div');
  for (i = 0; i < eles.length; i++) {
    eles[i].style.backgroundImage = 'url(img/' + (i + 1) + '.png)';
    eles[i].id = i + 1;
    eles[i].ontouchend = function(e) {
      localStorage.spinner = e.target.id;
      el.style.backgroundImage = 'url(img/' + localStorage.spinner + '.png)'
    };
    eles[i].onmouseup = eles[i].ontouchend;
  }
  document.addEventListener('touchmove', function(e) { e.preventDefault() });
  if (navigator.standalone) document.querySelector('header').style.paddingTop = "15px";
  setTimeout(loaded, 100)
}, true);
var x = 0;
setInterval(function() {
  x += 3;
  document.body.style.backgroundPosition = '0 ' + x + 'px';
}, 100);