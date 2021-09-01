const axios = require('axios');
const API_KEY = 'soKuDyMtrw2ZES78RDbbnvyZwVVeZjGa';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';

export default class EventApiService {
  constructor() {
    this.searchQuery = null;
    this.page = 0;
    this.size = 20;
    this.totalElements = null;
    this.totalPages = null;
  }

  getEventsByKeyword() {
    return fetch(
      `${BASE_URL}events.json?page=${this.page}&keyword=${this.searchQuery}&apikey=${API_KEY}`,
    )
      .then(response => {
        if (!response.ok) {
          throw new Error();
        }
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
        console.log(error);
      });
  }

  // getEventById() {
  //   return axios
  //     .get(`${BASE_URL}events.json?id=${id}&apikey=${API_KEY}`)
  //     .then(resp => console.log(resp));
  // }

  // getEventsRandom() {
  //   return axios
  //     .get(
  //       `${BASE_URL}events.json?size=20&page=${page}&sort=random&apikey=${API_KEY}`,
  //     )
  //     .then(resp => console.log(resp));
  // }

  // getEventsByCountry() {
  //   return axios
  //     .get(
  //       `${BASE_URL}events.json?size=20&page=${page}&countryCode=${countryCode}&apikey=${API_KEY}`,
  //     )
  //     .then(resp => console.log(resp));
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
