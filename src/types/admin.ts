import type * as enums from '@/types/enums/db';
import type * as common from '@/types/common';

export type CreateCarSchema = {
    mark: string;
    model: string;
    number_plate: string;
    city_id: number;
    color: enums.Colors;
    car_class: enums.CarClasses;
    car_status: enums.CarStatuses;
    driver_id: number | null;
}

export type UpdateCarSchema = {
    mark: string | null;
    model: string | null;
    number_plate: string | null;
    city_id: number | null;
    color: enums.Colors | null;
    car_class: enums.CarClasses | null;
    car_status: enums.CarStatuses | null;
    driver_id: number | null;
}

export type CreateMaintenanceSchema = {
    car_id: number;
    description: string;
    cost: number;
    status: enums.MaintenanceStatuses;
    maintenance_start: string;
    maintenance_end: string;
}

export type UpdateMaintenanceSchema = {
    status: enums.MaintenanceStatuses | null;
}

export type CreateTransactionSchema = {
    user_id: number;
    balance_type: enums.BalanceTypes;
    transaction_type: enums.TransactionType;
    payment_method: enums.PaymentMethods;
    amount: number;
}

export type CreateUserSchema = {
    login: string;
    password: string;
    first_name: string;
    last_name: string;
    email: string;
    tel_number: string;
    city_id: number;
    role: enums.UserRoles;
}

export type UpdateUserSchema = {
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    tel_number: string | null;
    city_id: number | null;
    password: string | null;
    role: enums.UserRoles | null;
}

export type UpdateOrderSchema = {
    status: enums.OrderStatuses;
    order_class: enums.CarClasses;
}