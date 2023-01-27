export function fetchCountries(countryName) {

    let URL = `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,flags,languages,population`
    return fetch(URL).then((response) => {
        if (!response.ok) {
            throw new Error(response.status)
        }return response.json()
    })
}    
