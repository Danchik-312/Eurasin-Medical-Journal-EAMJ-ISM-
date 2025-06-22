import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    // При инициализации подгружаем токен из localStorage
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    // Функция для входа — сохраняем токен и в state, и в localStorage
    const login = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    // Функция для выхода — чистим токен из state и localStorage
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    const isLoggedIn = !!token;

    return (
        <AuthContext.Provider value={{ token, login, logout, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};
