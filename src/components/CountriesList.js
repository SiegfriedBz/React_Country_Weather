const CountriesList = (props) => {

    const { selectedCountries, setSelectedCountry } = props

    return (
        selectedCountries.length > 10 ? 
            <span className="ms-2">Please be more specific to find a Country</span>
            : selectedCountries.length > 1 ? 
                <ul>
                    {selectedCountries && selectedCountries.map(country => {
                        return (
                            <li key={country.name.common}>
                                {country.name.common}
                                <button 
                                    onClick={() => setSelectedCountry(country)}
                                    className="btn btn-primary btn-sm m-2"
                                >Select
                                </button>
                            </li>
                        )
                    })}
                </ul>
            : null
    )
}

export default CountriesList
