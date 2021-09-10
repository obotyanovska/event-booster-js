const saveToLocalStorage = value => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem('events', serializedValue);
  } catch (err) {
    console.error('Set state error: ', err);
  }
};

const loadFromLocalStorage = key => {
  try {
    const serializedValue = localStorage.getItem(key);

    return serializedState === null ? undefined : JSON.parse(serializedValue);
  } catch (err) {
    console.error('Get state error: ', err);
  }
};

function clearLocalStorage() {
  localStorage.clear();
}

export { saveToLocalStorage, loadFromLocalStorage, clearLocalStorage };
