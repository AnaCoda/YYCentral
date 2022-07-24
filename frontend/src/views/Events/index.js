import React, { useState } from "react";

import EventArticle from "../../components/EventArticle";
import GroupIcon from "@mui/icons-material/Group";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import calgaryImg from "../../assets/calgary_night.jpg";
import { setRedirectedEvent } from "../../redux/reducers/appSlice";
import styles from "./Events.module.scss";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const yycHacks = {
    title: "YYCHacks Calgary Hackathon",
    address: "The Platform Calgary",
    img: calgaryImg,
    notes: "Like all places, Alberta is not immune to the upheaval and changes faced by the global community over the past ten-plus years. From energy sector boom/bust cycles (more text here if necessary)...",
    url: "https://hackathon.yyctech.ca/",
};
const dummyEvent = {
    address: "221 12 Avenue SW",
    all_dates: '["Aug 16 2022 2:30 - 4:30 p.m."]',
    event_type: "nan",
    id: 189,
    latitude: "51.041313",
    longitude: "-114.067013",
    notes: "For children ages 6+, this course teaches self-awareness and personal safety.&nbsp; Throughout this interactive workshop, children learn tips for basic personal safety.&nbsp; All lessons are reinforced through role-playing and group discussion.&nbsp; FREE!&nbsp; Register at: activebeltline@calgary.ca\n\nLimited spots are available.&nbsp; Preferences will be given to children living in the Beltline and surrounding neighbourhoods.\n\nAccessibility barriers:&nbsp; Multiple staircases to access program space.&nbsp; Street parking only.",
    title: "Street Smarts",
    url: "http://google.ca",
};
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
                    console.log(data);
                });
        }
    }, []);
    const handleArticleClick = (clickedEvent) => {
        console.log("You clicked the article!");

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
                        {/* <EventArticle
                            {...yycHacks}
                            onClick={handleArticleClick}
                        />
                        <EventArticle
                            {...yycHacks}
                            title={"Hack1"}
                            onClick={handleArticleClick}
                        />
                        <EventArticle
                            {...dummyEvent}
                            onClick={handleArticleClick}
                        />
                        <EventArticle
                            {...yycHacks}
                            onClick={handleArticleClick}
                        /> */}
                    </div>
                ) : (
                    selectedTab === "friends" && (
                        <div>No friends yet. Find some!</div>
                    )
                )}
            </div>
        </div>
    );
}
