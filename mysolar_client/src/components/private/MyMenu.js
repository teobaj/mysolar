import React from 'react'
import { Drawer, IconButton, Divider, List, ListItem, ListItemIcon, makeStyles, useTheme } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ListItemText from '@material-ui/core/ListItemText';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import logoReact from '../public/assets/reactIcon.png'
import logoSpring from '../public/assets/springio-icon.svg'
import { BrowserRouter as Router, Link } from 'react-router-dom';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

const drawerWidth = 240;
const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});


const MyMenu = (props) => {
    const classes = useStyles();
    const theme = useTheme();


    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={props.open}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
                <img src={logoReact} alt="react" style={{ width: "2rem", marginTop: "1rem", marginRight: "1rem", marginLeft: "1rem" }} />
                <img src={logoSpring} alt="spring" style={{ width: "2rem" }} />
            </div>
            <Divider />

            <List onClick={props.toggleMenu(false)} onKeyDown={props.toggleMenu(false)}>
                <Link to="/panels">
                    <ListItem button onClick={() => props.setCurrentPage("Panels")}>
                        <ListItemIcon><WbSunnyIcon /></ListItemIcon>
                        <ListItemText primary={"Panels"} />
                    </ListItem>
                </Link>
                <Link to="/">
                    <ListItem button onClick={() => props.setCurrentPage("Dashboard")}>
                        <ListItemIcon><WbSunnyIcon /></ListItemIcon>
                        <ListItemText primary={"Dashboard"} />
                    </ListItem>
                </Link>
                <Link to="/weather">
                    <ListItem button onClick={() => props.setCurrentPage("Weather")}>
                        <ListItemIcon><WbSunnyIcon /></ListItemIcon>
                        <ListItemText primary={"Weather"} />
                    </ListItem>
                </Link>
            </List>
            <Divider />
            <ListItem button onClick={() => props.setIsLogged(false)}>
                <ListItemIcon><MeetingRoomIcon /></ListItemIcon>
                <ListItemText primary={"Logout"} />
            </ListItem>
        </Drawer>
    )
}

export default MyMenu
