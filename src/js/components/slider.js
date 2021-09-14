import Glide, { Breakpoints } from '@glidejs/glide';
import { refs } from '../utils/refs';
import EventApiService from './../service/EventApiService';
import SliderCardTpl from './../../templates/slider-card-tpl.hbs';

const eventApiService = new EventApiService();

const glide = new Glide('.glide', {
  type: 'carousel',
  perView: 4,
  startAt: 0,
  autoplay: 4000,
  focusAt: 'center',
  breakpoints: {
    1199: {
      perView: 3,
    },
    767: {
      perView: 2,
    },
  },
});

eventApiService
  .getRandomEvents()
  .then(response => {
    refs.slider.innerHTML = SliderCardTpl(response);
    glide.mount();
  })
  .catch(err => {
    console.log(err);
  });
