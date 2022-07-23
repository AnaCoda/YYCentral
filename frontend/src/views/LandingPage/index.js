import { BiUser } from "react-icons/bi";
import { IoMapSharp } from "react-icons/io5";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import React from "react";
import styles from "./LandingPage.module.scss";

export default function LandingPage() {
    return (
        <div>
            <div className={styles.header}>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <div className={styles.header__content}>
                    <h1>YYCentral</h1>
                    <p className={styles["sub-title"]}>
                        The all-in-one web app to help you get around Calgary.
                    </p>
                    <div className={styles.btns}>
                        <button onClick={() => console.log("test")}>
                            <IoMapSharp className={styles["btn-icon"]} />
                            Map
                        </button>
                        <button>
                            <BiUser className={styles["btn-icon"]} />
                            Login/Signup
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
