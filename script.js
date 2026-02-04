// Screen navigation
function goToScreen(num) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(`screen${num}`).classList.add("active");
}

// Floating hearts
const heartsContainer = document.querySelector(".hearts");
setInterval(() => {
  const heart = document.createElement("span");
  heart.textContent = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 5 + Math.random() * 5 + "s";
  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 8000);
}, 300);

// No button logic: show fake "Are you sure?" screen
const noBtn = document.getElementById("noBtn");
noBtn.addEventListener("mouseover", () => {
  const x = Math.random() * 200 - 100;
  const y = Math.random() * 200 - 100;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
});
noBtn.addEventListener("click", () => {
  goToScreen("2b");
  noBtn.style.transform = "translate(0,0)";
});

// Yes button click
document.getElementById("yesBtn").addEventListener("click", () => {
  goToScreen(3);
  startConfetti();
});

// Confetti
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let confetti = [];
function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.addEventListener("resize", resize);
resize();

function startConfetti() {
  confetti = Array.from({ length: 150 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 6 + 2,
    d: Math.random() * 5 + 2,
    color: `hsl(${Math.random() * 360}, 100%, 70%)`
  }));
  animateConfetti();
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach(c => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    ctx.fillStyle = c.color;
    ctx.fill();
    c.y += c.d;
    if (c.y > canvas.height) c.y = -10;
  });
  requestAnimationFrame(animateConfetti);
}
