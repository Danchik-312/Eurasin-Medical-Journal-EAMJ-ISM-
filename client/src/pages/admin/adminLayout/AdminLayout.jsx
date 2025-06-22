import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSideBar from '../../../components/adminSideBar/AdminSideBar';
import styles from './AdminLayout.module.css';

const AdminLayout = () => {
    return (
        <div className={styles.adminLayout}>
            <AdminSideBar />
            <main className={styles.mainContent}>
                <header className={styles.header}>
                    <h1>Admin Panel</h1>
                    <div className={styles.profile}>
                        <span>Admin</span>
                        <img src="/avatar.png" alt="admin" className={styles.avatar} />
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
