import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
var debounce = require('lodash.debounce');

const searchInp = document.querySelector('#search-box')
const countryList = document.querySelector('.country-list')
const countryInfo = document.querySelector('.country-info')

const DEBOUNCE_DELAY = 1000;

searchInp.addEventListener('input', debounce(firstStep, DEBOUNCE_DELAY))

function firstStep(ev) {
    let countryName = ev.target.value.trim()
    let URL = `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,flags,languages,population`
    console.log(countryName)
    if (countryName === '') {
        return
    }
    fetchCountries(URL)
        .then((countries) => {
            console.log(countries)
            if (countries.length > 10) {
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
            } if (countries.length >= 2 && countries.length < 10) {
                const listMarkup = countries.map((country) => {
                    return `<li class= "country-list__item">
                    <img class= "listSvg" src= "${country.flags.svg}"></img>
                    <p class ="listText">${country.name.common}</p>
                    </li>`
                }).join('')
                countryList.innerHTML = listMarkup
                countryInfo.innerHTML = ''
            } if (countries.length === 1) {
                const markup = countries.map((country) => {
                    return `<div class ="country-info__title">
                    <img class= "listSvg" src= "${country.flags.svg}"></img>
                    <h2>${country.name.common}</h2>
                    </div>
                    <ul class = "country-info__list">
                    <li class = "country-info__item"><h3>Capital:</h3><p>${country.capital}</p></li>
                    <li class = "country-info__item"><h3>Population:</h3><p>${country.population}</p></li>
                    <li class = "country-info__item"><h3>Languages:</h3><p>${Object.values(country.languages).join()}</p></i>
                    </ul>`
                }).join('')
                countryList.innerHTML = ""
                countryInfo.innerHTML = markup
            }
        })
        .catch((error) => Notiflix.Notify.failure("Oops, there is no country with that name"))
}
