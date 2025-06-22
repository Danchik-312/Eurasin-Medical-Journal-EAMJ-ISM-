import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminLoginPage.module.css'; // импорт CSS-модуля

function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('http://localhost:3001/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || 'Ошибка входа');
                return;
            }
            localStorage.setItem('token', data.token);
            navigate('/admin');  // Перейти в админку
            setEmail('');        // Очистить email
            setPassword('');     // Очистить пароль
        } catch {
            setError('Ошибка сети');
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                className={styles.input}
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Пароль"
                className={styles.input}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />
            <button type="submit" className={styles.button}>Войти</button>
            {error && <p className={styles.error}>{error}</p>}
        </form>
    );
}

export default AdminLoginPage;
