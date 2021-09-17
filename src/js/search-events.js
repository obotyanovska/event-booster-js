import EventApiService from './service/EventApiService';
import { normalizeText } from './utils/normalize-text-func';
import Pagination from 'tui-pagination';
import { options, clearPagination } from './components/pagination';
import { refs } from './utils/refs';
import { renderEventsList } from './components/render-events-list';
import { startSpinner, stopSpinner } from './components/spinner';
import { notificationError } from './components/notification';
import { saveToLocalStorage, clearLocalStorage } from './utils/local-storage';
import { scrollToEventsPage } from './utils/scrolling-func';
import renderNoResults from './components/render-no-results';

const eventApiService = new EventApiService();

refs.searchForm.addEventListener('submit', onSearchFormSubmit);

function onSearchFormSubmit(e) {
  e.preventDefault();

  startSpinner();

  const query = e.currentTarget.elements.search.value;
  eventApiService.searchQuery = normalizeText(query);
  const countryCode = e.currentTarget.elements.country.value;
  eventApiService.countryCode = countryCode;
  eventApiService.resetPage();

  eventApiService
    .getEventsByQuery()
    .then(data => {
      if (data.length < 1) {
        renderNoResults();
        stopSpinner();
        scrollToEventsPage();
        return;
      }
      renderEventsList(data);
      scrollToEventsPage();
      stopSpinner();
      saveToLocalStorage(data);
      return data;
    })
    .then(() => {
      const pagination = new Pagination('pagination', options);
      const totalItems = eventApiService.totalElements;
      pagination.reset(totalItems);

      pagination.on('afterMove', function (eventData) {
        startSpinner();
        eventApiService.page = eventData.page - 1;
        eventApiService.getRandomEvents().then(data => {
          renderEventsList(data);
          stopSpinner();
          scrollToEventsPage();
          clearLocalStorage();
          saveToLocalStorage(data);
        });
      });
    })
    .catch(() => {
      notificationError();
      stopSpinner();
    })
    .finally(refs.searchForm.reset());
}
