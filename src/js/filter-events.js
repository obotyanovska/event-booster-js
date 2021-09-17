import { option, clearPagination } from './components/pagination';
import { refs } from './utils/refs';
import { renderEventsList } from './components/render-events-list';
import { loadFromLocalStorage } from './utils/local-storage';
import renderNoResults from './components/render-no-results';
import gsap from 'gsap';

// animation menu filter
var card = document.getElementById('activator');
var tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });

var toggle = false;

tl.to('.activator', {
  background: '#dc56c5',
  borderRadius: '50% 0 0 50%',
});
tl.to(
  'nav',
  {
    clipPath: 'ellipse(100% 100% at 50% 50%)',
  },
  '-=.5',
);
tl.to(
  'nav button',
  {
    opacity: 1,
    transform: 'translateX(0)',
    stagger: 0.05,
  },
  '-=.5',
);
tl.pause();

card.addEventListener('click', () => {
  toggle = !toggle;
  if (toggle ? tl.play() : tl.reverse());
});

// filtering logic

refs.categoryFilter.addEventListener('click', onFilterClick);

function onFilterClick(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }

  const filter = e.target.dataset.name;
  const savedEvents = loadFromLocalStorage();

  const filteredEvents =
    filter === 'All'
      ? savedEvents
      : savedEvents.filter(
          event =>
            event.classifications !== undefined &&
            event.classifications[0].segment.name === filter,
        );

  if (
    (filter === 'Arts & Theatre' ||
      filter === 'Sports' ||
      filter === 'Music' ||
      filter === 'Miscellaneous') &&
    !refs.paginationContainer.classList.contains('visually-hidden')
  ) {
    refs.paginationContainer.classList.add('visually-hidden');
  }

  if (
    filter === 'All' &&
    refs.paginationContainer.classList.contains('visually-hidden')
  ) {
    refs.paginationContainer.classList.remove('visually-hidden');
  }

  if (filteredEvents.length < 1) {
    renderNoResults();
    return;
  }
  renderEventsList(filteredEvents);
}
