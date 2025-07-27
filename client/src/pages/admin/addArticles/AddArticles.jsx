import React, { useState, useEffect, useContext } from 'react';
import styles from './AddArticles.module.css';
import { AuthContext } from '../../../contexts/AuthContext';

const AddArticle = () => {
    const [title, setTitle] = useState('');
    const [authors, setAuthors] = useState('');
    const [pages, setPages] = useState('');
    const [journalId, setJournalId] = useState('');
    const [file, setFile] = useState(null);
    const [journals, setJournals] = useState([]);
    const [message, setMessage] = useState('');
    const [description, setDescription] = useState('');

    const { token } = useContext(AuthContext);

    useEffect(() => {
        if (!token) {
            setMessage('Пожалуйста, войдите в систему для добавления статьи');
            return;
        }

        fetch('http://localhost:3001/api/admin/journals', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => {
                if (!res.ok) throw new Error('Ошибка загрузки журналов');
                return res.json();
            })
            .then(data => setJournals(data))
            .catch(err => {
                console.error(err);
                setMessage('Не удалось загрузить журналы');
            });
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            setMessage('Пожалуйста, войдите в систему');
            return;
        }

        if (!journalId || !title || !authors || !pages) {
            setMessage('Пожалуйста, заполните все поля');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('authors', authors);
        formData.append('pages', pages);
        formData.append('journalId', journalId);
        formData.append('description', description);
        if (file) formData.append('file', file);

        try {
            const res = await fetch('http://localhost:3001/api/admin/articles', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Ошибка при добавлении статьи');
            }

            setMessage('Статья успешно добавлена!');
            setTitle('');
            setAuthors('');
            setPages('');
            setJournalId('');
            setFile(null);
        } catch (err) {
            setMessage(err.message);
        }
    };

    return (
        <form className={styles.formContainer} onSubmit={handleSubmit}>
            <h2 className={styles.formTitle}>Добавить статью</h2>

            {message && <p style={{color: 'red', textAlign: 'center'}}>{message}</p>}

            <div className={styles.formGroup}>
                <label className={styles.label}>Название статьи:</label>
                <input
                    className={styles.input}
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Автор(ы):</label>
                <input
                    className={styles.input}
                    type="text"
                    value={authors}
                    onChange={e => setAuthors(e.target.value)}
                    required
                    placeholder="Введите авторов через запятую"
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Описание статьи:</label>
                <textarea
                    className={styles.input}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Краткое описание содержания статьи"
                    rows={4}
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Страницы:</label>
                <input
                    className={styles.input}
                    type="text"
                    value={pages}
                    onChange={e => setPages(e.target.value)}
                    placeholder="например: 10-20"
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Журнал:</label>
                <select
                    className={styles.select}
                    value={journalId}
                    onChange={e => setJournalId(e.target.value)}
                    required
                >
                    <option value="">Выберите журнал</option>
                    {journals.map(journal => (
                        <option key={journal.id} value={journal.id}>
                            Выпуск {journal.issue} — {journal.year} / Месяц {journal.month}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Файл (PDF):</label>
                <input
                    className={styles.input}
                    type="file"
                    accept=".pdf"
                    onChange={e => setFile(e.target.files[0])}
                />
            </div>

            <button className={styles.button} type="submit">
                Добавить статью
            </button>
        </form>
    );
};

export default AddArticle;
