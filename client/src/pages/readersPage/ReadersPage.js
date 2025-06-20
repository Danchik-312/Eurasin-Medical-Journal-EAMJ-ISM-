import React from "react";
import styles from "./ReadersPage.module.css";
import {Link} from "react-router-dom";

const ReadersPage = () => {
    return (
        <div className={styles.reader}>
            <nav className={styles.reader__nav}>
                <ol className={styles.nav__menu}>
                    <li className=""><Link to="/" className={styles.nav__link}>Home</Link><span
                        className={styles.separator}>/</span></li>
                    <li className="">Information For Readers</li>
                </ol>
            </nav>
            <h1 className={styles.reader__title}>Information For Readers</h1>
            <div className={styles.reader__content}>
                <p className={styles.content__text}>We encourage readers to sign up for the publishing notification service for this journal. Use the Register link at the top of the home page for the journal. This registration will result in the reader receiving the Table of Contents by email for each new issue of the journal. This list also allows the journal to claim a certain level of support or readership. See the journal's Privacy Statement, which assures readers that their name and email address will not be used for other purposes.
                </p>
            </div>
        </div>
    )
}

export default ReadersPage;