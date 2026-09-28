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
