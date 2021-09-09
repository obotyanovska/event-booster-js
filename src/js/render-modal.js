import modalTpl from './../templates/modalTpl.hbs';
import { refs } from './refs';

export function renderModal(event) {
  const modal = modalTpl(event[0]);
  refs.backdrop.innerHTML = modal;
}
