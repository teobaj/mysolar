import React, { useEffect, useState } from 'react'
import MyAppBar from '../MyAppBar';
import axios from 'axios';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import PanelCard from './PanelCard';
import Grid from '@material-ui/core/Grid';


const Dashboard = (props) => {

    const { notify, getWeatherByCity, weatherApiKey } = props;

    const [lastWeekReports, setLastWeekReports] = useState([]);
    const [panels, setPanels] = useState([]);

    const getLastWeekData = async (pid) => {
        let response = await axios.get(`/lastweek/${pid}`, {
            headers: {
                "apiKey": props.user.apiKey
            }
        }).catch(e => console.log(e));

        if (response && response.status === 200) {
            setLastWeekReports(response.data)
        } else {
            notify("This panels has no previous records", "warning")

        }

    }
    // const data = props.user && props.user.panels.filter(panel => panel.id === 5)
    console.log(props);

    const getPanels = async (userId) => {
        let response = await axios.get(`/${userId}/panel`, {
            headers: {
                'apiKey': props.user.apiKey
            }
        }).catch(e => console.log(e));

        if (response && response.status === 200) {
            setPanels(response.data);
        }
    }

    useEffect(() => {
        notify("Welcome", 'success');
        getPanels(props.user.id);
        // getLastWeekData(props.user.panel[4])
    }, [])
    return (
        <div onClick={props.toggleMenu(false)} style={{ height: "100vh", padding: "1rem" }}>

            <Grid container spacing={2}>
                {panels && Array.isArray(panels) && Array.length !== 0 && panels.map(panel => (
                    <Grid key={panel.id} item xs={3}>
                        <PanelCard panel={panel} getWeatherByCity={getWeatherByCity} weatherApiKey={weatherApiKey} notify={notify} getLastWeekData={getLastWeekData} />
                    </Grid>
                ))}
            </Grid>
            {lastWeekReports && lastWeekReports.length !== 0 &&
                <div style={{ textAlign: "center", width: "100%", padding: "2rem" }}>
                    <LineChart width={1000} height={300} data={lastWeekReports} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="createdAt" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="current" stroke="#8884d8" />
                        <Line type="monotone" dataKey="voltage" stroke="#82ca9d" />

                    </LineChart>
                </div>
            }
        </div>
    )
}

export default Dashboard
