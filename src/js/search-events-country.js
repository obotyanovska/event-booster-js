import EventApiService from './service/EventApiService';
import Pagination from 'tui-pagination';
import { options } from './components/pagination';
import { refs } from './utils/refs';
import { renderEventsList } from './components/render-events-list';
import { startSpinner, stopSpinner } from './components/spinner';

const eventApiService = new EventApiService();

refs.formSelectCountry.addEventListener('change', onSearchByCountry);

export default function onSearchByCountry(e) {
  const searchCountry = e.target.value;
  eventApiService.countryCode = searchCountry;
  startSpinner();

  eventApiService
    .getEventsByCountry()
    .then(data => {
      renderEventsList(data);
      stopSpinner();
      return data;
    })
    .then(data => {
      const pagination = new Pagination('pagination', options);
      const totalItems = eventApiService.totalElements;
      pagination.reset(totalItems);

      pagination.on('afterMove', function (eventData) {
        startSpinner();
        eventApiService.page = eventData.page - 1;
        eventApiService.getEventsByCountry().then(data => {
          renderEventsList(data);
          stopSpinner();
        });
      });
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
