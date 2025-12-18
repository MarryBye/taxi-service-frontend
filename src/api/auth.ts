import api from '@/utils/api';
import type { AuthUserSchema, RegisterUserSchema } from "@/types/auth";

export async function login(payload: AuthUserSchema) {
    return api.post('/login', payload);
}

export async function register(payload: RegisterUserSchema) {
    return api.post('/register', payload);
}
