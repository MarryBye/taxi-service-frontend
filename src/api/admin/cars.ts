import api from '@/utils/api';

import type { UpdateCar, CreateCar } from "@/types/cars";

export function listCars() {
    return api.get('/admin/cars');
}

export function getCar(carId: number) {
    return api.get(`/admin/cars/${carId}`);
}

export function createCar(payload: CreateCar) {
    return api.post('/admin/cars', payload);
}

export function updateCar(carId: number, payload: UpdateCar) {
    return api.put(`/admin/cars/${carId}`, payload)
}

export function deleteCar(carId: number) {
    return api.delete(`/admin/cars/${carId}`);
}