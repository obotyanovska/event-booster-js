import modalTpl from './../../templates/modal-tpl.hbs';
import { refs } from './../utils/refs';

export function renderModal(event) {
  const modal = modalTpl(event);
  refs.backdrop.innerHTML = modal;
}
