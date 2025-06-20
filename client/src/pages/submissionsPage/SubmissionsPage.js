import React from "react";
import styles from "./SubmissionsPage.module.css";
import {Link} from "react-router-dom";

const SubmissionsPage = () => {
    return (
        <div className={styles.submission}>
            <nav className={styles.submission__nav}>
                <ol className={styles.nav__menu}>
                    <li className=""><Link to="/" className={styles.nav__link}>Home</Link><span
                        className={styles.separator}>/</span></li>
                    <li className="">Submissions</li>
                </ol>
            </nav>
            <h1 className={styles.submission__title}>Submissions</h1>
            <div className={styles.submission__content}>
                <div className={styles.content__notification}>
                    <Link to="/" className={styles.notification__link}>Login</Link> or <Link to="/" className={styles.notification__link}>Register</Link> to make a submission
                </div>
                <div className={styles.content__checklist}>
                    <h2 className={styles.checklist__title}>Submission Preparation Checklist</h2>
                    <p className={styles.checklist__text}>As part of the submission process, authors are required to check off their submission's compliance with all of the following items, and submissions may be returned to authors that do not adhere to these guidelines.</p>
                    <ul><li></li></ul>
                </div>
                <div className={styles.content__guide}>
                    <h2 className={styles.guide__title}>Author Guidelines</h2>
                    <p className={styles.guide__text}>Any paper submitted to the Eurasian Medical Journal (EAMJ) should NOT be under consideration for publication at another journal. <br/>
                        1. Papers must be in English.<br/>
                        2. Papers that are submitted to the EAMJ for publication should not be under review at other
                        journals. (See Publication Ethics and Publication Malpractice) Submission of an article implies
                        that the work described has not been published previously (except in the form of an
                        abstract)<br/>
                        3. The first page of the manuscript should contain:<br/>
                        (i) the title<br/>
                        (ii) the name(s), position(s), institutional affiliation(s) and e-mail address(es) of (all)
                        the author(s) <br/>
                        (iii) All authors' full names and affiliates. The address and telephone of the corresponding
                        author. <br/>
                        (iv) an abstract of 50-200 words. <br/>
                        (v) JEL categories <br/>
                        (vi) 5 keywords <br/>
                        (vii) If the research is funded or grant-awarded by any organization, provide all details as an
                        acknowledgment.</p>
                    <p className={styles.guide__text}>
                        4. Articles should be between 4,000 and 8,000 words in length, including figures, tables,
                        footnotes, and references.
                        <br/>
                        5. Manuscripts should be 1.5 spaced, Please use Times New Roman font in 12 pt. type and maintain
                        a 3 cm side, top, and bottom margin.
                        <br/>
                        6. Equations and symbols should be typed as well.
                        <br/>
                        7. Figures and tables should be numbered consecutively. The width of the table or figure must
                        not exceed 12 cm.
                        <br/>
                        8. Subtitles should be numbered consecutively (1., 1.1., 1.2., 2., 2.1., 2.2., etc.)
                        <br/>
                        9. References should be listed at the end of the main text in alphabetical order. They should be
                        cross-referenced in the text by using the author's name and publication date in the style of
                        Civan (2015), or (Kumar, 2008: 12-15).
                        <br/>
                        10. Manuscripts should be prepared using APA style. For detailed information, refer to the
                        Publication Manual of the American Psychological Association (7th ed.), http://apastyle.org
                        <br/>
                        11. Use of DOI of references is highly encouraged.
                    </p>
                </div>
                <div className={styles.content__privacy}>
                    <h2 className={styles.privacy__title}>Privacy Statement</h2>
                    <p className={styles.privacy__text}>The names and email addresses entered in this journal site will be used exclusively for the stated purposes of this journal and will not be made available for any other purpose or to any other party.</p>
                </div>
            </div>
        </div>
    )
}

export default SubmissionsPage;