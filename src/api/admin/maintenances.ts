import api from '@/utils/api';

import type { UpdateMaintenance, CreateMaintenance } from "@/types/maintenances";

export function listMaintenances() {
    return api.get('/admin/maintenances');
}

export function getMaintenance(maintenanceId: number) {
    return api.get(`/admin/maintenances/${maintenanceId}`);
}

export function createMaintenance(payload: CreateMaintenance) {
    return api.post('/admin/maintenances', payload);
}

export function updateMaintenance(maintenanceId: number, payload: UpdateMaintenance) {
    return api.put(`/admin/maintenances/${maintenanceId}`, payload)
}

export function deleteMaintenance(maintenanceId: number) {
    return api.delete(`/admin/maintenances/${maintenanceId}`);
}