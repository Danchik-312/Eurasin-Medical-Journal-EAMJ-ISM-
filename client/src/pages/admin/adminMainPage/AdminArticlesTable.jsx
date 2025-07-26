import React, { useEffect, useState, useContext } from 'react';
import styles from './AdminArticlesTable.module.css';
import { AuthContext } from '../../../contexts/AuthContext';

const ArticlesTable = () => {
    const { token } = useContext(AuthContext);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingArticle, setEditingArticle] = useState(null); // 👈 Статья для редактирования
    const [formValues, setFormValues] = useState({ title: '', authors: '', pages: '' });

    const fetchArticles = async () => {
        try {
            const response = await fetch('http://localhost:3001/admin/articles', {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) throw new Error('Ошибка при загрузке статей');
            const data = await response.json();
            setArticles(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, [token]);

    const handleDelete = async (id) => {
        if (!window.confirm('Удалить статью?')) return;
        try {
            const res = await fetch(`http://localhost:3001/admin/articles/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error();
            setArticles(prev => prev.filter(article => article.id !== id));
        } catch {
            alert('Ошибка при удалении');
        }
    };

    const handleEdit = (article) => {
        setEditingArticle(article);
        setFormValues({ title: article.title, authors: article.authors, pages: article.pages });
    };

    const handleSave = async () => {
        try {
            const res = await fetch(`http://localhost:3001/admin/articles/${editingArticle.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formValues),
            });
            if (!res.ok) throw new Error();

            const updated = await res.json();
            setArticles(prev =>
                prev.map(a => (a.id === updated.id ? updated : a))
            );
            setEditingArticle(null);
        } catch (err) {
            alert('Ошибка при сохранении');
        }
    };

    if (loading) return <div className={styles.container}>Загрузка...</div>;
    if (error) return <div className={styles.container}>Ошибка: {error}</div>;

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Список статей</h2>

            {editingArticle && (
                <div className={styles.editForm}>
                    <h3>Редактирование статьи</h3>
                    <input
                        className={styles.editInput}
                        type="text"
                        value={formValues.title}
                        onChange={(e) => setFormValues({ ...formValues, title: e.target.value })}
                        placeholder="Название"
                    />
                    <input
                        className={styles.editInput}
                        type="text"
                        value={formValues.authors}
                        onChange={(e) => setFormValues({ ...formValues, authors: e.target.value })}
                        placeholder="Авторы"
                    />
                    <input
                        className={styles.editInput}
                        type="text"
                        value={formValues.pages}
                        onChange={(e) => setFormValues({ ...formValues, pages: e.target.value })}
                        placeholder="Страницы"
                    />
                    <button className={styles.editButton} onClick={handleSave}>Сохранить</button>
                    <button className={styles.cancelButton} onClick={() => setEditingArticle(null)}>Отмена</button>
                </div>
            )}

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>Название</th>
                        <th>Авторы</th>
                        <th>Страницы</th>
                        <th>Журнал</th>
                        <th>Статус</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {articles.length > 0 ? (
                        articles.map((article) => (
                            <tr key={article.id}>
                                <td>{article.title}</td>
                                <td>{article.authors}</td>
                                <td>{article.pages}</td>
                                <td>{article.journal?.issue} / {article.journal?.year}</td>
                                <td>{article.status}</td>
                                <td>
                                    <button
                                        className={styles.actionButton}
                                        onClick={() => handleEdit(article)}
                                    >
                                        Редактировать
                                    </button>
                                    <button
                                        className={`${styles.actionButton} ${styles.deleteButton}`}
                                        onClick={() => handleDelete(article.id)}
                                    >
                                        Удалить
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">Нет данных</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ArticlesTable;
