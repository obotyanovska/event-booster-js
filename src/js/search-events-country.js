import EventApiService from './service/EventApiService';
import { refs } from './utils/refs';
import { renderEventsList } from './components/render-events-list';

const eventApiService = new EventApiService();

refs.formSelectCountry.addEventListener('change', onSearchByCountry);

function onSearchByCountry(e) {
  const searchCountry = e.target.value;
  eventApiService.countryCode = searchCountry;

  eventApiService.getEventsByCountry().then(renderEventsList);
}
