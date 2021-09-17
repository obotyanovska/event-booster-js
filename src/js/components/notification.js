import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast/dist/js/iziToast.min.js';

export function notificationError() {
  iziToast.show({
    title: 'OOPS!',
    message: 'Something went wrong. Please try again.',
    messageSize: '14px',
    theme: 'dark',
    color: '#DC56C5',
    position: 'bottomRight',
    closeOnEscape: true,
    closeOnClick: true,
  });
}
