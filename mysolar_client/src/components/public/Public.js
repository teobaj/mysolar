import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from "react-router-dom";
import LandingPage from './LandingPage/LandingPage';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';


export const Public = (props) => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <LandingPage />
                </Route>
                <Route path="/login">
                    <Login setApiKey={props.setApiKey} setIsLogged={props.setIsLogged} setUser={props.setUser} />
                </Route>
                <Route path="/signup">
                    <SignUp />
                </Route>
                <Route path="" component={LandingPage} />
            </Switch>
        </Router >
    )
}
