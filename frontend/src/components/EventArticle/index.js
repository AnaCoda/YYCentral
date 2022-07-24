import React from "react";
import styles from "./EventArticle.module.scss";

export default function EventArticle({
    title,
    location,
    img,
    details,
    website,
    onClick,
}) {
    return (
        <article className={styles["event-article"]} onClick={onClick}>
            <h2 className={styles["event-article__title"]}>{title}</h2>
            <div className={styles["event-article__content"]}>
                <p className={styles["event-article__loc"]}>
                    Location: <a href="#">{location}</a>
                </p>
                <div>
                    <img src={img} alt={title} />
                </div>
                <div className={styles["event-article__details"]}>
                    <h3>Details</h3>
                    <p>{details}</p>
                    <p className={styles["event-article__read-more"]}>
                        Read More at <a href={website}>{website}</a>
                    </p>
                </div>
            </div>
        </article>
    );
}
