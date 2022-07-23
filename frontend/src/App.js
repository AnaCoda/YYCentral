import React, { useState } from 'react';
import {
    Redirect,
    Route,
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";

import LandingPage from "./views/LandingPage";
import NavBar from "./components/NavBar/NavBar";
import SignIn from './components/Login/Login';
import { DisplayMapComponent } from './DisplayMapComponent';
import styles from './App.module.scss';

function App() {
    return (
        <Router>
            <AppEntry />
        </Router>
    );
}

function AppEntry() {
    const [user, setUser] = useState(
        JSON.parse(sessionStorage.getItem("user") || "{}")
    );

    function updateUserInfo(userDetail) {
        setUser(userDetail);
        sessionStorage.setItem("user", JSON.stringify(userDetail));
        sessionStorage.setItem("loggedin", true);
    }

    // A wrapper for <Route> that redirects to the login
    // screen if you're not yet authenticated.
    function PrivateRoute({ children, ...rest }) {
        return (
            <Route
                {...rest}
                render={({ location }) =>
                    sessionStorage.getItem("loggedin") != null &&
                    sessionStorage.getItem("loggedin") ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location },
                            }}
                        />
                    )
                }
            />
        );
    }

   return (
      <section style={{height: "100vh"}}>
         <Switch>
            <Route path="/" component={LandingPage} exact />
            <Route path="/login">
               <SignIn updateUserInfo={updateUserInfo} />
            </Route>
            <Route path="/nav" component={NavBar} />
            <PrivateRoute path="/app*">
                <NavBar/>
               <DisplayMapComponent/>
            </PrivateRoute>
            
         </Switch>
      </section>
   );
}

export default App;
