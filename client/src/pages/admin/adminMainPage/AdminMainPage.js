import React from 'react';
import AdminLogout from "../../../components/AdminLogout";

const AdminMainPage = () => {
    return (
        <div className="admin-main">
            <h1>Административная панель</h1>
            <AdminLogout />

            {/* Контент админки */}
            <div className="admin-content">
                <p>Добро пожаловать в админ-панель!</p>
                {/* Здесь будет ваш админский контент */}
            </div>
        </div>
    );
};

export default AdminMainPage;