import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery, PER_PAGE } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  refs,
} from './js/render-functions.js';

const form = document.getElementById('search-form');

let state = {
  query: '',
  page: 1,
  totalHits: 0,
  isLoading: false,
};

form.addEventListener('submit', onSearchSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearchSubmit(e) {
  e.preventDefault();
  const query = e.currentTarget.elements.search.value.trim();
  if (!query) {
    iziToast.info({ message: 'Введіть слово для пошуку!' });
    return;
  }

  state = { query, page: 1, totalHits: 0, isLoading: false };
  clearGallery();
  hideLoadMoreButton();
  await loadImages();
}

async function onLoadMore() {
  await loadImages(true);
}

async function loadImages(isLoadMore = false) {
  if (state.isLoading) return;
  state.isLoading = true;
  showLoader();

  try {
    const { totalHits, hits } = await getImagesByQuery(state.query, state.page);

    if (state.page === 1 && totalHits === 0) {
      hideLoadMoreButton();
      iziToast.warning({ message: 'Нічого не знайдено.' });
      return;
    }

    createGallery(hits);

    if (state.page === 1) {
      state.totalHits = totalHits;
      iziToast.success({ message: `Знайдено ${totalHits} зображень.` });
    }

    const shown = state.page * PER_PAGE;
    const noMore = shown >= state.totalHits || hits.length < PER_PAGE;

    if (noMore) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      showLoadMoreButton();
    }

    if (isLoadMore && hits.length) scrollSmoothly();
    state.page += 1;
  } catch (err) {
    console.error(err);
    iziToast.error({ message: 'Помилка запиту. Перевір ключ або мережу.' });
  } finally {
    hideLoader();
    state.isLoading = false;
  }
}

function scrollSmoothly() {
  const firstCard = refs.galleryEl.firstElementChild;
  if (!firstCard) return;
  const { height } = firstCard.getBoundingClientRect();
  window.scrollBy({ top: height * 2, behavior: 'smooth' });
}
