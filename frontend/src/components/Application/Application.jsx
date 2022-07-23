import Card from "../Card/Card";
import { DisplayMapComponent } from "../../DisplayMapComponent";
import Event from "../Event/Event";
import NavBar from "../NavBar/NavBar";
import React from 'react';
import { selectEvent } from "../../redux/reducers/appSlice";
import styles from "./Application.module.scss";
import { useSelector } from "react-redux";

export default function Application() {

    const event = useSelector(selectEvent);

    return (
        <div className={styles.application}>
            <div className={styles.overlay}>
                <NavBar/>
                <div className={styles.card__container}>
                    {
                        event &&
                        <Card title="Event">
                            <Event event={event}/>
                        </Card>
                    }
                </div>
            </div>
            <DisplayMapComponent/>
        </div>
    );
}