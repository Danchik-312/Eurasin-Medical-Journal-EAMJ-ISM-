import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../../api/adminApi.js";
import styles from "./AdminLoginPage.module.css";

const AdminLoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const loginMutation = useMutation({
        mutationFn: adminLogin,
        onSuccess: (data) => {
            // Сохраняем токен в localStorage
            localStorage.setItem("adminToken", data.token);
            // Перенаправляем в админ-панель
            navigate("/admin/main");
        },
        onError: (error) => {
            setError(error.message || "Ошибка входа. Проверьте данные.");
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        loginMutation.mutate({ email, password });
    };

    return (
        <div className={styles.AdminLogin}>
            <div className={styles.loginContainer}>
                <h2>Вход в административную панель</h2>

                {error && <div className={styles.errorMessage}>{error}</div>}

                <form onSubmit={handleSubmit} className={styles.loginForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loginMutation.isPending}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password">Пароль</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loginMutation.isPending}
                        />
                    </div>

                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={loginMutation.isPending}
                    >
                        {loginMutation.isPending ? "Вход..." : "Войти"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLoginPage;