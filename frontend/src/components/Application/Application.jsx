import Card from "../Card/Card";
import { DisplayMapComponent } from "../../DisplayMapComponent";
import Events from "../Events/Events";
import NavBar from "../NavBar/NavBar";
import React from 'react';
import styles from "./Application.module.scss";

export default function Application() {
  return (
    <div className={styles.application}>
        <div className={styles.overlay}>
            <NavBar/>
            <div className={styles.card__container}>
                <Card title="Events">
                    <Events/>
                </Card>
                <Card title="About">
                    Test
                </Card>
            </div>
        </div>
        <DisplayMapComponent/>
    </div>
  );
}