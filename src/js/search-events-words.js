import EventApiService from './service/EventApiService';
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
    .then(events => {
      renderEventsList(events);
      stopSpinner();
    })
    .catch(error => console.log(error));
  //
  // .finally(refs.searchForm.reset());
  // });
}
