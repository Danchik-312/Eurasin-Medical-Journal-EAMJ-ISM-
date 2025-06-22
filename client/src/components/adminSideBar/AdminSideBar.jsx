import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './AdminSideBar.module.css';
import { AuthContext } from '../../contexts/AuthContext';

const AdminSidebar = () => {
    const {logout} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Очистка токена
        logout();
        navigate('/admin/login'); // Редирект на логин
    };

    return (
        <aside className={styles.sidebar}>
            <h2>Админ-панель</h2>

            <NavLink to="/admin/submitted" className={({ isActive }) => isActive ? styles.active : ''}>
                Поданные статьи
            </NavLink>
            <NavLink to="/admin/journals" end className={({ isActive }) => isActive ? styles.active : ''}>
                Журналы
            </NavLink>
            <NavLink to="/admin/articles" end className={({ isActive }) => isActive ? styles.active : ''}>
                Статьи
            </NavLink>
            <NavLink to="/admin/journals/add" className={({ isActive }) => isActive ? styles.active : ''}>
                Добавить журнал
            </NavLink>
            <NavLink to="/admin/articles/add" className={({ isActive }) => isActive ? styles.active : ''}>
                Добавить статью
            </NavLink>

            <button onClick={handleLogout} className={styles.logoutButton}>
                Выйти
            </button>
        </aside>
    );
};

export default AdminSidebar;
