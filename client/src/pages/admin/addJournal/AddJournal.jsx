import React, { useState, useContext } from 'react';
import styles from "./AddJournal.module.css";
import { AuthContext } from '../../../contexts/AuthContext';

const monthOptions = [
    { label: 'Январь', value: 1 },
    { label: 'Февраль', value: 2 },
    { label: 'Март', value: 3 },
    { label: 'Апрель', value: 4 },
    { label: 'Май', value: 5 },
    { label: 'Июнь', value: 6 },
    { label: 'Июль', value: 7 },
    { label: 'Август', value: 8 },
    { label: 'Сентябрь', value: 9 },
    { label: 'Октябрь', value: 10 },
    { label: 'Ноябрь', value: 11 },
    { label: 'Декабрь', value: 12 },
];

const AddJournal = () => {
    const { token } = useContext(AuthContext);

    const [issue, setIssue] = useState('');
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [description, setDescription] = useState('');
    const [publicationDate, setPublicationDate] = useState('');
    const [loading, setLoading] = useState(false);

    const resetForm = () => {
        setIssue('');
        setYear('');
        setMonth('');
        setDescription('');
        setPublicationDate('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            alert('Пожалуйста, войдите в систему');
            return;
        }

        if (!issue || !year || !month || !publicationDate) {
            alert('Пожалуйста, заполните все обязательные поля');
            return;
        }

        const issueNum = Number(issue);
        const yearNum = Number(year);
        const monthNum = Number(month);

        if (isNaN(issueNum) || isNaN(yearNum) || isNaN(monthNum)) {
            alert('Issue, год и месяц должны быть числами');
            return;
        }

        const currentYear = new Date().getFullYear();
        if (yearNum < 1900 || yearNum > currentYear + 1) {
            alert('Введите корректный год');
            return;
        }

        const dateParts = publicationDate.split('.');
        if (dateParts.length !== 3) {
            alert('Неверный формат даты. Используйте DD.MM.YYYY');
            return;
        }

        const [dayStr, monthStr, yearStr] = dateParts;
        const day = Number(dayStr);
        const pubMonth = Number(monthStr);
        const pubYear = Number(yearStr);

        if (
            isNaN(day) || isNaN(pubMonth) || isNaN(pubYear) ||
            pubMonth < 1 || pubMonth > 12 || day < 1 || day > 31
        ) {
            alert('Неверные значения даты');
            return;
        }

        const pubDate = new Date(pubYear, pubMonth - 1, day);
        if (isNaN(pubDate.getTime())) {
            alert('Неверная дата публикации');
            return;
        }

        const payload = {
            issue: issueNum,
            year: yearNum,
            month: monthNum,
            description: description.trim() || null,
            publicationDate: pubDate.toISOString(),
        };

        console.log("📤 Отправка данных:", payload);

        try {
            setLoading(true);

            const res = await fetch(`${process.env.REACT_APP_API_URL}/admin/journals`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                const errorMessage = data.error || data.message || 'Неизвестная ошибка';
                alert(`Ошибка: ${errorMessage}`);
                return;
            }

            alert(`Журнал добавлен! ID: ${data.id}`);
            resetForm();
        } catch (err) {
            console.error(err);
            alert('Ошибка сервера');
        } finally {
            setLoading(false);
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
                <label className={styles.label}>Месяц:</label>
                <select
                    className={styles.input}
                    value={month}
                    onChange={e => setMonth(e.target.value)}
                    required
                >
                    <option value="" disabled>Выберите месяц</option>
                    {monthOptions.map((m) => (
                        <option key={m.value} value={m.value}>{m.label}</option>
                    ))}
                </select>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Дата публикации:</label>
                <input
                    className={styles.input}
                    type="text"
                    value={publicationDate}
                    onChange={e => setPublicationDate(e.target.value)}
                    placeholder="Например: 20.07.2025"
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Описание (необязательно):</label>
                <textarea
                    className={styles.textarea}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    rows={4}
                    placeholder="Описание номера, темы выпуска и т.д."
                />
            </div>

            <button
                className={styles.button}
                type="submit"
                disabled={loading}
            >
                {loading ? 'Добавление...' : 'Добавить журнал'}
            </button>
        </form>
    );
};

export default AddJournal;
