import api from '@/utils/api';

import type { CreateOrder, UpdateOrder } from "@/types/orders";

export function listOrders() {
    return api.get('/admin/orders');
}

export function getOrder(orderId: number) {
    return api.get(`/admin/orders/${orderId}`);
}

export function createorder(payload: CreateOrder) {
    return api.post('/admin/orders', payload);
}

export function updateOrder(orderId: number, payload: UpdateOrder) {
    return api.put(`/admin/orders/${orderId}`, payload)
}

export function deleteOrder(orderId: number) {
    return api.delete(`/admin/orders/${orderId}`);
}