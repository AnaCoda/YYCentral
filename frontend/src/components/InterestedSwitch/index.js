import React from "react";
import styles from "./InterestedSwitch.module.scss";

export default function InterestedSwitch({ onToggle, value }) {
    return (
        <div className={styles["interested-switch"]}>
            <span>Interested</span>
            <div
                className={
                    value
                        ? styles["switch-container-active"]
                        : styles["switch-container"]
                }
            >
                <div className={styles["switch-btn"]} onClick={onToggle}></div>
            </div>
        </div>
    );
}
