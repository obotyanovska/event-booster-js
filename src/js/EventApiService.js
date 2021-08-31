const axios = require('axios');
const API_KEY = 'soKuDyMtrw2ZES78RDbbnvyZwVVeZjGa';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';

export default class EventApiService {
  constructor() {
    this.searchQuery = null;
  }

  // getEvents() {
  //   return axios
  //     .get(`${BASE_URL}events.json?keyword='concert'&apikey=${API_KEY}`)
  //     .then(resp => console.log(resp));
  // }

  getEventById() {
    return axios
      .get(`${BASE_URL}events.json?id=${id}&apikey=${API_KEY}`)
      .then(resp => console.log(resp));
  }

  getEventsRandom() {
    return axios
      .get(
        `${BASE_URL}events.json?size=20&page=${page}&sort=random&apikey=${API_KEY}`,
      )
      .then(resp => console.log(resp));
  }

  getEventsByCountry() {
    return axios
      .get(
        `${BASE_URL}events.json?size=20&page=${page}&countryCode=${countryCode}&apikey=${API_KEY}`,
      )
      .then(resp => console.log(resp));
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
