import api from './api';

export type LoginPayload = {
    login: string;
    password: string;
};

export type RegisterPayload = {
    login: string;
    email: string;
    tel_number: string;
    password: string;
    first_name: string;
    last_name: string;
    country: string;
    city: string;
};

export async function login(payload: LoginPayload) {
    return api.post('/login', payload);
}

export async function register(payload: RegisterPayload) {
    return api.post('/register', payload);
}

export async function logout() {
    return api.get('/logout');
}
