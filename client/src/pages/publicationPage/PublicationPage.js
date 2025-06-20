import React from "react";
import styles from "./PublicationPage.module.css";
import {Link} from "react-router-dom";

const PublicationPage = () => {
    return (
        <div className={styles.publicat}>
            <nav className={styles.publicat__nav}>
                <ol className={styles.nav__menu}>
                    <li className=""><Link to="/" className={styles.nav__link}>Home</Link><span
                        className={styles.separator}>/</span></li>
                    <li className="">Publication Ethics</li>
                </ol>
                <h1 className={styles.publicat__title}>Publication Ethics</h1>
                <div className={styles.publicat__content}>
                    <p className={styles.content__subtitle}>Publication Ethics and Publication Malpractice</p>
                    <p className={styles.content__text}>Eurasian Medical Journal (EAMJ) is committed to upholding the highest standards of publication ethics and takes all possible measures against any publication malpractices. EAMJ is committed to objective and fair double-blind peer-review of the submitted for publication works and to prevent any actual or potential conflict of interests between the editorial and review personnel and the reviewed material. Any departures from the above-defined rules should be reported directly to the Editors, who are unequivocally committed to providing swift resolutions to any of such a type of problem. In order to ensure the journal with the highest quality, EAMJ is guided by the following principles:

                        The Editors of EAMJ are responsible for initial screening of the manuscripts submitted, after which the further review-process decision is made. The manuscripts may be rejected without review if the Editors consider the manuscripts obviously not suitable and under the accepted standards for publication in EAMJ. During the reviewing process of the submitted papers, the Editors should limit themselves only to the academic and intellectual content. The Editors may be guided by the policies of the journal's Editorial Board and should ignore any material that ruptures legal requirements concerning libel, copyright infringement, and plagiarism. They must ensure the confidentiality of the submitted manuscripts. In case the Editors decide not to publish a material, the manuscript should not be used for other purposes without the express written permission of the authors. The Editors will conserve the anonymity of reviewers and promote the publication of corrections, clarifications, retractions, and apologies when necessary. The Editors have complete responsibility and authority whether the paper submitted should be accepted or rejected. The Editors will accept the manuscripts when rationally and fairly certain. The Editors should have no conflict of interests toward the articles they reject/accept.

                        The reviewers of EAMJ assist the Editors in taking the decision of publishing a submitted manuscript. The reviewers have to treat the manuscript received for peer-reviewing with strict confidentiality, fairness, and professionalism. They will avoid personal predispositions in their review and judgments. Review of submitted manuscripts must be done adequately, and the reviewers should express their views clearly with supporting arguments. The reviewed manuscripts and reviewers' reports with supporting comments must not be shared with other parties. Relying on the reviewing process, the final decision (accepted, accepted with minor revision, accepted with major revision, or rejected) will be undertaken and sent to the authors. Reviewers and the Editorial Board may be asked to re-evaluate the revised manuscript if there are concerns that the paper has not been objectively revised to address the issues raised. In the case that the reviewer cannot complete the reviewing process within the scheduled time, the reviewer must inform the Editors so the manuscript could be sent to another reviewer. The reviewers will be selected in such a way as to avoid any conflict of interest toward the research, the authors, or any companies or institutions connected with the paper.
                        All authors submitting their works to the Eurasian Medical Journal (EAMJ) for publication as original articles attest that the submitted works represent their authors' contributions and have not been copied or plagiarized in whole or in part from other works. Authors acknowledge and cite content reproduced from other sources. They will obtain permission to reproduce any content from other sources, and such materials must be appropriately cited.

                        The authors must ensure that all data in the article are real and valid and should provide corrections or request withdrawal whenever necessary. Any attempt at plagiarism will result in the rejection of the submitted manuscript.

                        Manuscripts submitted to the EAMJ must not be published or under review elsewhere in the same form, in English or any other language. If a manuscript is found to be published in any other language, it will be rejected and removed from the evaluation process. Submitting the same manuscript to more than one journal simultaneously constitutes unethical publishing behavior unless explicitly permitted. Two manuscripts from the same authors cannot be under evaluation at the same time.

                        The authors confirm that they have disclosed all actual or potential conflicts of interest or any partial benefits associated with their work. Public dissemination of reviewer reports and editorial correspondence by the authors is inappropriate. Authors are obliged to participate in the peer-review process and provide necessary corrections.

                        To verify originality, manuscripts submitted are checked by a plagiarism detection service.

                        The Editors must not allow plagiarism or fraudulent data to be published. Any breach of legal or ethical standards, including plagiarism, multiple submissions, or the use of fraudulent data, will lead to the retraction of the manuscript. No plagiarism or fraudulent data will be tolerated.

                        Editors and reviewers must operate under strict confidentiality and anonymity. The Editors, Editorial Board, reviewers, authors, and EAMJ staff members are expected to uphold basic standards of professional integrity, tolerance, and mutual respect.

                        The Editors and Editorial Board are responsible for upholding and monitoring publishing ethics.
                    </p>
                </div>
            </nav>
        </div>
    )
}

export default PublicationPage;