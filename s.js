function a(e) { return document.querySelector(e) }
var movement = 0, mousedown = false, el = a('img'), angle = 0, startAngle = 0, originX = 160, originY = 160,
  spinner = {
    init: function() {
      originX = innerWidth / 2;
      originY = innerHeight / 2;
      el.style.transitionDuration = '0';
      el.addEventListener('touchstart', this.rotateStart, false);
      el.addEventListener('touchmove', this.rotateMove, false);
      el.addEventListener('touchend', this.rotateStop, false);
      if (!navigator.userAgent.match(/iPhone|iPad|iPod|Android/i)) {
        document.addEventListener('mousedown', this.rotateStart, false);
        document.addEventListener('mousemove', this.rotateMove, false);
        document.addEventListener('mouseup', this.rotateStop, false);
      }
    },
    rotateStart: function(e) {
      e.preventDefault();
      mousedown = true, movement = 0, originX = innerWidth / 2, originY = innerHeight / 2;
      el.style.transitionDuration = '', el.style.transform = '';
      setTimeout(function(){movement=0},2000);
      if (e.touches) var startX = e.touches[0].pageX - originX, startY = e.touches[0].pageY - originY;
      else var startX = e.clientX - originX, startY = e.clientY - originY;
      startAngle = Math.atan2(startY, startX) - angle;
    },
    rotateMove: function(e) {
      e.preventDefault();
      if (e.type == 'mousemove' && !mousedown) return;
      originX = innerWidth / 2, originY = innerHeight / 2;
      if (e.touches) var dx = e.touches[0].pageX - originX, dy = e.touches[0].pageY - originY;
      else var dx = e.clientX - originX, dy = e.clientY - originY;
      angle = Math.atan2(dy, dx) - startAngle, movement = parseFloat(movement) + 0.02;
      el.style.transform = 'rotate(' + angle + 'rad)';
    },
    rotateStop: function(e) {
      mousedown = false, angle = movement * 1000;
      if (movement < 0.5) {
        el.style.transitionDuration = '16000ms';
        angle *= 5;
      } else el.style.transitionDuration = Math.round(movement * 6000) + 'ms';
      el.style.transform = 'rotate(' + angle + 'rad)';
      movement = 0;
    }
  };
addEventListener("load", function() {
  var h = a('header');
  for (i = 1; i < 7; i++) {
    var s = document.createElement('img');
    s.src = "img/" + i +  ".png";
    s.ontouchend = function(e) {
      el.src = e.target.src;
    };
    s.onmouseup = s.ontouchend;
    h.appendChild(s);
  }
  document.addEventListener('touchmove', function(e) { e.preventDefault() });
  if (navigator.standalone) document.querySelector('header').style.paddingTop = "15px";
  setTimeout(function(){spinner.init()}, 100)
}, true);
var x = 0;
setInterval(function() {
  x += 3;
  document.body.style.backgroundPosition = '0 ' + x + 'px';
}, 100);