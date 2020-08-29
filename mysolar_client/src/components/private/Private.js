import React, { useState } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Link,
} from "react-router-dom";
import Dashboard from './Dashboard.js/Dashboard';
import MyAppBar from './MyAppBar';
import MyMenu from './MyMenu';
import Panel from './Panel.js/Panel';
import { Button } from '@material-ui/core';
import Axios from 'axios';
import Weather from './Weather/Weather';
import weatherApiKey from './Keys';

const pageNotFound = () => (
    <div style={{ textAlign: "center", height: "100vh", paddingTop: "4rem" }}>
        <h3>404</h3>
        <h4>It's seems like the resource you are looking for doesn't exits</h4>
        <Link to="/">
            <Button contained>Go Back</Button>
        </Link>
    </div>
)

export const Private = (props) => {

    const [currentPage, setCurrentPage] = useState('Dashboard');
    const [openMenu, setOpenMenu] = useState(false);
    

    const getWeatherByCity = async (city) => {
        let response = await Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}`).catch(err => console.log(err));

        if (response && response.status === 200) {
            return response.data;
        } else {
            return null;
        }

    }

    const toggleMenu = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpenMenu(open);
    };
    return (

        <div>
            <Router>
                <MyAppBar title={currentPage} setOpenMenu={setOpenMenu} openMenu={openMenu} />
                <MyMenu open={openMenu} toggleMenu={toggleMenu} setCurrentPage={setCurrentPage} {...props} />
                <Route path="/login">
                    <Dashboard getWeatherByCity={getWeatherByCity} weatherApiKey={weatherApiKey} toggleMenu={toggleMenu} {...props} />
                    {/* <Redirect to="/" /> */}
                </Route>
                <Route exact path="/">
                    <Dashboard getWeatherByCity={getWeatherByCity} weatherApiKey={weatherApiKey} toggleMenu={toggleMenu} {...props} />
                </Route>
                <Route path="/panels">
                    <Panel toggleMenu={toggleMenu} {...props} />
                </Route>
                <Route path="/weather" >
                    <Weather getWeatherByCity={getWeatherByCity} />
                </Route>
            </Router>
        </div>
    )
}
