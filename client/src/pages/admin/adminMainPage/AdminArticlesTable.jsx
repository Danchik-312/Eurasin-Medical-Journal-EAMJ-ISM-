import React, { useEffect, useState, useContext } from 'react';
import styles from './AdminArticlesTable.module.css';
import { AuthContext } from '../../../contexts/AuthContext';

const ArticlesTable = () => {
    const { token } = useContext(AuthContext);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch('http://localhost:3001/admin/articles', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке статей');
                }
                const data = await response.json();
                setArticles(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, [token]);

    if (loading) return <div className={styles.container}>Загрузка...</div>;
    if (error) return <div className={styles.container}>Ошибка: {error}</div>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Список статей</h2>
            </div>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead className={styles.thead}>
                    <tr>
                        <th className={styles.th}>Название</th>
                        <th className={styles.th}>Авторы</th>
                        <th className={styles.th}>Страницы</th>
                        <th className={styles.th}>Журнал</th>
                        <th className={styles.th}>Статус</th>
                    </tr>
                    </thead>
                    <tbody>
                    {articles.length > 0 ? (
                        articles.map((article) => (
                            <tr key={article.id} className={styles.tr}>
                                <td className={styles.td}>{article.title}</td>
                                <td className={styles.td}>{article.authors}</td>
                                <td className={styles.td}>{article.pages}</td>
                                <td className={styles.td}>
                                    {article.journal?.issue} / {article.journal?.year}
                                </td>
                                <td className={styles.td}>{article.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className={styles.td}>Нет данных</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ArticlesTable;
