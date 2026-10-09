document.addEventListener('DOMContentLoaded', () => {
  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
  const videos = [...document.querySelectorAll('video[data-autoplay]')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const syncVideoMotion = () => {
    videos.forEach(video => {
      if (reducedMotion.matches) {
        video.autoplay = false;
        video.removeAttribute('autoplay');
        video.pause();
      } else {
        video.autoplay = true;
        video.play().catch(() => {});
      }
    });
  };
  videos.forEach(video => video.addEventListener('loadeddata', syncVideoMotion, { once: true }));
  window.addEventListener('load', syncVideoMotion, { once: true });
  setTimeout(syncVideoMotion, 0);
  syncVideoMotion();
  reducedMotion.addEventListener?.('change', syncVideoMotion);
});
