import EventApiService from './../service/EventApiService';
import { refs } from './../utils/refs';
import { renderModal } from './render-modal';
import svg from './../../images/symbol-defs.svg';
import { loadFromLocalStorage } from './../utils/local-storage';
import { scrollingModal } from './../utils/scrolling-func';

const eventApiService = new EventApiService();

refs.pageBodyEvents.addEventListener('click', onEventOpenClick);
refs.backdrop.addEventListener('click', onBtnClose);
refs.backdrop.addEventListener('click', onBackdropCloseClick);

function onEventOpenClick(e) {
  if (!e.target.closest('.js-event-card')) {
    return;
  }
  const id = e.target.closest('.js-event-card').dataset.id;
  const savedEvents = loadFromLocalStorage();
  const eventModal = savedEvents.find(evt => evt.id === id);
  eventModal.svg = svg;
  renderModal(eventModal);
  onModalOpen();
}

function onModalOpen(e) {
  refs.body.classList.add('modal-open');
  refs.backdrop.classList.remove('is-hidden');
  scrollingModal();
  window.addEventListener('keydown', onEscapePress);
}

function onModalClose(e) {
  refs.backdrop.classList.add('is-hidden');
  refs.body.classList.remove('modal-open');
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
