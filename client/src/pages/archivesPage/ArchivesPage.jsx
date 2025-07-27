import React, { useEffect, useState } from "react";
import styles from "./ArchivesPage.module.css";
import { Link } from "react-router-dom";

// Преобразуем номер месяца в название
const getMonthName = (monthNum) => {
    const months = [
        '',
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthNum] || 'Месяц';
};

const ArchivesPage = () => {
    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJournals = async () => {
            try {
                const res = await fetch("http://localhost:3001/api/journals");
                const data = await res.json();
                console.log("JOURNALS DATA:", data); // ← Смотри в консоли браузера
                setJournals(data);
            } catch (err) {
                console.error("Ошибка при загрузке журналов", err);
            } finally {
                setLoading(false);
            }
        };


        fetchJournals();
    }, []);

    return (
        <div className={styles.archive}>
            <nav className={styles.archive__nav}>
                <ol className={styles.nav__menu}>
                    <li><Link to="/" className={styles.nav__link}>Home</Link><span className={styles.separator}>/</span></li>
                    <li>Archives</li>
                </ol>
            </nav>

            <h1 className={styles.archive__title}>Archives</h1>

            <div className={styles.archive__content}>
                {loading && <p>Загрузка...</p>}
                {!loading && journals.length === 0 && <p>Журналы не найдены.</p>}

                {journals.map((journal) => (
                    <div key={journal.id} className={styles.content__item}>
                        <Link to={`/journals/${journal.id}`} className={styles.item__img}>
                            <img
                                src="/images/cover.jpg"
                                alt={`Журнал ${journal.issue}`}
                            />
                        </Link>

                        <h2 className={styles.item__title}>
                            <Link to={`/journals/${journal.id}`} className={styles.title__link}>
                                {getMonthName(journal.month)}
                            </Link>
                            <div className={styles.title__series}>
                                No. {journal.issue} ({journal.year})
                            </div>
                        </h2>

                        {journal.description && (
                            <div className={styles.item__description}>
                                <p>{journal.description}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArchivesPage;
