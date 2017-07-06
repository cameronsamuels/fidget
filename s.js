function a(e) { return document.querySelector(e) }
var movement = 0, mousedown, el = a('img'), angle = 0, startAngle, originX, originY, x = 0, elapse,
    init = function() {
      originX = innerWidth / 2, originY = innerHeight / 2;
      el.style.transitionDuration = '0';
      el.addEventListener('touchstart', rotateStart), el.addEventListener('touchmove', rotateMove),
      el.addEventListener('touchend', rotateStop);
      if (!navigator.userAgent.match(/iPhone|iPad|iPod|Android/i)) document.onmousedown = rotateStart,
        document.onmousemove = rotateMove, document.onmouseup = rotateStop;
    },
    rotateStart = function(e) {
      e.preventDefault();
      elapse = new Date(), mousedown = true, movement = 0, originX = innerWidth / 2, originY = innerHeight / 2;
      el.style.transitionDuration = '';
      if (e.touches) var startX = e.touches[0].pageX - originX, startY = e.touches[0].pageY - originY;
      else var startX = e.clientX - originX, startY = e.clientY - originY;
      startAngle = Math.atan2(startY, startX) - angle;
    },
    rotateMove = function(e) {
      e.preventDefault();
      if (e.type == 'mousemove' && !mousedown) return;
      originX = innerWidth / 2, originY = innerHeight / 2;
      if (e.touches) var dx = e.touches[0].pageX - originX, dy = e.touches[0].pageY - originY;
      else var dx = e.clientX - originX, dy = e.clientY - originY;
      angle = Math.atan2(dy, dx) - startAngle;
      movement = parseFloat(movement) + 10;
        el.style.transform = 'rotate(' + angle + 'rad)'
    },
    rotateStop = function(e) {
      var ratio = movement/(new Date() - elapse);
      mousedown = false, angle = ratio * 1000;
      if (new Date() - elapse > 30 && movement > 20) el.style.transitionDuration = Math.round(ratio * 30000) + 'ms',
      el.style.transform = 'rotate(' + angle + 'rad)';
      movement = 0;
    };
addEventListener("load", function() {
  var h = a('div');
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
  setTimeout(init, 100)
}, true);
setInterval(function() {
  x += 3;
  document.body.style.backgroundPosition = '0 ' + x + 'px';
}, 100);
setInterval(function(){movement=0},175), setInterval(function(){elapse=new Date()},1000);