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
