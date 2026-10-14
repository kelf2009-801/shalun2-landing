const themeButton = document.querySelector('.theme-toggle');
function setTheme(dark) {
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  themeButton?.setAttribute('aria-pressed', String(dark));
  themeButton?.setAttribute('aria-label', dark ? 'Светлая тема' : 'Тёмная тема');
  if (themeButton) themeButton.textContent = dark ? 'Светлая тема' : 'Тёмная тема';
}
let stored;
try { stored = localStorage.getItem('shalun-site-theme'); } catch (_) {}
setTheme(stored ? stored === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches);
themeButton?.addEventListener('click', () => {
  const dark = document.documentElement.dataset.theme !== 'dark';
  setTheme(dark);
  try { localStorage.setItem('shalun-site-theme', dark ? 'dark' : 'light'); } catch (_) {}
});
const button = document.querySelector('#pulse');
let pulseTimer;
button?.addEventListener('click', () => {
  const stage = button.closest('.signal-stage');
  clearTimeout(pulseTimer);
  stage.classList.remove('active');
  requestAnimationFrame(() => stage.classList.add('active'));
  document.querySelector('#pulse-status').textContent = 'Волна отправлена. Это демонстрация, не голосовой эфир.';
  pulseTimer = setTimeout(() => stage.classList.remove('active'), 1700);
});
