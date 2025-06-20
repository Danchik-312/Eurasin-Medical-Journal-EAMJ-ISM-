import React from "react";
import styles from "./LibrarianPage.module.css";
import {Link} from "react-router-dom";

const LibrarianPage = () => {
    return (
        <div className={styles.librarian}>
            <nav className={styles.librarian__nav}>
                <ol className={styles.nav__menu}>
                    <li className=""><Link to="/" className={styles.nav__link}>Home</Link><span
                        className={styles.separator}>/</span></li>
                    <li className="">Information For Librarians</li>
                </ol>
            </nav>
            <h1 className={styles.librarian__title}>Information For Librarians</h1>
            <div className={styles.librarian__content}>
                <p className={styles.content__text}>We encourage research librarians to list this journal among their library's electronic journal holdings. As well, it may be worth noting that this journal's open source publishing system is suitable for libraries to host for their faculty members to use with journals they are involved in editing
                </p>
            </div>
        </div>
    )
}

export default LibrarianPage;