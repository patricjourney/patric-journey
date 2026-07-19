const tripDate = new Date('2026-12-01T21:35:00+01:00');
const timeline = [
  ['01 DEC','Zürich → Abu Dhabi','Etihad Airways · Business Class'],
  ['02 DEC','Arrival Bangkok','Divalux Resort & Spa · 2 nights'],
  ['04 DEC','Bangkok → Phu Quoc','Sun PhuQuoc Airways · 13:15'],
  ['04–12 DEC','Phu Quoc Island','WorldHotels Long Beach Resort · 8 nights'],
  ['12–17 DEC','Si Racha','Novotel Marina Sriracha · 5 nights'],
  ['17–23 DEC','Hua Hin','Putahracsa Hua Hin · 6 nights'],
  ['23–29 DEC','Bangkok','SKYVIEW Hotel Bangkok · Grand Suite'],
  ['29 DEC','Journey home','Bangkok → Abu Dhabi → Zürich']
];
const vault = [
  ['✈','Flights','4 confirmed segments'],['⌂','Hotels','5 confirmations'],['▣','Insurance','Active'],['⌁','Transfers','2 open items'],['▤','Receipts','All payments tracked'],['◈','Passport','Travel document ready']
];
function updateTime(){
  const now = new Date(); const diff = Math.max(0,tripDate-now); document.querySelector('#days').textContent=Math.ceil(diff/86400000);
  const h=now.getHours(); const greeting=h<12?'Good morning,':h<18?'Good afternoon,':'Good evening,';
  document.querySelector('#greeting').textContent=greeting; document.querySelector('#conciergeGreeting').textContent=`${greeting} Patric.`;
}
function fill(){
  document.querySelector('#timelinePreview').innerHTML=timeline.slice(2,6).map(x=>`<div class="timeline-row"><time>${x[0]}</time><div><b>${x[1]}</b><small>${x[2]}</small></div></div>`).join('');
  document.querySelector('#timelineFull').innerHTML=timeline.map(x=>`<article class="timeline-event"><time>${x[0]}</time><div class="rail"></div><div><h3>${x[1]}</h3><p>${x[2]}</p></div></article>`).join('');
  document.querySelector('#vaultGrid').innerHTML=vault.map(x=>`<article class="vault-item glass"><span>${x[0]}</span><h3>${x[1]}</h3><p>${x[2]}</p></article>`).join('');
}
function navigate(id){
  document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active',v.id===id));
  document.querySelectorAll('.bottom-nav button').forEach(b=>b.classList.toggle('active',b.dataset.view===id));
  scrollTo({top:0,behavior:'smooth'});
}
document.addEventListener('click',e=>{const b=e.target.closest('[data-view]'); if(b) navigate(b.dataset.view); const i=e.target.closest('.insight'); if(i) toast(i.querySelector('b').textContent+' opened');});
function toast(t){const el=document.querySelector('#toast');el.textContent=t;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2200)}
document.querySelector('#quickAsk').addEventListener('submit',e=>{e.preventDefault();const input=e.target.querySelector('input');if(input.value.trim())toast('Concierge is ready in the Concierge view');input.value='';navigate('concierge')});
document.querySelector('#chatForm').addEventListener('submit',e=>{e.preventDefault();const input=document.querySelector('#chatInput');const value=input.value.trim();if(!value)return;const m=document.querySelector('#messages');m.insertAdjacentHTML('beforeend',`<div class="message user">${value.replace(/[<>]/g,'')}</div>`);input.value='';setTimeout(()=>m.insertAdjacentHTML('beforeend','<div class="message assistant">I’ve noted that. For your current journey, all hotel nights are complete and the next practical step is arranging the two ground transfers.</div>'),500)});
document.querySelector('#soundBtn').addEventListener('click',e=>{e.currentTarget.classList.toggle('active');toast(e.currentTarget.classList.contains('active')?'Ambient mode on':'Ambient mode off')});
fill();updateTime();setInterval(updateTime,60000);
if('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(()=>{});
