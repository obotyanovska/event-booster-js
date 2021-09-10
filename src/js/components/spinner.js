import { Spinner } from 'spin.js';
import { refs } from '../utils/refs';

let opts = {
  lines: 18, // The number of lines to draw
  length: 3, // The length of each line
  width: 9, // The line thickness
  radius: 98, // The radius of the inner circle
  scale: 1.2, // Scales overall size of the spinner
  corners: 1, // Corner roundness (0..1)
  speed: 1.2, // Rounds per second
  rotate: 32, // The rotation offset
  animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#dc98da', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  top: '48%', // Top position relative to parent
  left: '49%', // Left position relative to parent
  shadow: '0 0 1px transparent', // Box-shadow for the lines
  zIndex: 2000000000, // The z-index (defaults to 2e9)
  className: 'spinner', // The CSS class to assign to the spinner
  position: 'absolute', // Element positioning
};

let spinner = new Spinner(opts);
let runningSpinner = null;

export const startSpinner = () => {
  runningSpinner = spinner.spin(refs.spinner);
};

export const stopSpinner = () => {
  runningSpinner.stop();
  runningSpinner = null;
};
