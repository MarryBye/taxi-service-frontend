import api from '@/utils/api';

import type { AcceptOrder, CancelOrderSchema, RateOrderSchema } from "@/types/drivers";

export function cancelOrder(payload: CancelOrderSchema) {
    return api.post('/workers/cancel_order', payload);
}

export function acceptOrder(payload: AcceptOrder) {
    return api.post('/workers/accept_order', payload);
}

export function completeOrder() {
    return api.post('/workers/complete_order');
}

export function rateOrder(payload: RateOrderSchema) {
    return api.post('/workers/rate_order', payload);
}

export function submitArrive() {
    return api.post('/workers/submit_arrive');
}

export function submitStart() {
    return api.post('/workers/submit_start');
}

export function acceptableOrders() {
    return api.get('/workers/acceptable_orders');
}

export function currentOrder() {
    return api.get('/workers/current_order');
}

export function history() {
    return api.get('/workers/history');
}

export function stats() {
    return api.get('/workers/stats');
}