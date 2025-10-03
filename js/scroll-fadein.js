// Simple fade-in scroll effect for sections
window.addEventListener('DOMContentLoaded', () => {
  const revealEls = document.querySelectorAll('.section, .project-card, .skill-card');
  const revealOnScroll = () => {
    const trigger = window.innerHeight * 0.92;
    revealEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < trigger) {
        el.classList.add('scrolled-in');
      }
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();
});
