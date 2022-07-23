import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LogoutIcon from "@mui/icons-material/Logout";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import React from "react";
import styles from "./NavBar.module.scss";

export default function NavBar() {
    return (
        <div className={styles.navbar__wrapper}>
            <div className={styles.navbar}>
                <div className={styles.navbar__item}>
                    <IconButton
                        className={styles.icon}
                        onClick={() => console.log("test")}
                    >
                        <QuestionAnswerIcon />
                    </IconButton>
                    <IconButton className={styles.icon}>
                        <Link to="/app/events">
                            <CalendarTodayIcon />
                        </Link>
                    </IconButton>
                    <IconButton className={styles.icon}>
                        <LocationOnIcon />
                    </IconButton>
                </div>
                <div className={styles.navbar__bottom}>
                    <IconButton className={styles.icon}>
                        <LogoutIcon />
                    </IconButton>
                </div>
            </div>
        </div>
    );
}
