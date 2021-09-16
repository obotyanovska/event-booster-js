import { refs } from './../utils/refs';

window.onload = function () {
  refs.body.classList.add('loader-is-hidden');
  window.setTimeout(function () {
    refs.body.classList.add('loaded');
    refs.body.classList.remove('loader-is-hidden');
  }, 500);
};
