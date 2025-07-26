import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./CurrentPage.module.css";

const monthNames = [
    "", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const CurrentPage = () => {
    const [journal, setJournal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLatest = async () => {
            try {
                // Получаем список всех журналов, отсортированных по году и месяцу (desc) на бэкенде
                const resList = await fetch("http://localhost:3001/journals");
                if (!resList.ok) throw new Error("Ошибка при получении списка журналов");
                const list = await resList.json();

                if (!list.length) {
                    setJournal(null);
                    return;
                }

                const latestId = list[0].id;
                const resJournal = await fetch(`http://localhost:3001/journals/${latestId}`);
                if (!resJournal.ok) throw new Error("Ошибка при получении последнего журнала");
                const data = await resJournal.json();

                setJournal(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLatest();
    }, []);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;
    if (!journal) return <p>Нет доступных выпусков.</p>;

    const formattedDate = new Date(journal.publicationDate).toLocaleDateString("ru-RU", {
        day: "numeric", month: "long", year: "numeric"
    });

    // сортируем статьи по первой странице
    const sortedArticles = journal.articles
        ? [...journal.articles].sort((a, b) => {
            const startA = parseInt(a.pages.split("-")[0], 10);
            const startB = parseInt(b.pages.split("-")[0], 10);
            return startA - startB;
        })
        : [];

    return (
        <div className={styles.current}>
            <nav className={styles.current__nav}>
                <ol className={styles.nav__menu}>
                    <li>
                        <Link to="/" className={styles.nav__link}>Home</Link>
                        <span className={styles.separator}>/</span>
                    </li>
                    <li>
                        <Link to="/archives" className={styles.nav__link}>Archives</Link>
                        <span className={styles.separator}>/</span>
                    </li>
                    <li>
                        No. {journal.issue}, {journal.year}: {monthNames[journal.month]}
                    </li>
                </ol>
            </nav>

            <h1 className={styles.current__title}>
                No. {journal.issue}, {journal.year}: {monthNames[journal.month]}
            </h1>

            <div className={styles.current__heading}>
                <img
                    src={"/images/cover.jpg"}
                    className={styles.heading__images}
                    alt="cover"
                />
                <div className={styles.heading__content}>
                    <h2 className={styles.heading__subtitle}>{journal.description}</h2>
                </div>
            </div>
            <p className={styles.heading__text}><strong>Published:</strong> {formattedDate}</p>
            <div className={styles.current__section}>
                <h2 className={styles.section__subtitle}>Articles</h2>
                {sortedArticles.length > 0 ? (
                    <ul className={styles.section__table}>
                        {sortedArticles.map(article => (
                            <li key={article.id} className={styles.table__item}>
                                <div className={styles.item__link}>
                                    <h3 className={styles.link__title}>
                                        {article.title}
                                    </h3>
                                    <div className={styles.link__subtitle}>
                                        <p className={styles.subtitle__auth}>{article.authors}</p>
                                        <p className={styles.subtitle__page}>{article.pages}</p>
                                    </div>
                                    <a
                                        href={`http://localhost:3001${article.fileUrl}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.link__down}
                                    >
                                        pdf
                                    </a>
                                </div>
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

export default CurrentPage;
