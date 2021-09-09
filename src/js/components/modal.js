import EventApiService from './../EventApiService';
import { refs } from './../refs';
import { renderModal } from '../render-modal';
import svg from './../../images/symbol-defs.svg';

const eventApiService = new EventApiService();

refs.pageBody.addEventListener('click', onEventOpenClick);
refs.backdrop.addEventListener('click', onBtnClose);
refs.backdrop.addEventListener('click', onBackdropCloseClick);

function onEventOpenClick(e) {
  if (!e.target.closest('.js-event-card')) {
    return;
  }
  eventApiService.id = e.target.closest('.js-event-card').dataset.id;

  eventApiService
    .getEventById()
    .then(response => {
      const event = response;
      event[0].svg = svg;
      return event;
    })
    .then(renderModal);
  onModalOpen();
}

function onModalOpen(e) {
  refs.backdrop.classList.remove('is-hidden');
  window.addEventListener('keydown', onEscapePress);
}

function onModalClose(e) {
  refs.backdrop.classList.add('is-hidden');
  window.removeEventListener('keydown', onEscapePress);
}

function onBtnClose(e) {
  if (!e.target.closest('.js-btn-close')) {
    return;
  }
  onModalClose();
}

function onBackdropCloseClick(e) {
  if (e.target !== e.currentTarget) {
    return;
  }
  onModalClose();
}

function onEscapePress(e) {
  if (e.code !== 'Escape') {
    return;
  }
  onModalClose();
}
