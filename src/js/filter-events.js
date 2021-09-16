import EventApiService from './service/EventApiService';
import Pagination from 'tui-pagination';
import { options, deletePagination } from './components/pagination';
import { refs } from './utils/refs';
import { renderEventsList } from './components/render-events-list';
import { startSpinner, stopSpinner } from './components/spinner';
import { notificationError } from './components/notification';
import { saveToLocalStorage, clearLocalStorage } from './utils/local-storage';
import renderNoResults from './components/render-no-results';
import { scrollToEventsPage } from './utils/scrolling-func';

const eventApiService = new EventApiService();
refs.categoryFilter.addEventListener('click', onFilterClick);

function onFilterClick(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }

  startSpinner();

  eventApiService.genreName = e.target.dataset.name;

  eventApiService
    .getEventsByGenre()
    .then(data => {
      if (data.length < 1) {
        renderNoResults();
        stopSpinner();
        return;
      }
      renderEventsList(data);
      scrollToEventsPage();
      stopSpinner();
      saveToLocalStorage(data);
      return data;
    })
    .then(data => {
      const pagination = new Pagination('pagination', options);
      const totalItems = eventApiService.totalElements;
      pagination.reset(totalItems);

      pagination.on('afterMove', function (eventData) {
        startSpinner();
        eventApiService.page = eventData.page - 1;
        eventApiService.getEventsByGenre().then(data => {
          renderEventsList(data);
          scrollToEventsPage();
          stopSpinner();
          clearLocalStorage();
          saveToLocalStorage(data);
        });
      });
    })
    .catch(error => {
      notificationError('Error', `${error}`);
      stopSpinner();
    })
    .finally(refs.searchForm.reset());
}

// const filter = e.target.dataset.name;
// const savedEvents = loadFromLocalStorage();

// const filteredEvents =
//   filter === 'All'
//     ? savedEvents
//     : savedEvents.filter(
//         event =>
//           event.classifications !== undefined &&
//           event.classifications[0].segment.name === filter,
//       );

// if (filteredEvents.length < 1) {
//   renderNoResults();
//   return;
// }
// renderEventsList(filteredEvents);

// console.log(filteredEvents);
// const searchCountry = e.target.value;
// eventApiService.countryCode = searchCountry;

// startSpinner();

// eventApiService
//   .getEventsByCountry()
//   .then(data => {
//     renderEventsList(data);
//     stopSpinner();
//     saveToLocalStorage(data);
//     return data;
//   })
//   .then(data => {
//     const pagination = new Pagination('pagination', options);
//     const totalItems = eventApiService.totalElements;
//     pagination.reset(totalItems);

//     pagination.on('afterMove', function (eventData) {
//       startSpinner();
//       eventApiService.page = eventData.page - 1;
//       eventApiService.getEventsByCountry().then(data => {
//         renderEventsList(data);
//         stopSpinner();
//         clearLocalStorage();
//         saveToLocalStorage(data);
//       });
//     });
//   })
//   .catch(error => {
//     notificationError('Error', `${error}`);
//     stopSpinner();
//   });
// }
