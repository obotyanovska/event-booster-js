import EventApiService from './EventApiService';
import { refs } from './refs';
import { renderEventsList } from './render-events-list';

const eventApiService = new EventApiService();

refs.formSelectCountry.addEventListener('change', onSearchByCountry);

function onSearchByCountry(e) {
  const searchCountry = e.target.value;
  eventApiService.countryCode = searchCountry;

  eventApiService.getEventsByCountry().then(renderEventsList);
}
