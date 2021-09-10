import EventApiService from './service/EventApiService';
import { refs } from './utils/refs';
import { renderEventsList } from './components/render-events-list';

const eventApiService = new EventApiService();

refs.formSelectCountry.addEventListener('change', onSearchByCountry);

export default function onSearchByCountry(e) {
  const searchCountry = e.target.value;
  eventApiService.countryCode = searchCountry;

  eventApiService
    .getEventsByCountry()
    .then(events => {
      renderEventsList(events);
      stopSpinner();
    })
    .catch(error => console.log(error));
  // if (savedEvents === null) {
  //   eventApiService.getEventsByCountry().then(renderEventsList);
  // } else {
  //   const filteredByCountry = savedEvents.filter(
  //     item => item.local === searchCountry,
  //   );
  //   console.log(filteredByCountry);
  // renderEventsList(filteredByCountry);
  // }
}
