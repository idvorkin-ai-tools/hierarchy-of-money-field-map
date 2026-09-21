(function () {
  var root = document.getElementById("walk");
  if (!root) return;
  var key = root.getAttribute("data-walk");
  var STEPS = (window.WALKS && window.WALKS[key]) || window.WALK_STEPS;
  if (!STEPS || !STEPS.length) return;

  var i = 0,
    playing = false,
    timer = null;
  var range = root.querySelector("input[type=range]");
  var count = root.querySelector(".walk-count");
  var bridge = root.querySelector(".walk-bridge");
  var title = root.querySelector(".walk-t");
  var labP = root.querySelector(".walk-lab.p");
  var labS = root.querySelector(".walk-lab.s");
  var bodyP = root.querySelector("[data-col=p]");
  var bodyS = root.querySelector("[data-col=s]");
  var img = root.querySelector(".walk-fig img");
  var cap = root.querySelector(".walk-fig figcaption");
  var prev = root.querySelector("[data-act=prev]");
  var next = root.querySelector("[data-act=next]");
  var play = root.querySelector("[data-act=play]");

  range.min = 0;
  range.max = STEPS.length - 1;

  function go(n) {
    i = Math.max(0, Math.min(STEPS.length - 1, n));
    var s = STEPS[i];
    bridge.textContent = s.b || "";
    title.textContent = s.t;
    labP.textContent = s.pl || "The problem";
    labS.textContent = s.sl || "The solution";
    bodyP.innerHTML = s.p;
    bodyS.innerHTML = s.s;
    img.src = s.img;
    img.alt = s.cap;
    cap.textContent = s.cap;
    range.value = i;
    count.textContent = i + " / " + (STEPS.length - 1);
    prev.disabled = i === 0;
    next.disabled = i === STEPS.length - 1;
  }

  function stop() {
    playing = false;
    play.textContent = "Play";
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  prev.addEventListener("click", function () {
    stop();
    go(i - 1);
  });
  next.addEventListener("click", function () {
    stop();
    go(i + 1);
  });
  range.addEventListener("input", function () {
    stop();
    go(+range.value);
  });
  play.addEventListener("click", function () {
    if (playing) {
      stop();
      return;
    }
    playing = true;
    play.textContent = "Pause";
    if (i === STEPS.length - 1) go(0);
    timer = setInterval(function () {
      if (i >= STEPS.length - 1) {
        stop();
        return;
      }
      go(i + 1);
    }, 4200);
  });
  document.addEventListener("keydown", function (e) {
    if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      stop();
      go(i + 1);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      stop();
      go(i - 1);
    }
  });
  go(0);
})();
