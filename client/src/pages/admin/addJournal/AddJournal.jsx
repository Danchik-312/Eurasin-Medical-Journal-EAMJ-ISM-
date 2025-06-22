import React, { useState, useContext } from 'react';
import styles from "./AddJournal.module.css";
import { AuthContext } from '../../../contexts/AuthContext';

const AddJournal = () => {
    const { token } = useContext(AuthContext);

    const [issue, setIssue] = useState('');
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!issue || !year || !month) {
            alert('Заполните все поля');
            return;
        }

        if (!token) {
            alert('Пожалуйста, войдите в систему');
            return;
        }

        try {
            const res = await fetch('http://localhost:3001/admin/journals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ issue, year, month }),
            });

            if (!res.ok) {
                const data = await res.json();
                alert(`Ошибка: ${data.error}`);
                return;
            }

            const data = await res.json();
            alert(`Журнал добавлен! ID: ${data.id}`);
            setIssue('');
            setYear('');
            setMonth('');
        } catch (err) {
            alert('Ошибка сервера');
            console.error(err);
        }
    };

    return (
        <form className={styles.formContainer} onSubmit={handleSubmit}>
            <h2 className={styles.formTitle}>Добавить журнал</h2>

            <div className={styles.formGroup}>
                <label className={styles.label}>Выпуск (issue):</label>
                <input
                    className={styles.input}
                    type="number"
                    value={issue}
                    onChange={e => setIssue(e.target.value)}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Год:</label>
                <input
                    className={styles.input}
                    type="number"
                    value={year}
                    onChange={e => setYear(e.target.value)}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Месяц (1-12):</label>
                <input
                    className={styles.input}
                    type="number"
                    value={month}
                    onChange={e => setMonth(e.target.value)}
                    min="1"
                    max="12"
                    required
                />
            </div>

            <button className={styles.button} type="submit">Добавить журнал</button>
        </form>
    );
};

export default AddJournal;
