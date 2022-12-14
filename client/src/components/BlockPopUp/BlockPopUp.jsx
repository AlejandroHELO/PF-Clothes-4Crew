import React from "react";
import ReactDOM from "react-dom";
import styles from "./Block.module.css";

export default function BlockPopUp() {

    return ReactDOM.createPortal(
    <>
        <div className={styles.overlay} />
        <div className={styles.popup}>
            <div className={styles.i}>
                <img src="/images/Clothes 4Crew Logo.JPG" alt="Company Logo" />
            </div>
            <div className={styles.title}>
                User Blocked 😓
            </div>
        </div>
    </>,
    document.getElementById("portal")
    )
}