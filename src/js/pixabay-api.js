import axios from 'axios';

const API_KEY = '52837655-6c21f27bf556d895abe6a0fd0';
const PER_PAGE = 15;

const api = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: PER_PAGE,
  },
});

export async function getImagesByQuery(query, page = 1) {
  const { data } = await api.get('', { params: { q: query, page } });
  return data;
}

export { PER_PAGE };
