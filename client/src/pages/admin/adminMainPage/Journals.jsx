import React, { useEffect, useState } from 'react';

const Journals = () => {
    const [journals, setJournals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token'); // JWT из localStorage

        fetch('http://localhost:3001/admin/journals', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(async (res) => {
                if (!res.ok) {
                    const data = await res.json();
                    throw new Error(data.error || 'Ошибка загрузки журналов');
                }
                return res.json();
            })
            .then((data) => {
                setJournals(data);
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
            <h2>Список журналов</h2>
            {journals.length === 0 && <p>Журналы не найдены.</p>}
            <ul>
                {journals.map((journal) => (
                    <li key={journal.id}>
                        <strong>Выпуск:</strong> {journal.issue}, <strong>Год:</strong> {journal.year}
                        <br />
                        <strong>Статей в журнале:</strong> {journal.articles.length}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Journals;
