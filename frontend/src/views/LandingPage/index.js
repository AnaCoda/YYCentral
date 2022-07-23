import React from "react";
import styles from "./LandingPage.module.scss";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { IoMapSharp } from "react-icons/io5";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useHistory } from "react-router-dom";
import mapImage from "../../assets/mapImage.png";

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
                        <button onClick={() => history.push("/nav")}>
                            <IoMapSharp className={styles["btn-icon"]} />
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

            <img src={mapImage} alt="map" className={styles["map-img"]} />
        </div>
    );
}
