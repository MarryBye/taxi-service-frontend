import api from '@/utils/api';

import type { AdminUpdateUser, CreateUser } from "@/types/users";

export function listUsers() {
    return api.get('/admin/users');
}

export function getUser(userId: number) {
    return api.get(`/admin/users/${userId}`);
}

export function createUser(payload: CreateUser) {
    return api.post('/admin/users', payload);
}

export function updateUser(userId: number, payload: AdminUpdateUser) {
    return api.put(`/admin/users/${userId}`, payload)
}

export function deleteUser(userId: number) {
    return api.delete(`/admin/users/${userId}`);
}