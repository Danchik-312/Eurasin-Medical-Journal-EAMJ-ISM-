import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./JournalPage.module.css";

const monthNames = [
    '', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const JournalPage = () => {
    const { id } = useParams();
    const [journal, setJournal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJournal = async () => {
            try {
                const res = await fetch(`http://localhost:3001/journals/${id}`);
                if (!res.ok) throw new Error("Ошибка загрузки");
                const data = await res.json();
                setJournal(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJournal();
    }, [id]);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;
    if (!journal) return <p>Журнал не найден</p>;

    const formattedDate = new Date(journal.publicationDate).toLocaleDateString("en-EN", {
        day: "numeric", month: "long", year: "numeric"
    });

    // Сортируем статьи по номеру первой страницы
    const sortedArticles = journal.articles
        ? [...journal.articles].sort((a, b) => {
            const startA = parseInt(a.pages.split('-')[0], 10);
            const startB = parseInt(b.pages.split('-')[0], 10);
            return startA - startB;
        })
        : [];

    return (
        <div className={styles.journal}>
            <nav className={styles.journal__nav}>
                <ol className={styles.nav__menu}>
                    <li><Link to="/" className={styles.nav__link}>Home</Link><span
                        className={styles.separator}>/</span></li>
                    <li><Link to="/archives" className={styles.nav__link}>Archives</Link><span
                        className={styles.separator}>/</span></li>
                    <li>No. {journal.issue}, {journal.year}: {monthNames[journal.month]}</li>
                </ol>
            </nav>
            <h1 className={styles.journal__title}>No. {journal.issue}, {journal.year}: {monthNames[journal.month]}</h1>
            <div className={styles.journal__heading}>
                <img
                    src={journal.coverUrl || "https://www.ejbe.org/public/journals/1/cover_issue_40_en_US.jpg"}
                    alt="Обложка журнала"
                    className={styles.heading__images}
                />
                <p>{journal.description}</p>
            </div>
            <p><strong>Дата публикации:</strong> {formattedDate}</p>
            <div className={styles.journal__section}>
                <h2 className={styles.section__subtitle}>Articles</h2>
                {sortedArticles.length > 0 ? (
                    <ul className={styles.section__table}>
                        {sortedArticles.map((article) => (
                            <li key={article.id} className={styles.table__item}>
                                <h3 className={styles.link__title}>{article.title}</h3>
                                <div className={styles.link__subtitle}>
                                    <p className={styles.subtitle__auth}>{article.authors}</p>
                                    <p className={styles.subtitle__page}>{article.pages}</p>
                                </div>
                                <a
                                    href={`http://localhost:3001${article.fileUrl}`}
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.link__down}
                                >
                                    PDF
                                </a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Пока нет опубликованных статей.</p>
                )}
            </div>
        </div>
    );
};

export default JournalPage;
