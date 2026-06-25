const btn = document.getElementById("clickBtn");
const count = document.getElementById("count");
let clicks = 0;

btn.addEventListener("click", () => {
  clicks += 1;
  count.textContent = `Clicks: ${clicks}`;
});
