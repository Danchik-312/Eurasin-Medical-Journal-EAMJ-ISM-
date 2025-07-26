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
                <p className={styles.content__text}>Interested in submitting to this journal? We recommend that you
                    review the About the Journal page for the journal's section policies, as well as the Author
                    Guidelines. Authors need to register with the journal prior to submitting or, if already registered,
                    can simply log in and begin the five-step process.
                </p>
                <p className={styles.content__subtitle}>Guide for Authors</p>
                <p className={styles.content__bold}>
                    Any paper submitted to the Eurasian Medical Journal (EAMJ) should NOT be under consideration for
                    publication at another journal.<br/>
                    1. Papers must be in English, and must demonstrate a high level of proficiency.<br/>
                    2. Papers that are submitted to the EJBE for publication should not be under review at other
                    journals. (See Publication Ethics and Publication Malpractice) Submission of an article implies that
                    the work described has not been published previously (except in the form of an abstract)<br/>
                    3. The first page of the manuscript should contain:<br/>
                    (i) the title<br/>
                    (ii) the name(s), position(s), institutional affiliation(s) and e-mail address(es) of (all) the
                    author(s)<br/>
                    (iii) the address, telephone and fax numbers (as well as the e-mail address) of the corresponding
                    author.<br/>
                    (iv) an abstract of 200 words.<br/>
                    (v) JEL categories<br/>
                    (vi) 5 keywords<br/>
                </p>
                <p className={styles.content__bold}>
                    (vii) If the research is funded or grant-awarded by any organization, provide all details as an
                    acknowledgment.<br/>
                    4. Articles should be between 4,000 and 8,000 words in length, including figures, tables, footnotes,
                    and references.<br/>
                </p>
                <p className={styles.content__bold}>
                    5. Manuscripts should be 1.5 spaced, Please use Times New Roman font in 12 pt. type and maintain a 3
                    cm side, top, and bottom margin.<br/>
                    6. Equations and symbols should be typed as well.<br/>
                    7. Figures and tables should be numbered consecutively. Width of the table or figure must not exceed
                    12 cm.<br/>
                    8. Subtitles should be numbered consecutively (1., 1.1., 1.2., 2., 2.1., 2.2., etc.)<br/>
                    9. References should be listed at the end of the main text in alphabetical order. They should be
                    cross-referenced in the text by using the author's name and publication date in the style of Civan
                    (2015), or (Kumar, 2008: 12-15).<br/>
                    10. Manuscripts should be prepared using APA style. For detailed information, refer to the
                    Publication Manual of the American Psychological Association (7th ed.), http://apastyle.org<br/>
                    11. Use of DOI of references is highly encouraged.<br/>
                </p>
                <p className={styles.content__subtitle}>Review Process</p>
                <p className={styles.content__text}>
                    1. Moderation: Each paper is reviewed by the editors and, if it is judged suitable for the journal,
                    it is then sent to two independent referees for double blind peer review. All submitted manuscripts
                    are read by the editorial staff. Only those papers that seem most likely to meet our editorial
                    criteria are sent for formal review to save time for authors and peer-reviewers. Those papers judged
                    by the editors to be of insufficient general interest, lack of originality, not well presented or
                    inappropriate are rejected promptly without external review.
                    2. Double-blind review: After moderation, manuscripts are subject to double-blind peer review by the
                    members of the Editorial Board and two anonymous external reviewers. On average, the review process
                    takes 3-4 months.<br/>
                    The manuscript is accepted or rejected depending on the reviewer’s conclusion and the Editorial
                    decision. All manuscripts are verified for their originality using the originality detection
                    software.
                    The reviewing results can be formulated as Paper is Accepted/Minor revision/Major revision or
                    Rejected.
                    The Editorial Team does not enter into correspondence with the authors of rejected papers.The papers
                    which were once rejected are not to be reconsidered.
                    The common reasons for rejection are lack of scientific novelty, insufficient originality or
                    non-conformity to the scientific area covered by the Journal. The authors receive the notification
                    of the Editor’s decision and requests for revision by e-mail.<br/>
                    3. Acceptance: Articles that receive positive reviews are included in the list for publication.
                </p>
                <p className={styles.content__subtitle}>Publication Fee</p>
                <p className={styles.content__text}>
                    There are no submission or publication fees. The processing, formatting, reviewing and archiving of the publication are free of charge.
                </p>
                <p className={styles.content__bold}>Copyright notice</p>
                <p className={styles.content__text}>
                    The acceptance of the article automatically implies the transfer of copyright to Eurasian Medical Journal (EAMJ). Manuscripts are accepted for review with the understanding that the same work has not been published (except in the form of an abstract), that it is not under consideration for publication elsewhere, that it will not be submitted to another journal while under review process for Eurasian Medical Journal (EAMJ), and that its submission for publication has been approved by all of the authors.
                </p>
            </div>
        </div>
    )
}

export default AuthorsPage;