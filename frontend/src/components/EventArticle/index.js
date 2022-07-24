import React, { useState } from "react";

import GroupIcon from "@mui/icons-material/Group";
import InterestedSwitch from "components/InterestedSwitch";
import calgaryImg from "../../assets/calgary_night.jpg";
import styles from "./EventArticle.module.scss";

export default function EventArticle({
    title,
    address,
    img,
    notes,
    url,
    onClick,
    showFriends,
    numFriends,
}) {
    const [interested, setInterested] = useState(false);

    const toggleInterested = () => {
        setInterested(!interested);
    };

    return (
        <article className={styles["event-article"]}>
            <div className={styles["event-article__header"]}>
                <h2 className={styles["event-article__title"]}>{title}</h2>
                {showFriends && (
                    <div className={styles["friends-icon"]}>
                        <GroupIcon sx={{ fontSize: "30px" }} />
                        <span className={styles["friends-icon__amount"]}>
                            {numFriends}
                        </span>
                    </div>
                )}
            </div>

            <div className={styles["event-article__content"]}>
                <div className={styles["event-article__content__header"]}>
                    <p className={styles["event-article__loc"]}>
                        Location: <a href="#">{address}</a>
                    </p>
                    <InterestedSwitch
                        onToggle={toggleInterested}
                        value={interested}
                    />
                </div>

                <div>
                    <img
                        src={img ? img : calgaryImg}
                        alt={title}
                        onClick={onClick}
                    />
                </div>
                <div className={styles["event-article__details"]}>
                    <h3>Details</h3>
                    <p>{notes}</p>
                    <p className={styles["event-article__read-more"]}>
                        Read More at <a href={url}>{url}</a>
                    </p>
                </div>
            </div>
        </article>
    );
}
