import React from "react";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import styles from "./LandingPage.module.scss";
import MapIcon from "@mui/icons-material/Map";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useHistory } from "react-router-dom";
import mapImage from "../../assets/mapImage.png";
import pinkGraphic from "../../assets/pink_header.svg";

export default function LandingPage() {
    let history = useHistory();

    return (
        <div className={styles["landing-page"]}>
            <div className={styles.header}>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <div className={styles.header__content}>
                    <h1>YYCentral</h1>
                    <p className={styles["sub-title"]}>
                        The all-in-one web app to help you get around Calgary
                    </p>
                    <div className={styles.btns}>
                        <button onClick={() => history.push("/app")}>
                            <MapIcon
                                sx={{ fontSize: 50 }}
                                className={styles["btn-icon"]}
                            />
                            Map
                        </button>
                        <button onClick={() => history.push("/login")}>
                            <PersonOutlineIcon
                                sx={{ fontSize: 50 }}
                                className={styles["btn-icon"]}
                            />
                            Login/Signup
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles["header-graphic"]}>
                <img
                    src={pinkGraphic}
                    className={styles["pink-img"]}
                    alt="pink design graphic"
                />
                <img src={mapImage} className={styles["map-img"]} alt="map" />
            </div>
        </div>
    );
}
