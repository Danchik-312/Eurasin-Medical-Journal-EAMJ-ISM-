import React from "react";
import styles from "./EditorialPage.module.css";

const EditorialPage = () => {
    return (
        <div className={styles.editorial}>
            <h1 className={styles.editorial__title}>Editorial Board</h1>

            <section className={styles.section}>
                <h2>Chairman of the Editorial Board</h2>
                <p><strong>S.M. Akhunbaev</strong><br/>
                    Rector of the International Higher School of Medicine</p>
            </section>

            <section className={styles.section}>
                <h2>Editor-in-Chief</h2>
                <p><strong>O.Zh. Uzakov</strong><br/>
                    Doctor of Medical Sciences, Professor</p>
            </section>

            <section className={styles.section}>
                <h2>Marketing Editor</h2>
                <p><strong>Mohammad Bagher Rokni</strong><br/>
                    Iran<br/>
                    Professor</p>
            </section>

            <section className={styles.section}>
                <h2>Deputy Editor-in-Chief</h2>
                <p><strong>A.O. Atykanov</strong><br/>
                    Doctor of Medical Sciences</p>
            </section>

            <section className={styles.section}>
                <h2>Editorial Board Members</h2>
                <ul className={styles.list}>
                    <li><strong>A.A. Usenova</strong> – Candidate of Medical Sciences, Associate Professor</li>
                    <li><strong>V.P. Alekseev</strong> – Doctor of Medical Sciences, Professor</li>
                    <li><strong>Sh.M. Chyngyshpaev</strong> – Doctor of Medical Sciences, Professor</li>
                    <li><strong>A.Z. Kutmanova</strong> – Doctor of Medical Sciences, Professor</li>
                    <li><strong>B.M. Khudaibergenova</strong> – Doctor of Biological Sciences, Professor</li>
                    <li><strong>K.O. Jusupov</strong> – Candidate of Medical Sciences, Ph.D., Associate Professor</li>
                    <li><strong>G.A. Komarov</strong> (Russia) – Doctor of Medical Sciences, Professor</li>
                    <li><strong>A.M. Chernyavskiy</strong> (Russia) – Doctor of Medical Sciences, Professor</li>
                    <li><strong>E.A. Vaskina</strong> (Russia) – Doctor of Medical Sciences, Professor</li>
                    <li><strong>A.V. Troitsky</strong> (Russia) – Doctor of Medical Sciences, Professor</li>
                    <li><strong>Sh.K. Batyrkhanov</strong> (Kazakhstan) – Doctor of Medical Sciences, Professor</li>
                    <li><strong>Z.A. Kakharov</strong> (Uzbekistan) – Candidate of Medical Sciences, Associate Professor
                    </li>
                    <li><strong>F.A. Shukurov</strong> (Tajikistan) – Doctor of Medical Sciences, Professor</li>
                    <li><strong>N.T. Rysalieva</strong></li>
                    <li><strong>A.T. Alymkulov</strong></li>
                    <li><strong>Alireza Mosavi Jarrahi</strong> (Iran) – MSPH, Ph.D., Associate Professor</li>
                    <li><strong>Chandran Achutan</strong> (USA) – Ph.D., CIH, Associate Professor</li>
                    <li><strong>Atiya Hasan</strong> (USA) – MD</li>
                    <li><strong>Vityala Yethindra</strong> (India) – MD</li>
                    <li><strong>Muddasir Mohammed Ghouse</strong> (USA) – MD, MPH</li>
                </ul>
            </section>
        </div>
    )
}

export default EditorialPage;