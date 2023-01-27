
export function createUlMarkup(countries) {
    return countries.map((country) => {
                    return `<li class= "country-list__item">
                    <img class= "listSvg" src= "${country.flags.svg}"></img>
                    <p class ="listText">${country.name.common}</p>
                    </li>`}).join('')
}

                
export function createCountryMarkup(countries) {
    return countries.map((country) => {
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
}