// Loader effect for the website
window.addEventListener('DOMContentLoaded', () => {
  const loader = document.createElement('div');
  loader.className = 'site-loader';
  loader.innerHTML = `
    <div class="loader-content">
      <div class="loader-logo">Advait <span>Rege</span></div>
      <div class="loader-bar">
        <div class="loader-bar-inner"></div>
      </div>
    </div>
  `;
  document.body.appendChild(loader);
  setTimeout(() => {
    loader.classList.add('hide');
    setTimeout(() => loader.remove(), 700);
  }, 1800);
});
