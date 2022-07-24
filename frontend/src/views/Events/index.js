import React, { useState } from "react";

import EventArticle from "../../components/EventArticle";
import GroupIcon from "@mui/icons-material/Group";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { setRedirectedEvent } from "../../redux/reducers/appSlice";
import styles from "./Events.module.scss";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function Events() {
    const [selectedTab, setSelectedTab] = useState("trending");
    const [events, setEvents] = useState([]);
    const dispatch = useDispatch();
    let history = useHistory();

    useEffect(() => {
        if (events.length === 0) {
            fetch(`http://127.0.0.1:8000/api/getEvents/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setEvents(data.slice(0, 10));
                });
        }
    }, []);
    const handleArticleClick = (clickedEvent) => {
        dispatch(
            setRedirectedEvent({
                location: clickedEvent.address,
                all_dates: clickedEvent.all_dates,
                event_type: clickedEvent.event_type,
                id: clickedEvent.id,
                latitude: clickedEvent.latitude,
                longitude: clickedEvent.longitude,
                description: clickedEvent.notes,
                title: clickedEvent.title,
                url: clickedEvent.url,
            })
        );
        history.push("/app");
    };

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.titlebar}>
                    <h1 className={styles.title}>Trending</h1>
                    {/* Tabs */}
                    <div className={styles["calendar-tabs"]}>
                        <button
                            className={
                                selectedTab === "trending"
                                    ? styles["trending-btn-active"]
                                    : styles["trending-btn"]
                            }
                            onClick={() => setSelectedTab("trending")}
                        >
                            <LocalFireDepartmentIcon
                                sx={{ fontSize: "40px" }}
                            />
                        </button>
                        <button
                            className={
                                selectedTab === "friends"
                                    ? styles["friends-btn-active"]
                                    : styles["friends-btn"]
                            }
                            onClick={() => setSelectedTab("friends")}
                        >
                            <GroupIcon sx={{ fontSize: "40px" }} />
                        </button>
                    </div>
                </div>

                {/* Event */}
                {selectedTab === "trending" ? (
                    <div className={styles["events-list"]}>
                        {events.map((event) => {
                            return (
                                <EventArticle
                                    key={event.id}
                                    {...event}
                                    onClick={() => handleArticleClick(event)}
                                />
                            );
                        })}
                    </div>
                ) : (
                    selectedTab === "friends" && (
                        <div className={styles["events-list"]}>
                            {events.map((event) => {
                                const num = Math.floor(Math.random() * 10 + 1);
                                return (
                                    <EventArticle
                                        key={event.id}
                                        {...event}
                                        onClick={() =>
                                            handleArticleClick(event)
                                        }
                                        showFriends
                                        numFriends={num}
                                    />
                                );
                            })}
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
