import React, { useEffect, useState, useContext } from 'react';
import styles from './AdminJournalsTable.module.css';
import { AuthContext } from '../../../contexts/AuthContext';

const JournalsTable = () => {
    const { token } = useContext(AuthContext);

    const [journals, setJournals] = useState([]);
    const [search, setSearch] = useState('');
    const [editingJournal, setEditingJournal] = useState(null);
    const [formValues, setFormValues] = useState({
        issue: '',
        year: '',
        month: '',
        description: '',
        publicationDate: '',
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchJournals = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_URL}/admin/journals`, {
                    headers: { Authorization: `Bearer ${token}` },
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
        if (!window.confirm('Вы действительно хотите удалить журнал?')) return;

        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/admin/journals/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Ошибка при удалении');
            }
            setJournals(prev => prev.filter(j => j.id !== id));
        } catch (err) {
            alert(`Ошибка: ${err.message}`);
        }
    };

    const handleEdit = (journal) => {
        setEditingJournal(journal);
        setFormValues({
            issue: journal.issue,
            year: journal.year,
            month: journal.month,
            description: journal.description || '',
            publicationDate: journal.publicationDate ? journal.publicationDate.slice(0, 10) : '',
        });
    };

    const handleSave = async () => {
        // Проверка обязательных числовых полей
        if (
            formValues.issue === '' || formValues.issue === null || formValues.issue === undefined ||
            formValues.year === '' || formValues.year === null || formValues.year === undefined ||
            formValues.month === '' || formValues.month === null || formValues.month === undefined
        ) {
            alert('Поля Выпуск, Год и Месяц обязательны для заполнения');
            return;
        }

        // Дополнительная проверка месяца
        if (formValues.month < 1 || formValues.month > 12) {
            alert('Месяц должен быть от 1 до 12');
            return;
        }

        setSaving(true);

        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/admin/journals/${editingJournal.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    issue: Number(formValues.issue),
                    year: Number(formValues.year),
                    month: Number(formValues.month),
                    description: formValues.description.trim(),
                    publicationDate: formValues.publicationDate ? formValues.publicationDate : null,
                }),
            });

            if (!res.ok) throw new Error('Ошибка при сохранении');

            const updated = await res.json();
            setJournals(prev => prev.map(j => (j.id === updated.id ? updated : j)));
            setEditingJournal(null);
        } catch (err) {
            alert(err.message || 'Ошибка при сохранении');
        } finally {
            setSaving(false);
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

            {editingJournal && (
                <div className={styles.editForm}>
                    <h3>Редактирование журнала</h3>
                    <input
                        type="number"
                        className={styles.editInput}
                        placeholder="Выпуск"
                        value={formValues.issue}
                        onChange={(e) => setFormValues({ ...formValues, issue: e.target.value ? Number(e.target.value) : '' })}
                    />
                    <input
                        type="number"
                        className={styles.editInput}
                        placeholder="Год"
                        value={formValues.year}
                        onChange={(e) => setFormValues({ ...formValues, year: e.target.value ? Number(e.target.value) : '' })}
                    />
                    <input
                        type="number"
                        className={styles.editInput}
                        placeholder="Месяц"
                        value={formValues.month}
                        onChange={(e) => setFormValues({ ...formValues, month: e.target.value ? Number(e.target.value) : '' })}
                        min={1}
                        max={12}
                    />
                    <input
                        type="text"
                        className={styles.editInput}
                        placeholder="Описание"
                        value={formValues.description}
                        onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                    />
                    <input
                        type="date"
                        className={styles.editInput}
                        placeholder="Дата публикации"
                        value={formValues.publicationDate}
                        onChange={(e) => setFormValues({ ...formValues, publicationDate: e.target.value })}
                    />
                    <button className={styles.editButton} onClick={handleSave} disabled={saving}>
                        {saving ? 'Сохранение...' : 'Сохранить'}
                    </button>
                    <button className={styles.cancelButton} onClick={() => setEditingJournal(null)} disabled={saving}>
                        Отмена
                    </button>
                </div>
            )}

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
                    {filtered.length > 0 ? (
                        filtered.map((journal) => (
                            <tr key={journal.id} className={styles.tr}>
                                <td className={styles.td}>{journal.id}</td>
                                <td className={styles.td}>{journal.issue}</td>
                                <td className={styles.td}>{journal.year}</td>
                                <td className={styles.td}>{journal.month}</td>
                                <td className={styles.td}>
                                    <div className={styles.actions}>
                                        <button className={styles.button} onClick={() => handleEdit(journal)}>
                                            Редактировать
                                        </button>
                                        <button className={`${styles.button} ${styles.deleteButton}`} onClick={() => handleDelete(journal.id)}>
                                            Удалить
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className={styles.td} colSpan="5">
                                Ничего не найдено
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default JournalsTable;
