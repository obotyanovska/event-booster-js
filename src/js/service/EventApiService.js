import { notificationError } from '../components/notification';

const API_KEY = 'soKuDyMtrw2ZES78RDbbnvyZwVVeZjGa';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';

export default class EventApiService {
  constructor() {
    this.searchQuery = null;
    this.countryCode = null;
    this.page = 0;
    this.size = 20;
    this.totalElements = null;
    this.totalPages = null;
    this.id = null;
    this.genreName = null;
  }

  goFetch(url) {
    return fetch(url)
      .then(response => {
        // if (!response.ok) {
        //   throw new Error();
        // }
        return response.json();
      })
      .then(({ page, _embedded }) => {
        this.totalElements = page.totalElements;
        this.totalPages = page.totalPages;

        if (_embedded) {
          return _embedded.events.map(this.normalizeEventObj);
        }

        return [];
      })
      .catch(error => {
        notificationError('Error', `${error}`, '#ff2b3d');
      });
  }

  getEventsByQuery() {
    return this.goFetch(
      `${BASE_URL}events.json?page=${this.page}&size=${this.size}&keyword=${this.searchQuery}&countryCode=${this.countryCode}&apikey=${API_KEY}`,
    );
  }

  getRandomEvents() {
    return this.goFetch(
      `${BASE_URL}events.json?page=${this.page}&size=${this.size}&sort=random&apikey=${API_KEY}`,
    );
  }

  getEventsByGenre() {
    return this.goFetch(
      `${BASE_URL}events.json?size=${this.size}&page=${this.page}&classificationName=${this.genreName}&apikey=${API_KEY}`,
    );
  }

  // getEventById() {
  //   return this.goFetch(
  //     `${BASE_URL}events.json?id=${this.id}&apikey=${API_KEY}`,
  //   );
  // }

  normalizeEventObj(obj) {
    const image = obj.images
      .filter(image => image.width === 640 && image.height === 427)
      .map(image => image.url);

    obj.posterUrl = image[0];

    return obj;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
