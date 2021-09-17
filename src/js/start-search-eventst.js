import EventApiService from './service/EventApiService';
import { pagination } from './components/pagination';
import { renderEventsList } from './components/render-events-list';
import { startSpinner, stopSpinner } from './components/spinner';
import { saveToLocalStorage, clearLocalStorage } from './utils/local-storage';
import { scrollToEventsPage } from './utils/scrolling-func';

const eventApiService = new EventApiService();

window.addEventListener('DOMContentLoaded', startPageRender);

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
    .then(() => {
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
    });
}
