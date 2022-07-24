import { removeFilter, setFilter } from "redux/reducers/appSlice";
import { useDispatch, useSelector } from "react-redux";

import { ReactComponent as EventIcon } from "../../assets/mapIcons/eventIcon.svg";
import React from "react";
import { ReactComponent as RestaurantIcon } from "../../assets/mapIcons/restaurantIcon2.svg";
import styles from "./FilterBar.module.scss";

export default function FilterBar() {
    const dispatch = useDispatch();
    const { filter } = useSelector((state) => state.app);

    const handleIconClick = (newFilter) => {
        if (filter === newFilter) {
            dispatch(removeFilter());
        } else {
            dispatch(setFilter(newFilter));
        }
    };
    return (
        <div className={styles["filter-bar"]}>
            <EventIcon
                className={
                    filter === "event"
                        ? styles["filter-icon-active"]
                        : styles["filter-icon"]
                }
                onClick={() => handleIconClick("event")}
            />
            <RestaurantIcon
                className={
                    filter === "food"
                        ? styles["filter-icon-active"]
                        : styles["filter-icon"]
                }
                onClick={() => handleIconClick("food")}
            />
        </div>
    );
}
