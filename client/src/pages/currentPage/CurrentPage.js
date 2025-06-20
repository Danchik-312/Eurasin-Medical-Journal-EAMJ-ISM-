import React from "react";
import styles from "./CurrentPage.module.css";
import {Link} from "react-router-dom";

const CurrentPage = () => {
    return (
        <div className={styles.current}>
            <nav className={styles.current__nav}>
                <ol className={styles.nav__menu}>
                    <li className=""><Link to="/" className={styles.nav__link}>Home</Link><span
                        className={styles.separator}>/</span></li>
                    <li className=""><Link to="/archive" className={styles.nav__link}>Archives</Link><span
                        className={styles.separator}>/</span></li>
                    <li className="">Vol. 17 No. 34 (2024): November</li>
                </ol>
            </nav>
            <h1 className={styles.current__title}>Vol. 17 No. 34 (2024): November</h1>
            <div className={styles.current__heading}>
                <img src="https://www.ejbe.org/public/journals/1/cover_issue_40_en_US.jpg" className={styles.heading__images} alt="cover"/>
                <div className={styles.heading__content}>
                    <h2 className={styles.heading__subtitle}>Eurasian Medical Journal (EAMJ) is a refereed academic journal, publishing research articles in the field of business administration, economics, and related fields.</h2>
                    <p className={styles.heading__text}>The main objective of Eurasian Medical Journal (EAMJ) is to provide an intellectual platform for Eurasian scholars, a platform in which research in alternative paradigms of medical science and healthcare inquiry can be presented and debated. EAMJ also aims to promote interdisciplinary studies on theoretical, practical, and historical issues related to medicine, public health, and clinical practice, aspiring to become a leading medical journal in Eurasia.</p>
                    <p className={styles.heading__text}>EAMJ welcomes not only Eurasian authors, but also researchers from around the world who conduct studies relevant to the Eurasian region. The journal promotes cooperation and communication among academics, clinicians, and healthcare practitioners interested in medical science and healthcare in Eurasia.</p>
                </div>
                <div className={styles.heading__published}>
                    <span className={styles.published__label}>Published: </span>
                    <span className={styles.published__value}>30-11-2024</span>
                </div>
            </div>
            <div className={styles.current__section}>
                <h2 className={styles.section__subtitle}>Articles</h2>
                <ul className={styles.section__table}>
                    <li className={styles.table__item}>
                        <div className={styles.item__link}>
                            <Link to="/" className={styles.link__title}>The Impact of Working Capital Management on
                                Investment Efficiency: Evidence from Emerging Countries</Link>
                            <div className={styles.link__subtitle}>
                                <p className={styles.subtitle__auth}>Ilker YILMAZ</p>
                                <p className={styles.subtitle__page}>1-18</p>
                            </div>
                            <Link to="/" className={styles.link__down}>pdf</Link>
                        </div>
                    </li>
                    <li className={styles.table__item}>
                        <div className={styles.item__link}>
                            <Link to="/" className={styles.link__title}>The Impact of Working Capital Management on
                                Investment Efficiency: Evidence from Emerging Countries</Link>
                            <div className={styles.link__subtitle}>
                                <p className={styles.subtitle__auth}>Ilker YILMAZ</p>
                                <p className={styles.subtitle__page}>1-18</p>
                            </div>
                            <Link to="/" className={styles.link__down}>pdf</Link>
                        </div>
                    </li>
                    <li className={styles.table__item}>
                        <div className={styles.item__link}>
                            <Link to="/" className={styles.link__title}>The Impact of Working Capital Management on
                                Investment Efficiency: Evidence from Emerging Countries</Link>
                            <div className={styles.link__subtitle}>
                                <p className={styles.subtitle__auth}>Ilker YILMAZ</p>
                                <p className={styles.subtitle__page}>1-18</p>
                            </div>
                            <Link to="/" className={styles.link__down}>pdf</Link>
                        </div>
                    </li>
                    <li className={styles.table__item}>
                        <div className={styles.item__link}>
                            <Link to="/" className={styles.link__title}>The Impact of Working Capital Management on
                                Investment Efficiency: Evidence from Emerging Countries</Link>
                            <div className={styles.link__subtitle}>
                                <p className={styles.subtitle__auth}>Ilker YILMAZ</p>
                                <p className={styles.subtitle__page}>1-18</p>
                            </div>
                            <Link to="/" className={styles.link__down}>pdf</Link>
                        </div>
                    </li>
                    <li className={styles.table__item}>
                        <div className={styles.item__link}>
                            <Link to="/" className={styles.link__title}>The Impact of Working Capital Management on
                                Investment Efficiency: Evidence from Emerging Countries</Link>
                            <div className={styles.link__subtitle}>
                                <p className={styles.subtitle__auth}>Ilker YILMAZ</p>
                                <p className={styles.subtitle__page}>1-18</p>
                            </div>
                            <Link to="/" className={styles.link__down}>pdf</Link>
                        </div>
                    </li>
                    <li className={styles.table__item}>
                        <div className={styles.item__link}>
                            <Link to="/" className={styles.link__title}>The Impact of Working Capital Management on
                                Investment Efficiency: Evidence from Emerging Countries</Link>
                            <div className={styles.link__subtitle}>
                                <p className={styles.subtitle__auth}>Ilker YILMAZ</p>
                                <p className={styles.subtitle__page}>1-18</p>
                            </div>
                            <Link to="/" className={styles.link__down}>pdf</Link>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default CurrentPage;