const departure = new Date('2026-12-01T21:35:00+01:00');
const days = Math.max(0, Math.ceil((departure - new Date()) / 86400000));
const countdown = document.querySelector('#countdown');
if (countdown) countdown.textContent = days;

window.addEventListener('load', () => {
  window.setTimeout(() => document.querySelector('#intro')?.classList.add('hide'), 1800);
});

const views = [...document.querySelectorAll('.view')];
const controls = [...document.querySelectorAll('[data-view]')];
function show(id) {
  if (!document.getElementById(id)) return;
  views.forEach(v => v.classList.toggle('active', v.id === id));
  document.querySelectorAll('.dock button').forEach(b => b.classList.toggle('active', b.dataset.view === id));
  window.scrollTo({ top: 0, behavior: 'smooth' });
  history.replaceState(null, '', `#${id}`);
  localStorage.setItem('patricJourney:lastView', id);
}
controls.forEach(b => b.addEventListener('click', () => show(b.dataset.view)));
const requested = location.hash.slice(1);
const saved = localStorage.getItem('patricJourney:lastView');
show(requested || saved || 'home');

const composer = document.querySelector('.composer');
const input = composer?.querySelector('input');
const send = composer?.querySelector('button');
function sendMessage() {
  const text = input?.value.trim();
  if (!text) return;
  const chat = document.querySelector('.chat');
  const user = document.createElement('div');
  user.className = 'message user';
  user.innerHTML = `<p>${text.replace(/[<>]/g, '')}</p>`;
  chat?.appendChild(user);
  input.value = '';
  window.setTimeout(() => {
    const reply = document.createElement('div');
    reply.className = 'message concierge';
    reply.innerHTML = '<small>YOUR CONCIERGE</small><p>I have added this to your journey notes. The live concierge connection will be activated in the next release.</p>';
    chat?.appendChild(reply);
    reply.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 450);
}
send?.addEventListener('click', sendMessage);
input?.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });

document.querySelector('.avatar')?.addEventListener('click', () => {
  alert('Patric Journey\nJourneyOS v2 · Live Build');
});
