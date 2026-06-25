const clock = document.getElementById("clock");

function tick() {
  clock.textContent = new Date().toLocaleTimeString();
}

tick();
setInterval(tick, 1000);
