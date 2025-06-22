import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function isTokenValid(token) {
    if (!token) return false;
    try {
        const { exp } = jwtDecode(token);
        return Date.now() < exp * 1000;
    } catch {
        return false;
    }
}

function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token');

    if (!isTokenValid(token)) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
}

export default ProtectedRoute;
