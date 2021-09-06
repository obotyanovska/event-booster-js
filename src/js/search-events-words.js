import EventApiService from './EventApiService';
import { refs } from './refs';
import { renderEventsList } from './render-events-list';

const eventApiService = new EventApiService();

refs.searchForm.addEventListener('submit', onSearchFormSubmit);

function onSearchFormSubmit(e) {
  e.preventDefault();

  const query = e.target.elements.search.value;
  const normalizedQuery = query.toLowerCase().trim();
  eventApiService.searchQuery = normalizedQuery;

  eventApiService.getEventsByKeyword().then(renderEventsList);
}
