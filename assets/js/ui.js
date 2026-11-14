/**
 * Общая обвязка страницы: мобильное меню.
 *
 * Зачем отдельным файлом: это поведение страницы, а не демонстрации рации.
 * Смешивать их значит тащить логику PTT туда, где она не нужна.
 *
 * Появления секций по прокрутке здесь нет намеренно. Оно держалось на
 * IntersectionObserver, который в части окружений не доставляет события,
 * и тогда скрытый контент не показывался вообще. Контент важнее анимации.
 */

(function () {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('siteNav');

  if (!toggle || !nav) return;

  const setOpen = function (open) {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  };

  toggle.addEventListener('click', function () {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  // Ссылка в меню — это переход, а не режим: закрываем после клика.
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });

  // Клик вне меню закрывает его: иначе панель висит поверх контента.
  document.addEventListener('click', function (e) {
    if (!nav.classList.contains('is-open')) return;
    if (nav.contains(e.target) || toggle.contains(e.target)) return;
    setOpen(false);
  });
})();
