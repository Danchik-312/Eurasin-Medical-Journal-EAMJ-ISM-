import React, { useEffect, useState } from 'react';

const SubmittedArticles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        fetch(`${process.env.REACT_APP_API_URL}/admin/articles/pending`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(async (res) => {
                if (!res.ok) {
                    const data = await res.json();
                    throw new Error(data.error || 'Ошибка загрузки поданных статей');
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
            <h2>Поданные статьи</h2>
            {articles.length === 0 && <p>Поданных статей не найдено.</p>}
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

export default SubmittedArticles;
