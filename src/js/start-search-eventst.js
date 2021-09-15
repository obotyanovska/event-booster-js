import EventApiService from './service/EventApiService';
import Pagination from 'tui-pagination';
import { options } from './components/pagination';
import { renderEventsList } from './components/render-events-list';
import { startSpinner, stopSpinner } from './components/spinner';
import { saveToLocalStorage, clearLocalStorage } from './utils/local-storage';

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
    .then(data => {
      const pagination = new Pagination('pagination', options);
      const totalItems = eventApiService.totalElements;
      pagination.reset(totalItems);

      pagination.on('afterMove', function (eventData) {
        startSpinner();
        eventApiService.page = eventData.page - 1;
        eventApiService.getRandomEvents().then(data => {
          renderEventsList(data);
          stopSpinner();
          clearLocalStorage();
          saveToLocalStorage(data);
        });
      });
    })
    .catch(error => {
      notificationError('Error', `${error}`);
      stopSpinner();
    });
}
