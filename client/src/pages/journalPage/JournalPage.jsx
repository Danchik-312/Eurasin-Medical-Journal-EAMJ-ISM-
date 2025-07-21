import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "../archivesPage/ArchivesPage.module.css";

const monthNames = [
    '', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const JournalPage = () => {
    const { id } = useParams();
    const [journal, setJournal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJournal = async () => {
            try {
                const res = await fetch(`http://localhost:3001/journals/${id}`);
                const data = await res.json();
                setJournal(data);
            } catch (error) {
                console.error("Ошибка при загрузке журнала:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJournal();
    }, [id]);

    if (loading) return <p>Загрузка...</p>;
    if (!journal) return <p>Журнал не найден</p>;

    const formattedDate = new Date(journal.publicationDate).toLocaleDateString("en-GB");

    return (
        <div>
            <nav className={styles.archive__nav}>
                <ol className={styles.nav__menu}>
                    <li><Link to="/" className={styles.nav__link}>Home</Link><span className={styles.separator}>/</span>
                    </li>
                    <li><Link to="/archives" className={styles.nav__link}>Archives</Link><span
                        className={styles.separator}>/</span></li>
                    <li>No. {journal.issue}, ({journal.year}): {monthNames[journal.month]}</li>
                </ol>
            </nav>

            <h1 className={styles.archive__title}>No. {journal.issue}, ({journal.year}): {monthNames[journal.month]}</h1>

            <div>
                <img
                    src="https://www.ejbe.org/public/journals/1/cover_issue_40_en_US.jpg" // замени на journal.coverUrl если появится поле
                    alt="Journal Cover"
                />

                <div>
                    <p>
                        {journal.description}
                    </p>

                    <p>
                        <strong>Published:</strong> {formattedDate}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default JournalPage;
