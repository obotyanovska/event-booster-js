import EventApiService from './service/EventApiService';
import Pagination from 'tui-pagination';
import { options } from './components/pagination';
import { renderEventsList } from './components/render-events-list';
import { startSpinner, stopSpinner } from './components/spinner';
import { saveToLocalStorage, clearLocalStorage } from './utils/local-storage';
import { scrollToEventsPage } from './utils/scrolling-func';

const eventApiService = new EventApiService();

function startPageRender() {
  startSpinner();
  eventApiService
    .getRandomEvents()
    .then(data => {
      renderEventsList(data);
      stopSpinner();
      saveToLocalStorage(data);
      return data;
    })
    .then(data => {
      const pagination = new Pagination('pagination', options);
      const totalItems = eventApiService.totalElements;
      pagination.reset(totalItems);

      pagination.on('afterMove', function (eventData) {
        startSpinner();
        eventApiService.page = eventData.page - 1;
        eventApiService.getRandomEvents().then(data => {
          renderEventsList(data);
          scrollToEventsPage();
          stopSpinner();
          clearLocalStorage();
          saveToLocalStorage(data);
        });
      });
    })
    .catch(error => {
      notificationError();
      stopSpinner();
    });
}

window.addEventListener('DOMContentLoaded', startPageRender);
