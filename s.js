function a(e) { return document.querySelector(e) }
var movement = 0, mousedown, el = a('img'), angle = 0, startAngle, originX, originY, x = 0, elapse,
  spinner = {
    init: function() {
      originX = innerWidth / 2, originY = innerHeight / 2;
      el.style.transitionDuration = '0';
      el.addEventListener('touchstart', this.rotateStart), el.addEventListener('touchmove', this.rotateMove),
      el.addEventListener('touchend', this.rotateStop);
      if (!navigator.userAgent.match(/iPhone|iPad|iPod|Android/i)) document.onmousedown = this.rotateStart,
        document.onmousemove = this.rotateMove, document.onmouseup = this.rotateStop;
    },
    rotateStart: function(e) {
      e.preventDefault();
      elapse = new Date(), mousedown = true, movement = 0, originX = innerWidth / 2, originY = innerHeight / 2;
      el.style.transitionDuration = '';
      // , el.style.transform = '';
      // setTimeout(function(){movement=0},70);
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
      angle = Math.atan2(dy, dx) - startAngle;
      movement = parseFloat(movement) + 10;
      // if (new Date() - elapse > 50)
        el.style.transform = 'rotate(' + angle + 'rad)'
    },
    rotateStop: function(e) {
      var ratio = movement/(new Date() - elapse);
      mousedown = false, angle = ratio * 1000;
      // if (movement < 0.5) {
      //   el.style.transitionDuration = '16000ms';
      //   angle *= 5;
      // } else
      if (new Date() - elapse > 30 && movement > 30) el.style.transitionDuration = Math.round(ratio * 30000) + 'ms',
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
setInterval(function() {
  x += 3;
  document.body.style.backgroundPosition = '0 ' + x + 'px';
}, 100);
setInterval(function(){movement=0},200), setInterval(function(){elapse=new Date()},1000);