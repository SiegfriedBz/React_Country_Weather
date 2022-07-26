const Country = (props) => {
    const { selectedCountry: country, capitalWeather: weather } = props

    if(!country) return null

    return (
        <div className="card w-100">
            <div className="card-body">
                <h3 className="card-title">{country.name.common}</h3>
                <div className="d-flex flex-column justify-content-center">
                    <h4 className="card-text d-flex justify-content-center">Capital - {country.capital[0]}</h4>
                    <div className="d-flex justify-content-center">
                        {weather && weather.map(data => {
                            return (
                                <div key={data.day} className="d-flex flex-column align-items-center">
                                    <div className="fs-5">{data.day}</div>
                                    <img src={`https://openweathermap.org/img/wn/${data.iconId}@2x.png`} ></img>
                                    <div className="fs-6">{data.temp}°C</div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="d-flex justify-content-center">
                        <img 
                            src={country.flags.png} 
                            className="img-thumbnail"
                            style={{width: "350px"}} 
                            alt="country flag"
                        ></img>
                    </div>
                    <div className="d-flex justify-content-center">
                        <a className="btn btn-primary" href={country.maps.googleMaps} target="_blank" >Google Map</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Country
