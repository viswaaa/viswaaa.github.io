const thumbnails = [...document.querySelectorAll('.bts-thumb')];
let currentPhoto = 0;
function selectPhoto(index) {
 currentPhoto = (index + thumbnails.length) % thumbnails.length;
 const item = thumbnails[currentPhoto];
 const image = document.getElementById('bts-image');
 image.src = item.dataset.src;
 image.alt = item.dataset.caption;
 document.getElementById('bts-caption').textContent = item.dataset.caption;
 document.getElementById('bts-count').textContent = String(currentPhoto + 1).padStart(2, '0') + ' / ' + thumbnails.length;
 thumbnails.forEach((button, i) => button.setAttribute('aria-pressed', String(i === currentPhoto)));
}
thumbnails.forEach((button, index) => {
 button.addEventListener('click', () => selectPhoto(index));
 button.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
   event.preventDefault(); selectPhoto(currentPhoto + (event.key === 'ArrowRight' ? 1 : -1)); thumbnails[currentPhoto].focus({preventScroll:true});
  }
 });
});
document.getElementById('bts-prev').addEventListener('click', () => selectPhoto(currentPhoto - 1));
document.getElementById('bts-next').addEventListener('click', () => selectPhoto(currentPhoto + 1));
