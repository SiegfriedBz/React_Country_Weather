import { useState, useEffect } from "react"
import NavBar from "./components/NavBar"
import CountriesList from "./components/CountriesList"
import Country from "./components/Country"


function App() {
  const [allCountries, setAllCountries] = useState([])
  const [userInput, setUserInput] = useState("")
  const [selectedCountries, setSelectedCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState("")
  const [capitalWeather, setCapitalWeather] = useState([])

  const COUNTRY_BASE_URL = "https://restcountries.com/v3.1"
  const OPEN_WEATHER_API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY

  useEffect(() => {
    fetchAllCountries()
  }, [])

  useEffect(() => {
    selectCountries()
  }, [ userInput ])

  useEffect(() => {
    if(selectedCountry) {
      fetchCapitalWeather()
    }
  }, [selectedCountry])

  const fetchAllCountries = async() => {
    try{
      const response = await fetch(`${COUNTRY_BASE_URL}/all`)
      if(response.status === 200) {
        const data = await response.json()
        setAllCountries(data)
      } else {
        throw Error(response.status)
      }
    } catch(error) {
      console.log(error)
    }
  }

  const selectCountries = () => {
    let filteredData = allCountries.filter(country => {
      return country.name.common.toLowerCase().includes(userInput.toLowerCase())
    })
    setSelectedCountries(filteredData)
  }

  const fetchCapitalWeather = async() => {
    console.log('fetch weather')
    const DAYS = ["Mon", "Tues", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const [lat, long] = selectedCountry.capitalInfo.latlng
    const OPEN_WEATHER_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&appid=53d920c29a5b6fe3c84ba2c5d37ab71d`
    const response = await fetch(OPEN_WEATHER_URL)
    const data = await response.json()

    let daysData = data.list.map(element => {
      return {
        temp: element.main.temp.toFixed(1),
        iconId: element.weather[0].icon,
        day: DAYS[new Date(element.dt *1000).getDay()]
      }
    })

    setCapitalWeather([daysData[0], daysData[7], daysData[15], daysData[23], daysData[31]])
  }

  console.log(selectedCountry)
  if(capitalWeather) {
    capitalWeather.map(w => {
      console.log(w)
    })
  }


  return (
    <>
      <NavBar 
        setUserInput={setUserInput}
      />
      <div className="container">
        <CountriesList 
          selectedCountries={selectedCountries}
          setSelectedCountry={setSelectedCountry}
        />
        {selectedCountry &&
          <Country 
            selectedCountry={selectedCountry}
            capitalWeather={capitalWeather}
            /> 
        }
      </div>
    </>
  );
}

export default App;
