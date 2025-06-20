import React from "react";
import styles from "./ContactPage.module.css";
import {Link} from "react-router-dom";

const ContactPage = () => {
    return (
        <div className={styles.contact}>
            <nav className={styles.contact__nav}>
                <ol className={styles.nav__menu}>
                    <li className=""><Link to="/" className={styles.nav__link}>Home</Link><span
                        className={styles.separator}>/</span></li>
                    <li className="">Contact</li>
                </ol>
            </nav>
            <h1 className={styles.contact__title}>Contact</h1>
            <div className={styles.contact__content}>
                <p className={styles.content__text}>
                    1f Intergelpo St, Bishkek, Kyrgyzstan
                </p>
                <div className={styles.content__section}>
                    <div className={styles.section__principal}>
                        <h2 className={styles.section__subtitle}>Principal Contact</h2>
                        <p>Editors</p>
                        <p>Mail: </p>
                    </div>
                    <div className={styles.section__support}>
                        <h2 className={styles.section__subtitle}>Support Contact</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactPage;