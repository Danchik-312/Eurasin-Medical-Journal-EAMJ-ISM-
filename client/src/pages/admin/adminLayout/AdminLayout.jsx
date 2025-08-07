import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSideBar from '../../../components/adminSideBar/AdminSideBar';
import { authorizedFetch } from '../../../utils/api';
import styles from './AdminLayout.module.css';

const AdminLayout = () => {
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const res = await authorizedFetch(`${process.env.REACT_APP_API_URL}/admin/adminProfile`);
                if (!res.ok) throw new Error('Ошибка авторизации');
                const data = await res.json();
                setAdmin(data);
            } catch (err) {
                console.error('Ошибка при загрузке профиля админа:', err);
            }
        };

        fetchAdmin();
    }, []);

    return (
        <div className={styles.adminLayout}>
            <AdminSideBar />
            <main className={styles.mainContent}>
                <header className={styles.header}>
                    <h1>Admin Panel</h1>
                    <div className={styles.profile}>
                        <span>{admin ? `${admin.name} — ${admin.position}` : 'Загрузка...'}</span>
                        <img src="/images/adminAvatar.png" alt="admin" className={styles.avatar} />
                    </div>
                </header>
                <div className={styles.outletWrapper}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
