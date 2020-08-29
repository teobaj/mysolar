import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios'
import { Dialog, Slide, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.dark,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        background: 'linear-gradient(90deg, rgba(29,140,248,1) 0%, rgba(63,50,244,1) 100%);'
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})


export default function SignUp() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isSuccess, setIsSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);

    const signup = async (e) => {
        e.preventDefault();
        let response = await axios.post('/signup', {
            'email': email,
            'password': password
        });

        if (response && response.status === 200) {
            setIsSuccess(true);
        } else {
            setOpenError(true);
        }

    }

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
        </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>


                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                        {/* <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid> */}
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={(e) => signup(e)}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
              </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            {/* <Box mt={5}>
                <Copyright />
            </Box> */}

            <Dialog open={openError} TransitionComponent={Transition} keepMounted onClose={() => setOpenError(false)} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
                <DialogTitle id="alert-dialog-slide-title">{"User already found"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        User already exitst or use a stronger password
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={() => setOpenError(false)}>Try Again</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
            <Dialog open={isSuccess} TransitionComponent={Transition} keepMounted onClose={() => setIsSuccess(false)} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
                <DialogTitle id="alert-dialog-slide-title">{"Success!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Your accout has been created successfully.
                        Would you like to login?
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={() => setIsSuccess(false)}>Cancel</Button>
                        <Link href="/login">
                            <Button onClick={() => setIsSuccess(false)}>Login </Button>
                        </Link>

                    </DialogActions>

                </DialogContent>
            </Dialog>
        </Container>
    );
}