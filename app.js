const departure = new Date('2026-12-01T21:35:00+01:00');
const now = new Date();
const days = Math.max(0, Math.ceil((departure - now) / 86400000));
document.querySelector('#countdown').textContent = days;
window.addEventListener('load', () => setTimeout(() => document.querySelector('#intro').classList.add('hide'), 2600));
