import eventsListTpl from './../../templates/events-list-tpl.hbs';
import { refs } from './../utils/refs';
// import { loadFromLocalStorage } from '../utils/local-storage';

export function renderEventsList(data) {
  // const firstInd = 0;
  // const lastInd = firstInd + 20;
  // const events = loadFromLocalStorage();
  // const data = events.slice(firstInd, lastInd);
  const eventsCards = eventsListTpl(data);
  refs.pageBodyEvents.innerHTML = eventsCards;
  // firstInd += 20;
}
