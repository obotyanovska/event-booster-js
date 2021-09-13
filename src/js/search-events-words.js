import EventApiService from './service/EventApiService';
import Pagination from 'tui-pagination';
import { options } from './components/pagination';
import { refs } from './utils/refs';
import { renderEventsList } from './components/render-events-list';
import { startSpinner, stopSpinner } from './components/spinner';

const eventApiService = new EventApiService();

refs.searchForm.addEventListener('submit', onSearchFormSubmit);

function onSearchFormSubmit(e) {
  e.preventDefault();

  startSpinner();

  const query = e.target.elements.search.value;
  const normalizedQuery = query.toLowerCase().trim();
  eventApiService.searchQuery = normalizedQuery;

  eventApiService
    .getEventsByKeyWord()
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
        eventApiService.getEventsByKeyWord().then(data => {
          renderEventsList(data);
          stopSpinner();
        });
      });
    })
    .catch(error => console.log(error));
  //
  // .finally(refs.searchForm.reset());
  // });
}
