import React from "react";
import styles from "./IndexingPage.module.css";
import {Link} from "react-router-dom";

const IndexingPage = () => {
    return (
        <div className={styles.index}>
            <nav className={styles.index__nav}>
                <ol className={styles.nav__menu}>
                    <li className=""><Link to="/" className={styles.nav__link}>Home</Link><span
                        className={styles.separator}>/</span></li>
                    <li className="">Indexing</li>
                </ol>
            </nav>
            <h1 className={styles.index__title}>Indexing</h1>
            <div className={styles.index__content}>
                <p className={styles.content__text}>Eurasian Medical Journal (EAMJ) is indexed and abstracted in:
                </p>
                <ul className={styles.content__table}>
                    <li className={styles.table__item}><a href="#" className={styles.table__link}>Scopus</a></li>
                    <li className={styles.table__item}><a href="#" className={styles.table__link}>Australian Business Deans Council (ABDC) Journal Quality List </a></li>
                    <li className={styles.table__item}><a href="#" className={styles.table__link}>EconLit / Journal of Economic Literature (AEA)</a></li>
                    <li className={styles.table__item}><a href="#" className={styles.table__link}>Cabell's Directory of Publishing Opportunities in Economics & Finance, Accounting, Management and Marketing.</a></li>
                    <li className={styles.table__item}><a href="#" className={styles.table__link}>Ulrich's Periodicals Directory</a></li>
                    <li className={styles.table__item}><a href="#" className={styles.table__link}>Index Copernicus</a></li>
                    <li className={styles.table__item}><a href="#" className={styles.table__link}>DOAJ (Directory of Open Access Journals)</a></li>
                    <li className={styles.table__item}><a href="#" className={styles.table__link}>Norwegian Register for Scientific Journals, Series and Publishers</a></li>
                    <li className={styles.table__item}><a href="#" className={styles.table__link}>Open Academic Journals Index (OAJI)</a></li>
                    <li className={styles.table__item}><a href="#" className={styles.table__link}>Russian Science Citation Index (RSCI)</a></li>
                    <li className={styles.table__item}><a href="#" className={styles.table__link}>Index Islamicus</a></li>
                    <li className={styles.table__item}><a href="#" className={styles.table__link}>MIAR</a></li>
                    <li className={styles.table__item}><a href="#" className={styles.table__link}>EBSCO EconLit with Full Text Database</a></li>
                    <li className={styles.table__item}><a href="#" className={styles.table__link}>International Bibliography of Social Sciences</a></li>
                    <li className={styles.table__item}><a href="#" className={styles.table__link}>CROSSREF</a></li>
                </ul>
            </div>
        </div>
    )
}

export default IndexingPage;