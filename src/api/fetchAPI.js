import axios from 'axios';


export class PixabayApi {
  #BASE_URL = 'https://pixabay.com';
  #API_KEY = '30018207-f47008a7d6e426100d6765bad';

  constructor() {
    this.page = null;
    this.searchQuery = '';
    this.per_page = 12;
  }
  
  fetchPhotosByQuery() {
    const searchParams = {
      q: this.searchQuery,
      page: this.page,
      per_page: this.per_page,
      image_type: 'photo',
      safesearch: true,
      orientation: 'horizontal',
      key: this.#API_KEY,
    };
    
    return axios.get(`${this.#BASE_URL}/api/`, { params: searchParams });
  }
  
}

// const pixaBayApi = axios.create({
//   baseURL: 'https://pixabay.com/',
// });

// export const getFetchApi = async ({ page = 1, searchQuerry = 'yelow' }) => {
//   const data = await pixaBayApi.get('api/', {
//     params: {
//       key: '30018207-f47008a7d6e426100d6765bad',
//       page: page,
//       q: searchQuerry,
//       image_type: 'photo',
//       orientation: 'horizontal',
//       per_page: 12,
//     },
//   });
//   console.log(data);
//   return data;
// };