import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './AdminMainPage.module.css';

const AdminMainPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <Outlet />
            </div>
        </div>
    );
};

export default AdminMainPage;
