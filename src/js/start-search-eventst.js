import EventApiService from './service/EventApiService';
import { refs } from './utils/refs';
import { renderEventsList } from './components/render-events-list';

const eventApiService = new EventApiService();

window.addEventListener('DOMContentLoaded', startPageRender);

function startPageRender() {
  eventApiService.getRandomEvents().then(renderEventsList);
}
