import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    return (
        <button onClick={handleLogout} className="logout-button">
            Выйти
        </button>
    );
};

export default AdminLogout;