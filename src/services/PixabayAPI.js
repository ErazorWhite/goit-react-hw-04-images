import axios from 'axios';
import { Notify } from 'notiflix';

const pixabayApi = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '36098087-1a56f41df652eefc24b37e33b',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  },
});

export const getPicturesByQuery = async (query, page, per_page) => {
  const params = {
    q: query,
    page,
    per_page,
  };

  try {
    const { data } = await pixabayApi.get('/', { params });
    return data;
  } catch (e) {
    Notify.failure('error');
  }
};