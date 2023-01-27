import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import { createCountryMarkup, createUlMarkup } from './createMurkup';
var debounce = require('lodash.debounce');

const searchInp = document.querySelector('#search-box')
const countryList = document.querySelector('.country-list')
const countryInfo = document.querySelector('.country-info')

const DEBOUNCE_DELAY = 1000;

searchInp.addEventListener('input', debounce(startFind, DEBOUNCE_DELAY))

function startFind(ev) {
    let countryName = ev.target.value.trim()
    
    if (countryName === '') {
        countryList.innerHTML = ''
        countryInfo.innerHTML = ''
        return
    }
    fetchCountries(countryName)
        .then((countries) => {
            
            if (countries.length > 10) {
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
            } if (countries.length >= 2 && countries.length < 10) {
                const listMarkup = createUlMarkup(countries)
                countryList.innerHTML = listMarkup
                countryInfo.innerHTML = ''
            } if (countries.length === 1) {
                const countryMarkup = createCountryMarkup(countries)
                countryList.innerHTML = ""
                countryInfo.innerHTML = countryMarkup
            }
        })
        .catch((error) => Notiflix.Notify.failure("Oops, there is no country with that name"))
}
