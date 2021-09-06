import EventApiService from './EventApiService';
import { refs } from './refs';
import { renderEventsList } from './render-events-list';

const eventApiService = new EventApiService();

window.addEventListener('DOMContentLoaded', startPageRender);

function startPageRender() {
  eventApiService.getRandomEvents().then(renderEventsList);
}
