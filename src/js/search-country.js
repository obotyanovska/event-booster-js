import eventsList from './../templates/events-list.hbs';
import EventApiService from './EventApiService';

const eventApiService = new EventApiService();
const debounce = require('lodash.debounce');

const refs = {
  searchForm: document.querySelector('.js-form'),
  formInput: document.querySelector('.js-input'),
  submitInput: document.querySelector('.js-input-btn'),
  pageBody: document.querySelector('.page-body'),
};

refs.searchForm.addEventListener('submit', onSearchFormSubmit);

function onSearchFormSubmit(e) {
  e.preventDefault();

  const query = e.target.elements.search.value;
  eventApiService.searchQuery = query;

  eventApiService.getEventsByKeyword().then(renderEventsList);
}

function renderEventsList(events) {
  const eventsCards = eventsList(events);
  refs.pageBody.innerHTML = eventsCards;
}
