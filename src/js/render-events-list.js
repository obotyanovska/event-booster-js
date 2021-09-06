import eventsList from './../templates/events-list.hbs';
import { refs } from './refs';

export function renderEventsList(events) {
  const eventsCards = eventsList(events);
  refs.pageBody.innerHTML = eventsCards;
}
