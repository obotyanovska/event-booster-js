import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast/dist/js/iziToast.min.js';

export function notificationError({
  title = 'OOPS!',
  message = 'Something went wrong. Please try again.',
  color = '#DC56C5',
}) {
  iziToast.show({
    title,
    message,
    messageSize: '14px',
    theme: 'dark',
    color,
    position: 'bottomRight',
    closeOnEscape: true,
    closeOnClick: true,
  });
}
