import React from 'react';
import styles from './Footer.module.css';
import classes from 'classnames';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={classes(styles.footer__container, "_container")}>
                <div className={styles.footer__content}>
                    <p>Eurasian Medical Journal (EAMJ) provides immediate open access to its content on the principle that making research
                        freely available to the public supports a greater global exchange of knowledge.</p>
                    <p><strong>Eurasian Medical Journal (EAMJ)</strong> is published by International Higher School of Medicine, Bishkek, <strong>Kyrgyzstan</strong></p>
                    <p>© 2007 - 2024 Ala-Too International University, Bishkek, Kyrgyzstan</p>
                </div>
                <div className={styles.footer__logo}>

                </div>
            </div>
        </footer>
    );
}

export default Footer;