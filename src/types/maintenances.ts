import type { MaintenanceStatus } from "@/types/db";
import type { Address } from "@/types/common";

export type BaseMaintenance<T extends object = {}> = {
    car_id: number;
    description: string;
    cost: number;
    status: MaintenanceStatus;
    maintenance_start: string;
    maintenance_end: string;
} & T;

export type Maintenance = BaseMaintenance<{
    id: number;
    created_at: string;
    changed_at: string;
}>;

export type CreateMaintenance = BaseMaintenance<{
    car_id: number;
    description: string;
    cost: number;
    status: MaintenanceStatus;
}>;

export type UpdateMaintenance = {
    description?: string;
    cost?: number;
    status?: MaintenanceStatus;
};