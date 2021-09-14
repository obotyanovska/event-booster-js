import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast/dist/js/iziToast.min.js';

export function notificationError(
  title = 'OOPS!',
  message = 'No results found. Please, enter a new request.',
) {
  iziToast.show({
    title,
    message,
    messageSize: '14px',
    theme: 'dark',
    color: '#DC56C5',
    position: 'bottomRight',
    closeOnEscape: true,
    closeOnClick: true,
  });
}
