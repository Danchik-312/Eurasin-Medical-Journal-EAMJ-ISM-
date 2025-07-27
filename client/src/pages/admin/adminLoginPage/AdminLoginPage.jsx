import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminLoginPage.module.css';
import { AuthContext } from '../../../contexts/AuthContext';

function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { login } = useContext(AuthContext); // достаем функцию login из контекста

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || 'Ошибка входа');
                return;
            }
            login(data.token);  // вызываем login из контекста, он сохранит токен в localStorage и в состоянии
            navigate('/admin');  // переходим в админку
            setEmail('');
            setPassword('');
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
