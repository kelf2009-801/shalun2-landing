/**
 * Интерактивная демонстрация передачи.
 *
 * Зачем: главное действие рации — «нажал и говоришь». Пока человек не нажал
 * сам, это остаётся обещанием. Здесь он держит кнопку и видит, как меняется
 * состояние: подпись, цвет, волна, счётчик, маркеры в списке.
 *
 * Что важно:
 * - микрофон НЕ используется, звук не передаётся. Это имитация интерфейса,
 *   и подпись об этом стоит рядом с демонстрацией;
 * - в покое не крутится ни одной анимации: волна оживает только во время
 *   передачи, иначе телефон греется зря;
 * - при системной настройке «уменьшить движение» остаются цвет, подпись и
 *   счётчик, но без волн и пульсаций.
 */

(function () {
  // Берём именно блок демонстрации, а не секцию: у секции свой id для
  // якоря навигации, и состояния вешаются на внутренний контейнер.
  const root = document.querySelector('.demo');
  if (!root) return;

  const ptt = root.querySelector('.demo__ptt');
  const wave = root.querySelector('.demo__wave');
  const label = root.querySelector('.demo__label');
  const hint = root.querySelector('.demo__hint');
  const timerValue = root.querySelector('.demo__timer b');

  if (!ptt || !wave) return;

  // ---- Волна: столбики строятся один раз, дальше только переключаем класс ----
  // Высоты заданы списком, а не случайно: при повторной передаче картинка
  // та же, поэтому волна читается как сигнал, а не как шум.
  const HEIGHTS = [
    8, 14, 22, 32, 20, 28, 16, 34, 24, 30, 12, 26, 36, 18, 30, 22, 32, 14, 24,
    10, 18, 28, 20, 12, 26, 16, 8,
  ];

  HEIGHTS.forEach(function (h, i) {
    const bar = document.createElement('span');
    bar.className = 'demo__bar';
    bar.style.setProperty('--i', String(i));
    bar.style.setProperty('--h', h + 'px');
    wave.append(bar);
  });

  // ---- Состояние ----
  let live = false;
  let startedAt = 0;
  let ticker = null;

  function formatDuration(ms) {
    const total = Math.max(0, Math.floor(ms / 1000));
    return (
      Math.floor(total / 60) + ':' + String(total % 60).padStart(2, '0')
    );
  }

  function setLive(on) {
    if (live === on) return;
    live = on;

    root.classList.toggle('is-live', on);
    ptt.setAttribute('aria-pressed', String(on));

    if (on) {
      startedAt = Date.now();
      if (label) label.textContent = 'Передача';
      if (hint) hint.textContent = 'Микрофон включён — говорите';
      if (timerValue) timerValue.textContent = '0:00';

      // Счётчик живёт только во время передачи.
      ticker = window.setInterval(function () {
        if (timerValue) {
          timerValue.textContent = formatDuration(Date.now() - startedAt);
        }
      }, 200);
    } else {
      if (ticker) {
        window.clearInterval(ticker);
        ticker = null;
      }
      if (label) label.textContent = 'Эфир свободен';
      if (hint) hint.textContent = 'Нажмите и удерживайте';
      if (timerValue) timerValue.textContent = '0:00';
    }
  }

  // ---- Указатель: удержание ----
  ptt.addEventListener('pointerdown', function (e) {
    // preventDefault нужен, чтобы долгое нажатие на телефоне не открывало
    // контекстное меню и не начинало выделение текста.
    e.preventDefault();
    if (ptt.setPointerCapture) {
      try {
        ptt.setPointerCapture(e.pointerId);
      } catch (_) {
        /* не все браузеры дают захват — не критично */
      }
    }
    setLive(true);
  });

  ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (name) {
    ptt.addEventListener(name, function () {
      setLive(false);
    });
  });

  // Отпускание за пределами кнопки тоже должно останавливать передачу.
  window.addEventListener('pointerup', function () {
    if (live) setLive(false);
  });

  // ---- Клавиатура ----
  // Удержание клавишей недоступно части людей, поэтому Space и Enter
  // работают как переключатель: первое нажатие включает, второе выключает.
  ptt.addEventListener('keydown', function (e) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      setLive(!live);
    }
    if (e.key === 'Escape' && live) setLive(false);
  });

  // Уход со вкладки не должен оставлять работающий таймер.
  document.addEventListener('visibilitychange', function () {
    if (document.hidden && live) setLive(false);
  });
})();
