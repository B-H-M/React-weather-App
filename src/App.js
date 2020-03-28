import React from 'react';
import './App.css';
import Form from './app_component/form.component';
import "weather-icons/css/weather-icons.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from "./app_component/weather.component";


// Api call api.openweathermap.org/data/2.5/weather?q=London,uk
const API_key = "7705c33ce020cd1f8f59d4f33f4ab3ab";

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      city: undefined,
      contry: undefined,
      icon: undefined,
      main: undefined,
      temp_min: undefined,
      temp_max: undefined,
      celsius: undefined,
      description: "",
      error: false
    };


    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmostphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }


  calCelsius = (temp) => {
    return Math.floor(temp - 273.15)
  }

  get_WeatherIcon = (icons, rangeId) => {
    switch(true){
      case rangeId >= 200 && rangeId <= 232:
        this.setState({
          icon: this.weatherIcon.Thunderstorm
        });
        break;

      case rangeId >= 300 && rangeId <= 321:
        this.setState({
          icon: this.weatherIcon.Drizzle
        });
        break;

      case rangeId >= 500 && rangeId <= 531:
        this.setState({
          icon: this.weatherIcon.Rain
        });
        break;

      case rangeId >= 600 && rangeId <= 622:
        this.setState({
          icon: this.weatherIcon.Snow
        });
        break;

      case rangeId >= 701 && rangeId <= 781:
        this.setState({
          icon: this.weatherIcon.Atmostphere
        });
        break;

      case rangeId === 800:
        this.setState({
          icon: this.weatherIcon.Clear
        });
        break;

      case rangeId >= 800 && rangeId <= 804:
        this.setState({
          icon: this.weatherIcon.Clouds
        });
        break;

      default:  
        this.setState({
          icon: this.weatherIcon.Clouds
        });
    }
  }

getWeather = async (e) => {

  e.preventDefault();

  const city = e.target.elements.city.value;
  const country = e.target.elements.country.value;

  if(city && country) {
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);

    const res = await api_call.json();

    console.log(res);

    this.setState({
      // city: res.name,
      // country: res.sys.country,
      city: `${res.name}, ${res.sys.country}`,
      celsius: this.calCelsius(res.main.temp),
      temp_min: this.calCelsius(res.main.temp_min),
      temp_max: this.calCelsius(res.main.temp_max),
      description: res.weather[0].description,
      error: false
    });
    
    this.get_WeatherIcon(this.weatherIcon, res.weather[0].id)
  }
  else{
    this.setState({error: true})
  }
}  

  render(){
    return (
      <div className="App">
        <Form loadweather={this.getWeather} error={this.state.error} />
        <Weather 
        city={this.state.city} 
        country={this.state.country}
        temp_celsius={this.state.celsius}
        temp_max={this.state.temp_max}
        temp_min={this.state.temp_min}
        description={this.state.description}
        weatherIcon={this.state.icon} />
      </div>
    );
  }
}

export default App;
