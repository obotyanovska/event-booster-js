import { refs } from './refs';

export const scrollToEventsPage = function () {
  window.scrollTo({
    top: 705,
    behavior: 'smooth',
  });
};

export const scrollingModal = function () {
  refs.backdrop.scrollTo({
    top: 0,
    behavior: 'auto',
  });
};
