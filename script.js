document.addEventListener("DOMContentLoaded", function() {
  
  var e = document.querySelector("img");
  var c = 0;
  var f = 0;
  var d, g, h, k, l;
  
  function m() {
    h = innerWidth / 2;
    k = innerHeight / 2;
    e.style.transitionDuration = "0";
    e.addEventListener("touchstart", n);
    e.addEventListener("touchmove", p);
    e.addEventListener("touchend", q);
    navigator.userAgent.match(/iPhone|iPad|iPod|Android/i) || (e.onmousedown = n, document.onmousemove = p, document.onmouseup = q);
  }
  
  function n(a) {
    a.preventDefault();
    l = new Date;
    d = !0;
    c = 0;
    h = innerWidth / 2;
    k = innerHeight / 2;
    e.style.transitionDuration = "";
    
    if (a.touches) {
      var b = a.touches[0].pageX - h;
      a = a.touches[0].pageY - k;
    } else b = a.clientX - h, a = a.clientY - k;
    g = Math.atan2(a, b) - f;
  }
  
  function p(a) {
    a.preventDefault();
    if ("mousemove" != a.type || d) {
      h = innerWidth / 2, k = innerHeight / 2;
      if (a.touches) {
        var b = a.touches[0].pageX - h;
        a = a.touches[0].pageY - k;
      } else b = a.clientX - h, a = a.clientY - k;
      f = Math.atan2(a, b) - g, c = parseFloat(c) + 10,
      e.style.transform = "rotate(" + f + "rad)";
    }
  }
  
  function q() {
    var a = c / (new Date - l);
    d = !1;
    f = 1000 * a;
    30 < new Date - l && 20 < c && (e.style.transitionDuration = Math.round(30000 * a) + "ms",
    e.style.transform = "rotate(" + f + "rad)");
    c = 0;
  }
  
  var a = document.querySelector("div");
  for (i = 1; 7 > i; i++) {
    var b = document.createElement("img");
    b.src = "images/" + i + ".png";
    b.ontouchend = function(a) { e.src = a.target.src };
    b.onmouseup = b.ontouchend, a.appendChild(b);
  }
  document.addEventListener("touchmove", function(a) { a.preventDefault() });
  setTimeout(m, 100);
  
  setInterval(function() { c = 0 }, 165),
  setInterval(function() { l = new Date }, 1000),
  document.oncontextmenu = function(e) { e.preventDefault() },
  document.ondragstart = function(e) { return false }
  
});
