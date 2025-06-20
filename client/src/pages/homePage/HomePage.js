import React from "react";
import styles from "./HomePage.module.css";
import {Link} from "react-router-dom";


const HomePage = () => {
    return (
        <div className={styles.home}>
            <nav className={styles.home__nav}>
                <ol className={styles.nav__menu}>
                    <li className=""><Link to="/" className={styles.nav__link}>Home</Link><span className={styles.separator}>/</span></li>
                    <li className="">Aims and scope</li>
                </ol>
            </nav>
            <h1 className={styles.home__title}>Aims and Scope</h1>
            <div className={styles.home__content}>
                <p className={styles.content__text}>Eurasian Medical Journal (EAMJ) is a peer-reviewed academic journal publishing research articles in the field of medicine and related disciplines.

                    The aim of EAMJ is to provide an intellectual platform for social-scientific and clinical studies related to medicine, where alternative approaches to medical and healthcare issues can be presented and debated.

                    The journal also aims to promote interdisciplinary research addressing theoretical, practical, and historical aspects important for solving problems in healthcare and medicine, and to become the leading medical journal in Eurasia.

                    EAMJ welcomes not only authors from Eurasia but also researchers from around the world. The journal fosters cooperation and knowledge exchange among academics and practitioners interested in medicine and healthcare in Eurasia.
                </p>
            </div>
        </div>
    )
}

export default HomePage;