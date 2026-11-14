/**
 * Поведение страницы: мобильное меню и появление секций.
 *
 * Появление секций сделано без IntersectionObserver сознательно.
 * ПОЧЕМУ: в части окружений (встроенные webview, старые оболочки, некоторые
 * режимы headless-браузеров) наблюдатель не доставляет события вообще, и
 * тогда блоки с нулевой прозрачностью остаются невидимыми навсегда.
 * Проверено прямым тестом: 0 срабатываний при видимом элементе.
 *
 * Здесь проверка позиции по прокрутке: она работает везде, стоит один
 * слушатель и отключается, когда всё показано. Скрытие включается только
 * при живом JS (класс .js-motion ставится в <head>), поэтому без скрипта
 * страница показывает весь текст сразу.
 */

(function () {
  // ---- Мобильное меню ----
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('siteNav');

  if (toggle && nav) {
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
  }

  // ---- Появление секций ----
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Группы, которые появляются. Внутри части групп элементы идут
  // по очереди: сетка из восьми возможностей не должна вспыхивать целиком.
  const GROUPS = [
    { sel: '.section__head' },
    { sel: '.facts__grid', children: '.fact' },
    { sel: '.steps', children: '.step' },
    { sel: '.features', children: '.feature' },
    { sel: '.screens', children: '.screen' },
    { sel: '.roles', children: '.role' },
    { sel: '.limits', children: '.limit' },
    { sel: '.install', children: '.install__step, .specs' },
    { sel: '.split' },
    { sel: '.demo' },
    { sel: '.cta__inner' },
  ];

  const targets = [];

  GROUPS.forEach(function (group) {
    document.querySelectorAll(group.sel).forEach(function (node) {
      // Ссылка на таблицу прав и пояснение под ней не анимируем отдельно:
      // они часть блока управления и появляются вместе с ним.
      if (group.children) {
        const kids = node.querySelectorAll(group.children);
        if (kids.length) {
          kids.forEach(function (kid, i) {
            kid.classList.add('reveal');
            kid.style.setProperty('--i', String(Math.min(i, 8)));
            targets.push(kid);
          });
          return;
        }
      }
      node.classList.add('reveal');
      targets.push(node);
    });
  });

  if (!targets.length) return;

  // При системной настройке «уменьшить движение» показываем всё сразу:
  // человек просил не двигать, а не «двигай помедленнее».
  if (reduceMotion.matches) {
    targets.forEach(function (el) {
      el.classList.add('is-in', 'is-done');
    });
    return;
  }

  let pending = targets.slice();

  function show(el) {
    el.classList.add('is-in');
    // Подсказку will-change снимаем после перехода: держать слой
    // в памяти незачем, когда движение закончилось.
    window.setTimeout(function () {
      el.classList.add('is-done');
    }, 900);
  }

  function check() {
    if (!pending.length) return;
    const limit = window.innerHeight * 0.92;
    const still = [];

    pending.forEach(function (el) {
      const rect = el.getBoundingClientRect();
      // Элемент выше линии видимости — показываем. Ниже — ждём прокрутки.
      if (rect.top < limit) show(el);
      else still.push(el);
    });

    pending = still;
    if (!pending.length) detach();
  }

  let frame = null;
  function onScroll() {
    if (frame) return;
    frame = window.requestAnimationFrame(function () {
      frame = null;
      check();
    });
  }

  function attach() {
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
  }

  function detach() {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
  }

  attach();
  // Первый проход — сразу: часть блоков уже в кадре при загрузке.
  check();
  // И ещё раз после шрифтов и картинок: они меняют высоту и сдвигают блоки.
  window.addEventListener('load', check, { once: true });

  // Страховка: если через 2.5 секунды ничего не показалось, снимаем
  // скрытие целиком. Лучше без анимации, чем с пустой страницей.
  window.setTimeout(function () {
    if (!document.querySelector('.reveal.is-in')) {
      document.documentElement.classList.remove('js-motion');
    }
  }, 2500);

  // Смена системной настройки на лету: показываем всё и больше не прячем.
  reduceMotion.addEventListener('change', function (e) {
    if (!e.matches) return;
    targets.forEach(function (el) {
      el.classList.add('is-in', 'is-done');
    });
    pending = [];
    detach();
  });
})();
