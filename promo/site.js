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

// Preserve invitations on the new landing; never navigate automatically.
const invite = new URLSearchParams(location.search).get('invite');
if (invite && invite.length <= 128 && /^[A-Za-z0-9_-]+$/.test(invite)) {
  const box = document.createElement('section');
  box.className = 'wrap';
  box.setAttribute('aria-label', 'Приглашение в канал');
  box.style.paddingTop = '24px';
  box.style.paddingBottom = '24px';
  const title = document.createElement('h2');
  title.style.fontSize = '28px';
  title.textContent = 'Вас пригласили в канал';
  const text = document.createElement('p');
  text.textContent = `Код приглашения: ${invite}. Установите рацию, затем откройте эту ссылку снова или введите код в приложении.`;
  const open = document.createElement('a');
  open.className = 'button';
  open.href = `shalun2://join/${encodeURIComponent(invite)}`;
  open.textContent = 'Открыть приглашение в рации';
  box.append(title, text, open);
  document.querySelector('main').prepend(box);
}
