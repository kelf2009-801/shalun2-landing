const toggle = document.querySelector('#theme');
function applyTheme(light) {
  document.documentElement.dataset.theme = light ? 'light' : 'dark';
  toggle.textContent = light ? 'Тёмная тема' : 'Светлая тема';
  toggle.setAttribute('aria-label', toggle.textContent);
}
let selected;
try { selected = localStorage.getItem('shalun-promo-theme'); } catch (_) {}
applyTheme(selected === 'light');
toggle.addEventListener('click', () => {
  const light = document.documentElement.dataset.theme !== 'light';
  applyTheme(light);
  try { localStorage.setItem('shalun-promo-theme', light ? 'light' : 'dark'); } catch (_) {}
});
