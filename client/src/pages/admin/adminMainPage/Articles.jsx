import React, { useEffect, useState } from 'react';

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        fetch('http://localhost:3001/admin/articles', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(async (res) => {
                if (!res.ok) {
                    const data = await res.json();
                    throw new Error(data.error || 'Ошибка загрузки статей');
                }
                return res.json();
            })
            .then((data) => {
                setArticles(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p style={{ color: 'red' }}>Ошибка: {error}</p>;

    return (
        <div>
            <h2>Все статьи</h2>
            {articles.length === 0 && <p>Статьи не найдены.</p>}
            <ul>
                {articles.map((article) => (
                    <li key={article.id}>
                        <strong>Название:</strong> {article.title} <br />
                        <strong>Авторы:</strong> {article.authors} <br />
                        <strong>Описание:</strong> {article.description} <br />
                        <strong>Журнал:</strong> {article.journal ? `Выпуск ${article.journal.issue}, ${article.journal.year}` : 'Не опубликована'} <br />
                        <strong>Статус:</strong> {article.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Articles;
