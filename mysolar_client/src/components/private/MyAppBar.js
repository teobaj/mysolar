import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    appbar: {
        background: "linear-gradient(90deg, rgba(29, 140, 248, 1) 0%, rgba(63, 50, 244, 1) 100%)",
    },
    icon: {
        background: "#fff",
    }
}));


const MyAppBar = (props) => {
    const classes = useStyles();


    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appbar}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => props.setOpenMenu(!props.openMenu)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {props.title}
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default MyAppBar
