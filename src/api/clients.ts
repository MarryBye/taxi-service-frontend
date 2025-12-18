import api from '@/utils/api';

import type { CancelOrder, MakeOrder, RateOrder, UpdateProfile } from "@/types/clients";

export function cancelOrder(payload: CancelOrder) {
    return api.post('/authorized/cancel_order', payload);
}

export function makeOrder(payload: MakeOrder) {
    return api.post('/authorized/make_order', payload);
}

export function rateOrder(payload: RateOrder) {
    return api.post('/authorized/rate_order', payload);
}

export function updateProfile(payload: UpdateProfile) {
    return api.put('/authorized/update_profile', payload);
}

export function getHistory() {
    return api.get('/authorized/get_history');
}

export function currentOrder() {
    return api.get('/authorized/current_order');
}

export function getProfile() {
    return api.get('/authorized/profile');
}

