document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const container = document.getElementById("nebula-bg");
  container.appendChild(canvas);

  let stars = [];
  let w, h;

  function resizeCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  for (let i = 0; i < 150; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      radius: Math.random() * 1.2,
      alpha: 0.1 + Math.random() * 0.4,
      speed: 0.1 + Math.random() * 0.4
    });
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);
    stars.forEach((star) => {
      star.y += star.speed;
      if (star.y > h) star.y = 0;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = `rgba(0, 255, 160, ${star.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }

  animate();
});
