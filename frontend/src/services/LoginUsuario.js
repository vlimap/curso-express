import React from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const LoginUsuario = async (email, senha) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, senha });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error, 'Erro ao tentar fazer login');
    }
};

const LogoutUsuario = () => {
    localStorage.removeItem('token');
};

const getCurrentUser = () => {
    return localStorage.getItem('token');
};

export default {
    LoginUsuario,
    LogoutUsuario,
    getCurrentUser
};

