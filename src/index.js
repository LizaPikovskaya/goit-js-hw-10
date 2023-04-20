import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';
import { createMarkUpForOneCountry, createMarkup } from './js/createMarkup';
const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
inputEl.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));



function onInputSearch(event) {
  const value = event.target.value;

  if (value.trim()) {
    fetchCountries(value.toLowerCase())
      .then(data => {
        if (data.length > 10) {
          Notify.failure(
            'Too many matches found. Please enter a more specific name.');
          countryList.innerHTML = '';
          return;
        } else if (data.length >= 2 && data.length <= 10) {
          countryList.innerHTML = createMarkup(data);
        } else if (data.length === 1) {
          countryList.innerHTML = createMarkUpForOneCountry(data);
        }
      })
      .catch(error =>
        Notify.failure('Oops, there is no country with that name')
      )
  }
}

