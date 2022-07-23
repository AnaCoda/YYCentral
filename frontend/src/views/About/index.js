import { Link } from "react-router-dom";
import React from "react";
import styles from "./About.module.scss";
import { useHistory } from "react-router-dom";

export default function About() {
    let history = useHistory();
    return (
        <div className={styles["about-page"]}>
            <div className={styles["about-page__overlay"]}></div>

            <div className={styles.container}>
                <div className={styles["page-content"]}>
                    <h1 className={styles.title}>About</h1>
                    <p>
                        <span className={styles["company-name"]}>
                            YYCentral
                        </span>{" "}
                        makes it easier to get involved in the YYC Downtown
                        community.
                    </p>
                    <ul className={styles["about-list"]}>
                        <li>
                            Are you a business working on getting your brand out
                            there or planning an event?{" "}
                            <Link to="/login" className={styles["signup-link"]}>
                                Sign up
                            </Link>{" "}
                            and put yourself on our map!
                        </li>
                        <li>
                            Are you visiting or a local and wanting to explore
                            everything YYC? Checkout local events and
                            destinations using our interactive map.{" "}
                            <Link to="/login" className={styles["signup-link"]}>
                                Sign up
                            </Link>{" "}
                            to leave your reviews and get notified of events.
                        </li>
                    </ul>
                    <button
                        className={styles.btn}
                        onClick={() => history.push("/app")}
                    >
                        Get started
                    </button>
                </div>
            </div>
        </div>
    );
}
