import React, { useEffect, useState, Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import sunny from '../assets/sunny.jpg';
import cloudy from '../assets/cloudy.jpg';
import thunderstorm from '../assets/thunderstorm.jpg';

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
        // minWidth: 335,
        // maxHeight: 500,
        minHeight: 380,
    },
});

const getDate = (seconds) => {
    let t = new Date(1970, 0, 1);
    t.setSeconds(seconds);
    return t;
}

const PanelCard = (props) => {
    const { panel, getWeatherByCity, notify, getLastWeekData } = props;
    const [weather, setWeather] = useState('');

    const initWeather = async () => {
        let response = await getWeatherByCity(panel.city);
        setWeather(response);
    }

    const findLastReport = () => {
        if (panel && panel.reports && Array.isArray(panel.reports) && panel.reports.length !== 0) {
            panel.reports.sort((a, b) => (b.id - a.id))
        } else {
            notify(`Panel with id: ${panel.id} has no reports this week`, "warning")
        }
        console.log(panel)
    }

    const checkPanelHealth = () => {
        panel && panel.reports && Array.isArray && panel.reports.length !== 0 && panel.reports[0] !== undefined && weather && weather.weather && weather.weather[0].main === 'Clear' && (panel.peakVoltage * panel.peakCurrent * 0.5 > panel.reports[0].current * panel.reports[0].voltage) && notify(`Panel #${panel.id} is not working properly!`, "Warning");
    }

    useEffect(() => {
        initWeather();
        findLastReport();
        checkPanelHealth();
    }, [])

    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                {weather && weather.weather && weather.weather[0].main === 'Clear' && <CardMedia
                    component="img"
                    alt="weather"
                    height="140"
                    image={sunny}
                    title="Contemplative Reptile"
                />}
                {weather && weather.weather && weather.weather[0].main === 'Clouds' && <CardMedia
                    component="img"
                    alt="weather"
                    height="140"
                    image={cloudy}
                    title="Contemplative Reptile"
                />}
                {weather && weather.weather && weather.weather[0].main === 'Thunderstorm' && <CardMedia
                    component="img"
                    alt="weather"
                    height="140"
                    image={thunderstorm}
                    title="Contemplative Reptile"
                />}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Panel #{panel.id}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {weather && weather.weather !== undefined && `Weather: ${weather.weather[0].main}`}
                        <br />
                        Location: {panel.city}
                        <br />
                        {panel && panel.reports && Array.isArray(panel.reports) && panel.reports.length !== 0 &&
                            <Fragment>
                                {`Current: ${panel.reports[0].current} A`}
                                <br />
                                {`Voltage: ${panel.reports[0].voltage} V`}
                            </Fragment>
                        }
                        <br />
                        {weather && weather.main !== undefined && `Temperature: ${Math.floor(weather.main.temp - 273.15)} °C`}
                        <br />
                        {weather && weather.main !== undefined && `Humidity: ${weather.main.humidity} % `}


                    </Typography>
                    {/* <Typography>
                    </Typography> */}

                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={() => getLastWeekData(panel.id)}>
                    Last week reports
        </Button>
            </CardActions>
        </Card>
    );
}

export default PanelCard
