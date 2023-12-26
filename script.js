// Kode efek kembang api warna-warni di sini

const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createFirework() {
  const x = Math.random() * canvas.width;
  const y = canvas.height;
  const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
  const particles = [];

  for (let i = 0; i < 100; i++) {
    particles.push({
      x,
      y,
      vx: random(-5, 5),
      vy: random(-15, -10),
      size: random(2, 4),
      color,
      alpha: 1,
      gravity: 0.1,
    });
  }

  return particles;
}

function drawFirework(particles) {
  particles.forEach((particle, index) => {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.globalAlpha = particle.alpha;
    ctx.fill();
    ctx.closePath();

    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.vy += particle.gravity;
    particle.alpha -= 0.01;

    if (particle.alpha <= 0) {
      particles.splice(index, 1);
    }
  });
}

const fireworks = [];

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (Math.random() < 0.03) {
    fireworks.push(createFirework());
  }

  fireworks.forEach((firework) => {
    drawFirework(firework);
  });

  requestAnimationFrame(animate);
}

animate();
