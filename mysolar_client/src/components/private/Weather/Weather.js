import React, { useEffect, useState } from 'react'
import { TextField, Button, Typography } from '@material-ui/core';

const Weather = (props) => {

    const [currentWeather, setCurrentWeather] = useState('');
    const [city, setCity] = useState('');

    const getWeather = async (e) => {
        e.preventDefault();
        let w = await props.getWeatherByCity(city);
        setCurrentWeather(w);
    }

    return (
        <div style={{ textAlign: "center", margin: "auto", paddingTop: "2rem" }}>
            <form>
                <div >
                    <TextField id="city" label="City" margin="dense" defaultValue={city} autoFocus onChange={(e) => setCity(e.target.value)} />
                </div>
                <div>
                    <Button type="submit"
                        variant="contained"
                        color="primary"
                        style={{
                            margin: "1rem",
                            background: 'linear-gradient(90deg, rgba(29,140,248,1) 0%, rgba(63,50,244,1) 100%)'
                        }}
                        onClick={(e) => getWeather(e)}
                    >Check Weather</Button>
                </div>
            </form>

            {currentWeather && currentWeather.weather !== undefined &&
                <div>
                    <Typography>
                        Temperature: {Math.floor(currentWeather.main.temp - 273.15)} °C
                    <br />
                    Feels like: {Math.floor(currentWeather.main.feels_like - 273.15)} °C
                    <br />
                    Humidity: {Math.floor(currentWeather.main.humidity)} %
                    <br />
                    Description: {currentWeather.weather[0].description}
                        <br />
                    Wind Speed: {currentWeather.wind.speed} m/s
                    <br />
                    Cloudiness: {currentWeather.clouds.all} %
                    </Typography>
                </div>
            }

        </div>
    )
}

export default Weather
