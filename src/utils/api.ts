import axios from 'axios';
import { useAuthStore } from '@/store/auth.store';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const { accessToken } = useAuthStore.getState();

    if (accessToken) {
        config.headers.Token = accessToken;
    }

    return config;
});

api.interceptors.response.use(
    (res) => res.data,
    (err) => {
        console.error('API error:', err);
        return Promise.reject(err);
    }
);

export default api;
