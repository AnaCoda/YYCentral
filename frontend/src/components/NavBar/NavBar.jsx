import { Link, useHistory } from "react-router-dom";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { IconButton } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LogoutIcon from "@mui/icons-material/Logout";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import React from "react";
import { setEvent } from "../../redux/reducers/appSlice";
import styles from "./NavBar.module.scss";
import { useDispatch } from "react-redux";

export default function NavBar() {
    const history = useHistory();
    const dispatch = useDispatch();

    function push(path) {
        history.push(path);
        
        // Reset all redux states
        dispatch(
            setEvent(undefined)
        );
    }

    return (
        <div className={styles.navbar__wrapper}>
            <div className={styles.navbar}>
                <div className={styles.navbar__item}>
                    <IconButton
                        className={styles.icon}
                    >
                        <QuestionAnswerIcon />
                    </IconButton>
                    <IconButton className={styles.icon} onClick={() => push("/app/events")}>
                        <Link to="/app/events">
                            <CalendarTodayIcon />
                        </Link>
                    </IconButton>
                    <IconButton className={styles.icon} onClick={() => push("/app")}>
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
