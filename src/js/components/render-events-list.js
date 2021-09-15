import eventsListTpl from './../../templates/events-list-tpl.hbs';
import { refs } from './../utils/refs';

export function renderEventsList(events) {
  const eventsCards = eventsListTpl(events);
  refs.pageBodyEvents.innerHTML = eventsCards;
}
