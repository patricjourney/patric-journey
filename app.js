const departure = new Date('2026-12-01T21:35:00+01:00');
const countdown = document.querySelector('#countdown');
function updateCountdown(){
  const days = Math.max(0, Math.ceil((departure - new Date()) / 86400000));
  if (countdown) countdown.textContent = days;
}
updateCountdown();

window.addEventListener('load', () => {
  const intro = document.querySelector('#intro');
  const seen = sessionStorage.getItem('patricJourney:introSeen');
  if (seen) intro?.classList.add('hide');
  else window.setTimeout(() => { intro?.classList.add('hide'); sessionStorage.setItem('patricJourney:introSeen','1'); }, 1500);
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
show(location.hash.slice(1) || localStorage.getItem('patricJourney:lastView') || 'home');

const chat = document.querySelector('#chat');
const composer = document.querySelector('.composer');
const input = composer?.querySelector('input');
const send = composer?.querySelector('button');
const safe = value => value.replace(/[<>]/g, '');
function conciergeReply(text){
  const lower = text.toLowerCase();
  if (lower.includes('sunset') || lower.includes('sonnenuntergang')) return 'For Phu Quoc, I would reserve a beachfront table south of Long Beach around 16:45. That gives you a calm arrival before Golden Hour.';
  if (lower.includes('transfer')) return 'The airport transfer is still open. I would choose a private car with flight monitoring and a fixed price.';
  if (lower.includes('budget') || lower.includes('kosten')) return "Your recorded budget is CHF 4'526.52, with THB 4'400 still open.";
  return 'I have added this to your journey notes. I will keep it visible as an open concierge item.';
}
function sendMessage() {
  const text = input?.value.trim();
  if (!text) return;
  const user = document.createElement('div');
  user.className = 'message user'; user.innerHTML = `<p>${safe(text)}</p>`; chat?.appendChild(user); input.value = '';
  window.setTimeout(() => {
    const reply = document.createElement('div');
    reply.className = 'message concierge'; reply.innerHTML = `<small>YOUR CONCIERGE</small><p>${conciergeReply(text)}</p>`; chat?.appendChild(reply); reply.scrollIntoView({ behavior:'smooth', block:'center' });
  }, 350);
}
send?.addEventListener('click', sendMessage);
input?.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(); });

const essentialBoxes = [...document.querySelectorAll('[data-essential]')];
const essentialCount = document.querySelector('#essentialCount');
function updateEssentials(){
  const done = essentialBoxes.filter(box => box.checked).length;
  essentialCount.textContent = `${done} / ${essentialBoxes.length} DONE`;
  localStorage.setItem('patricJourney:essentials', JSON.stringify(essentialBoxes.map(box => box.checked)));
}
const savedEssentials = JSON.parse(localStorage.getItem('patricJourney:essentials') || 'null');
if (Array.isArray(savedEssentials)) essentialBoxes.forEach((box,i) => { if (typeof savedEssentials[i] === 'boolean') box.checked = savedEssentials[i]; });
essentialBoxes.forEach(box => box.addEventListener('change', updateEssentials));
updateEssentials();

let deferredPrompt;
const installBtn = document.querySelector('#installBtn');
window.addEventListener('beforeinstallprompt', event => { event.preventDefault(); deferredPrompt = event; installBtn.hidden = false; });
installBtn?.addEventListener('click', async () => { if (!deferredPrompt) return; deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt = null; installBtn.hidden = true; });

if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
document.querySelector('.avatar')?.addEventListener('click', () => alert('Patric Journey\nJourneyOS 2.1 · Live Build'));
