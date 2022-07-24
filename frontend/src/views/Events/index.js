import React, { useState } from "react";

import EventArticle from "../../components/EventArticle";
import GroupIcon from "@mui/icons-material/Group";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import calgaryImg from "../../assets/calgary_night.jpg";
import { setRedirectedEvent } from "../../redux/reducers/appSlice";
import styles from "./Events.module.scss";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const yycHacks = {
    title: "YYCHacks Calgary Hackathon",
    location: "The Platform Calgary",
    img: calgaryImg,
    details:
        "Like all places, Alberta is not immune to the upheaval and changes faced by the global community over the past ten-plus years. From energy sector boom/bust cycles (more text here if necessary)...",
    website: "https://hackathon.yyctech.ca/",
};
export default function Events() {
    const [selectedTab, setSelectedTab] = useState("trending");
    const dispatch = useDispatch();
    let history = useHistory();
    const handleArticleClick = () => {
        console.log("You clicked the article!");
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
        dispatch(setRedirectedEvent(dummyEvent));
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
                        <EventArticle
                            {...yycHacks}
                            onClick={handleArticleClick}
                        />
                        <EventArticle
                            {...yycHacks}
                            title={"Hack1"}
                            onClick={handleArticleClick}
                        />
                        <EventArticle
                            {...yycHacks}
                            onClick={handleArticleClick}
                        />
                        <EventArticle
                            {...yycHacks}
                            onClick={handleArticleClick}
                        />
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
