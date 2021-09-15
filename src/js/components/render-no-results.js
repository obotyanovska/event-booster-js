import { refs } from '../utils/refs';

function renderNoResults() {
  refs.pageBodyEvents.innerHTML =
    '<p class="page-body__no-results">SORRY.</br> NO RESULTS FOUND</p>';
}

export default renderNoResults;
