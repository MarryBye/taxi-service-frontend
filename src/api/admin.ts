import api from '@/utils/api';

import * as admin_schema from '@/types/admin';
import * as views_schemas from '@/types/views';

export const create_user = async (
    data: admin_schema.CreateUserSchema
): Promise<views_schemas.UsersView> => {
    return api.post('/admin/users', data)
}

export const users_list = async (): Promise<views_schemas.UsersView[]> => {
    return api.get('/admin/users')
}

export const user_info = async (
    userId: number
): Promise<views_schemas.UsersView> => {
    return api.get(`/admin/users/${userId}`)
}

export const client_stats = async (
    userId: number
): Promise<views_schemas.ClientsStatView> => {
    return api.get(`/admin/users/${userId}/stats/client`)
}

export const driver_stats = async (
    userId: number
): Promise<views_schemas.DriversStatView> => {
    return api.get(`/admin/users/${userId}/stats/driver`)
}

export const delete_user = async (
    userId: number
): Promise<null> => {
    return api.delete(`/admin/users/${userId}`)
}

export const update_user = async (
    userId: number,
    data: admin_schema.UpdateUserSchema
): Promise<views_schemas.UsersView> => {
    return api.put(`/admin/users/${userId}`, data)
}

export const create_car = async (
    data: admin_schema.CreateCarSchema
): Promise<views_schemas.CarsView> => {
    return api.post(`/admin/cars`, data)
}

export const cars_list = async (): Promise<views_schemas.CarsView[]> => {
    return api.get(`/admin/cars`)
}

export const car_info = async (
    carId: number
): Promise<views_schemas.CarsView> => {
    return api.get(`/admin/cars/${carId}`)
}

export const delete_car = async (
    carId: number
): Promise<null> => {
    return api.delete(`/admin/cars/${carId}`)
}

export const update_car = async (
    carId: number,
    data: admin_schema.UpdateCarSchema
): Promise<views_schemas.CarsView> => {
    return api.put(`/admin/cars/${carId}`, data)
}

export const orders_list = async (): Promise<views_schemas.OrdersView[]> => {
    return api.get(`/admin/orders`)
}

export const order_info = async (
    orderId: number
): Promise<views_schemas.OrdersView> => {
    return api.get(`/admin/orders/${orderId}`)
}

export const order_stat = async (
    orderId: number
): Promise<views_schemas.OrdersStatView> => {
    return api.get(`/admin/orders/${orderId}/stats`)
}

export const maintenances_list = async (): Promise<views_schemas.MaintenancesView[]> => {
    return api.get(`/admin/maintenances`)
}

export const maintenance_info = async (
    maintenanceId: number
): Promise<views_schemas.MaintenancesView> => {
    return api.get(`/admin/maintenances/${maintenanceId}`)
}

export const create_maintenance = async (
    data: admin_schema.CreateMaintenanceSchema
): Promise<views_schemas.MaintenancesView> => {
    return api.post(`/admin/maintenances`, data)
}

export const delete_maintenance = async (
    maintenanceId: number
): Promise<null> => {
    return api.delete(`/admin/maintenances/${maintenanceId}`)
}

export const update_maintenance = async (
    maintenanceId: number,
    data: admin_schema.UpdateMaintenanceSchema
): Promise<views_schemas.MaintenancesView> => {
    return api.put(`/admin/maintenances/${maintenanceId}`, data)
}

export const create_transaction = async (
    data: admin_schema.CreateTransactionSchema
): Promise<views_schemas.TransactionsView> => {
    return api.post(`/admin/transactions`, data)
}

export const transactions_list = async (): Promise<views_schemas.TransactionsView[]> => {
    return api.get(`/admin/transactions`)
}

export const transaction_info = async (
    transactionId: number
): Promise<views_schemas.TransactionsView> => {
    return api.get(`/admin/transactions/${transactionId}`)
}