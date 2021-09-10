import EventApiService from './service/EventApiService';
import { refs } from './utils/refs';
import { renderEventsList } from './components/render-events-list';
import { startSpinner, stopSpinner } from './components/spinner';
const eventApiService = new EventApiService();

window.addEventListener('DOMContentLoaded', startPageRender);

function startPageRender() {
  startSpinner();
  eventApiService
    .getRandomEvents()
    .then(events => {
      renderEventsList(events);
      stopSpinner();
    })
    .catch(error => console.log(error));
}
