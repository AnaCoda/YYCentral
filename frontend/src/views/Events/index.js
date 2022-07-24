import React, { useState } from "react";

import EventArticle from "../../components/EventArticle";
import GroupIcon from "@mui/icons-material/Group";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import calgaryImg from "../../assets/calgary_night.jpg";
import styles from "./Events.module.scss";

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
    const handleArticleClick = () => {
        console.log("You clicked the article!");
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
