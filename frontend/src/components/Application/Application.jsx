import { Route, Switch } from "react-router-dom";

import { DisplayMapComponent } from "../../DisplayMapComponent";
import Events from "../../views/Events";
import NavBar from "../NavBar/NavBar";
import React from "react";
import styles from "./Application.module.scss";

export default function Application() {
    return (
        <div className={styles.Application}>
            <NavBar />
            <Switch>
                <Route
                    path="/app"
                    exact
                    component={DisplayMapComponent}
                    index
                />
                <Route path="/app/events" component={Events} />
            </Switch>
        </div>
    );
}
