import React from 'react';
import styles from './Header.module.css';
import classes from 'classnames';
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <header className={classes(styles.header)}>
            <div className={classes(styles.header__container, '_container')}>
                <div className={classes(styles.header__logo)}></div>
                <nav className={classes(styles.header__menu)}>
                    <ul className={classes(styles.menu__list)}>
                        <li className={styles.menu__item}><NavLink to="/home" className={styles.menu__link}>Home</NavLink></li>
                        <li className={styles.menu__item}><NavLink to="/current" className={styles.menu__link}>Current</NavLink></li>
                        <li className={styles.menu__item}><NavLink to="/archives" className={styles.menu__link}>Archives</NavLink></li>
                        <li className={styles.menu__item}><NavLink to="/indexing" className={styles.menu__link}>Indexing</NavLink></li>
                        <li className={styles.menu__item}><NavLink to="/editorial" className={styles.menu__link}>Editorial
                            Team</NavLink></li>
                        <li className={styles.menu__item}><NavLink to="/publication" className={styles.menu__link}>Publication
                            Ethics</NavLink></li>
                        <li className={styles.menu__item}><NavLink to="/announcements" className={styles.menu__link}>Announcements</NavLink>
                        </li>
                        <li className={styles.menu__item}><NavLink to="/contact" className={styles.menu__link}>Contact</NavLink></li>
                        <li className={styles.menu__item}><NavLink to="/submissions" className={styles.menu__link}>Submissions</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;