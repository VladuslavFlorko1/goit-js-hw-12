import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('load-more');
const loaderEl = document.getElementById('loader');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 200,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
<li class="photo-card">
  <a href="${largeImageURL}">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  </a>
  <div class="info">
    <div><b>Likes</b>${likes}</div>
    <div><b>Views</b>${views}</div>
    <div><b>Comments</b>${comments}</div>
    <div><b>Downloads</b>${downloads}</div>
  </div>
</li>`
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryEl.innerHTML = '';
}
export function showLoader() {
  loaderEl.classList.remove('is-hidden');
}
export function hideLoader() {
  loaderEl.classList.add('is-hidden');
}
export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('is-hidden');
}
export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('is-hidden');
}

export const refs = { galleryEl, loadMoreBtn };
