import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '';

export const adminLogin = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/admin/login`, credentials);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || 'Ошибка входа';
    }
};