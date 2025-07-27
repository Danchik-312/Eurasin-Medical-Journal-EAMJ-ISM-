import React, { useEffect, useState, useContext } from 'react';
import styles from './AdminJournalsTable.module.css';
import { AuthContext } from '../../../contexts/AuthContext';

const JournalsTable = () => {
    const [journals, setJournals] = useState([]);
    const [search, setSearch] = useState('');
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchJournals = async () => {
            try {
                const res = await fetch('http://localhost:3001/api/admin/journals', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!res.ok) throw new Error('Ошибка при загрузке журналов');
                const data = await res.json();
                setJournals(data);
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchJournals();
    }, [token]);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Вы действительно хотите удалить журнал?');
        if (!confirmDelete) return;

        try {
            const res = await fetch(`http://localhost:3001/api/admin/journals/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Ошибка при удалении');
            }

            // Удаляем из локального состояния
            setJournals(prev => prev.filter(j => j.id !== id));
        } catch (err) {
            console.error(err.message);
            alert(`Ошибка: ${err.message}`);
        }
    };

    const filtered = journals.filter(j =>
        `${j.issue} ${j.year} ${j.month}`.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Журналы</h2>
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Поиск по выпуску/году/месяцу..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead className={styles.thead}>
                    <tr>
                        <th className={styles.th}>ID</th>
                        <th className={styles.th}>Выпуск</th>
                        <th className={styles.th}>Год</th>
                        <th className={styles.th}>Месяц</th>
                        <th className={styles.th}>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filtered.map((journal) => (
                        <tr key={journal.id} className={styles.tr}>
                            <td className={styles.td}>{journal.id}</td>
                            <td className={styles.td}>{journal.issue}</td>
                            <td className={styles.td}>{journal.year}</td>
                            <td className={styles.td}>{journal.month}</td>
                            <td className={styles.td}>
                                <div className={styles.actions}>
                                    <button
                                        className={styles.button}
                                        onClick={() => handleDelete(journal.id)}
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {filtered.length === 0 && (
                        <tr>
                            <td className={styles.td} colSpan="5">Ничего не найдено</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default JournalsTable;
