import axios from 'axios';
import { useAuthStore } from '@/store/auth.store';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const { accessToken, tokenType } = useAuthStore.getState();

    if (accessToken && tokenType) {
        config.headers.Token = `${accessToken}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response?.status === 401) {
            useAuthStore.getState().clearAuth();
        }

        return Promise.reject(error);
    }
);

export default api;
