import Event, { Restaurant } from "../Event/Event";
import React, { useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";

import Card from "../Card/Card";
import { DisplayMapComponent } from "../../DisplayMapComponent";
import Events from "../../views/Events";
import FilterBar from "components/FilterBar";
import NavBar from "../NavBar/NavBar";
import { selectPopup } from "../../redux/reducers/appSlice";
import styles from "./Application.module.scss";
import { useSelector } from "react-redux";

export default function Application() {
    const popup = useSelector(selectPopup);
    const location = useLocation();
    const appLocation = location.pathname.split("/");

    const componentTypes = {
        event: <Event event={popup} />,
        restaurant: <Restaurant restaurant={popup} />,
    };

    return (
        <div className={styles.application}>
            <div
                className={styles.overlay}
                style={{
                    width: appLocation[2] ? "0%" : "100vw",
                }}
            >
                <NavBar />
                <div className={styles.card__container}>
                    {popup && (
                        <Card title={popup.type}>
                            {componentTypes[popup.type]}
                        </Card>
                    )}
                </div>
                {!appLocation[2] && <FilterBar />}
            </div>
            <Switch>
                <Route path="/app/events" component={Events} />
                <Route
                    path="/app"
                    exact
                    component={DisplayMapComponent}
                    index
                />
            </Switch>
        </div>
    );
}
