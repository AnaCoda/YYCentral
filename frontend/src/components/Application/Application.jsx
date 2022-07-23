import { DisplayMapComponent } from "../../DisplayMapComponent";
import NavBar from "../NavBar/NavBar";
import React from 'react';
import styles from "./Application.module.scss";

export default function Application() {
  return (
    <div className={styles.Application}>
        <NavBar/>
        <DisplayMapComponent/>
    </div>
  )
}
