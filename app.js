const theme = document.querySelector('#theme');
function setTheme(light) {
 document.body.classList.toggle('light', light);
 theme.setAttribute('aria-label', light ? 'Switch to dark appearance' : 'Switch to light appearance');
 document.querySelector('meta[name="theme-color"]').content = light ? '#e8e9ec' : '#11151d';
}
try { setTheme(localStorage.getItem('portfolio-appearance') === 'light'); } catch {}
theme.addEventListener('click', () => {
 const light = !document.body.classList.contains('light'); setTheme(light);
 try { localStorage.setItem('portfolio-appearance', light ? 'light' : 'dark'); } catch {}
});
const dialog = document.querySelector('#film-dialog');

dialog.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if(event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });

const workTabs = [...document.querySelectorAll('[role="tab"]')];
function selectWorkTab(tab) {
 for (const item of workTabs) {
  const active = item === tab;
  item.setAttribute('aria-selected', String(active));
  item.tabIndex = active ? 0 : -1;
  document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
 }
}
workTabs.forEach((tab, index) => {
 tab.addEventListener('click', () => selectWorkTab(tab));
 tab.addEventListener('keydown', event => {
  let next;
  if (event.key === 'ArrowRight') next = (index + 1) % workTabs.length;
  if (event.key === 'ArrowLeft') next = (index + workTabs.length - 1) % workTabs.length;
  if (event.key === 'Home') next = 0;
  if (event.key === 'End') next = workTabs.length - 1;
  if (next !== undefined) { event.preventDefault(); selectWorkTab(workTabs[next]); workTabs[next].focus(); }
 });
});

for (const panel of document.querySelectorAll('.film-stack-panel')) {
 const cards = [...panel.querySelectorAll('.stack-card')];
 let selected = 0;
 function selectCard(index) {
  selected = (index + cards.length) % cards.length;
  const others = cards.filter((_, i) => i !== selected);
  for (const [i, card] of cards.entries()) {
   const depth = i === selected ? cards.length - 1 : others.indexOf(card);
   card.style.setProperty('--depth', depth);
   card.style.zIndex = depth + 1;
   card.dataset.depth = depth;
   card.setAttribute('aria-pressed', String(i === selected));
  }
  const active = cards[selected];
  panel.querySelector('.stack-description h3').textContent = active.dataset.title;
  panel.querySelector('.stack-description p').textContent = active.dataset.role;
  const camera = panel.querySelector('.selected-camera');
  camera.textContent = active.dataset.camera ? 'Shot on ' + active.dataset.camera : '';
  camera.hidden = !active.dataset.camera;
  const watch = panel.querySelector('.watch-film');
  const watchUrl = active.dataset.watch;
  watch.hidden = !watchUrl;
  if (watchUrl) watch.href = watchUrl;
  panel.querySelector('.watch-pending').hidden = active.dataset.film !== 'between' || Boolean(watchUrl);
  panel.querySelector('.stack-counter').textContent = String(selected + 1).padStart(2, '0') + ' / ' + String(cards.length).padStart(2, '0');
  const explore = panel.querySelector('.stack-credits');
  explore.hidden = !active.dataset.href;
  if (active.dataset.href) explore.href = active.dataset.href;
 }
 cards.forEach((card, index) => {
  card.addEventListener('click', () => {
   if (index === selected && card.dataset.href) { window.location.href = card.dataset.href; return; }
   selectCard(index);
  });
  card.addEventListener('keydown', event => {
   if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault(); selectCard(selected + (event.key === 'ArrowRight' ? 1 : -1)); cards[selected].focus({preventScroll:true});
   }
  });
 });
 panel.querySelector('.stack-prev').addEventListener('click', () => selectCard(selected - 1));
 panel.querySelector('.stack-next').addEventListener('click', () => selectCard(selected + 1));
}
