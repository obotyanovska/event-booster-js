import EventApiService from './service/EventApiService';
import Pagination from 'tui-pagination';
import { options } from './components/pagination';
import { refs } from './utils/refs';
import { renderEventsList } from './components/render-events-list';
import { startSpinner, stopSpinner } from './components/spinner';

const eventApiService = new EventApiService();

window.addEventListener('DOMContentLoaded', startPageRender);

function startPageRender() {
  startSpinner();
  eventApiService
    .getRandomEvents()
    .then(data => {
      renderEventsList(data);
      stopSpinner();
      // // console.log(data);
      // console.log(data.map(item => item.classifications[0].segment.name));
      // // console.log(data.map(item => item.classifications[0].segment.segmentId));
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
        });
      });
    })
    .catch(error => {
      notificationError('Error', `${error}`, '#ff2b3d');
      stopSpinner();
    });
}
