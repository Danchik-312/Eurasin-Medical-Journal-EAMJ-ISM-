import React from 'react';
import { useNavigate } from 'react-router-dom';


function AdminMainPage() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/admin/login');
    };

    return (
        <div>
            <h1>Панель администратора</h1>
            <button onClick={logout}>Выйти</button>
            {/* Тут будет админский функционал */}
        </div>
    );
}

export default AdminMainPage;
