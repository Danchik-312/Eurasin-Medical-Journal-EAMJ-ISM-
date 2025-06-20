import React from "react";
import styles from './SideBar.module.css';
import {Link} from "react-router-dom"

const SideBar = () => {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebar__info}>
                <span className={styles.title}>Information</span>
                <div className={styles.content}>
                    <ul className={styles.menu__list}>
                        <li className={styles.menu__item}><Link to="/readers" className={styles.menu__link}>For Readers</Link></li>
                        <li className={styles.menu__item}><Link to="/authors" className={styles.menu__link}>For Authors</Link></li>
                        <li className={styles.menu__item}><Link to="/librarian" className={styles.menu__link}>For Librarians</Link></li>
                    </ul>
                </div>
            </div>
            <div className={styles.sidebar__lang}>
                <span className={styles.title}>Language</span>
                <div className={styles.content}>
                    <ul className={styles.menu__list}>
                        <li className={styles.menu__item}><Link to="/" className={styles.menu__link}>English</Link></li>
                        <li className={styles.menu__item}><Link to="/" className={styles.menu__link}>Русский</Link></li>
                    </ul>
                </div>
            </div>
        </aside>
    )
}

export default SideBar;