import React from "react";
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
    const handleArticleClick = () => {
        console.log("You clicked the article!");
    };
    return (
        <div>
            <div className={styles.container}>
                <h1 className={styles.title}>Daily Feed: July 22nd, 2022</h1>
                {/* Event */}
                <article
                    className={styles["event-article"]}
                    onClick={handleArticleClick}
                >
                    <h2 className={styles["event-article__title"]}>
                        {yycHacks.title}
                    </h2>
                    <div className={styles["event-article__content"]}>
                        <p className={styles["event-article__loc"]}>
                            Location: <a href="#">{yycHacks.location}</a>
                        </p>
                        <div>
                            <img src={yycHacks.img} alt={yycHacks.title} />{" "}
                        </div>
                        <div>
                            <h3>Details</h3>
                            <p>{yycHacks.details}</p>
                            <p>
                                Read More at{" "}
                                <a href={yycHacks.website}>
                                    {yycHacks.website}
                                </a>
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}
