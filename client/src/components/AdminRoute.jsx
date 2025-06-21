import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const location = useLocation();
    const token = localStorage.getItem('adminToken');

    if (!token) {
        // Если токена нет, перенаправляем на страницу входа
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    return children;
};

export default AdminRoute;