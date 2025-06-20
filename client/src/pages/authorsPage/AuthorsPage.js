import React from "react";
import styles from "./AuthorsPage.module.css";
import {Link} from "react-router-dom";

const AuthorsPage = () => {
    return (
        <div className={styles.author}>
            <nav className={styles.author__nav}>
                <ol className={styles.nav__menu}>
                    <li className=""><Link to="/" className={styles.nav__link}>Home</Link><span
                        className={styles.separator}>/</span></li>
                    <li className="">Information For Authors</li>
                </ol>
            </nav>
            <h1 className={styles.author__title}>Information For Authors</h1>
            <div className={styles.author__content}>
                <p className={styles.content__text}>Interested in submitting to this journal? We recommend that you review the About the Journal page for the journal's section policies, as well as the Author Guidelines. Authors need to register with the journal prior to submitting or, if already registered, can simply log in and begin the five-step process.
                </p>
            </div>
        </div>
    )
}

export default AuthorsPage;