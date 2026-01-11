import api from '@/utils/api';

import * as driver_schema from '@/types/workers';
import * as views_schemas from '@/types/views';

export const orders_history = async (): Promise<views_schemas.OrdersView[]> => {
    return api.get('/driver/orders')
}

export const current_order = async (): Promise<views_schemas.OrdersView> => {
    return api.get('/driver/orders/current')
}

export const acceptable_orders = async (): Promise<views_schemas.OrdersView[]> => {
    return api.get('/driver/orders/acceptable')
}

export const order_info = async (
    orderId: number
): Promise<views_schemas.OrdersView> => {
    return api.get(`/driver/orders/${orderId}`)
}

export const order_stat = async (
    orderId: number
): Promise<views_schemas.OrdersStatView> => {
    return api.get(`/driver/orders/${orderId}/stat`)
}

export const accept_order = async (
    orderId: number
): Promise<views_schemas.OrdersView> => {
    return api.post(`/driver/orders/${orderId}/accept`)
}

export const rate_order = async (
    orderId: number,
    data: driver_schema.RateOrderSchema
): Promise<views_schemas.OrdersStatView> => {
    return api.post(`/driver/orders/${orderId}/rate`, data)
}

export const cancel_order = async (
    orderId: number,
    data: driver_schema.CancelOrderSchema
): Promise<views_schemas.OrdersStatView> => {
    return api.post(`/driver/orders/${orderId}/cancel`, data)
}

export const submit_arrival = async (
    orderId: number
): Promise<views_schemas.OrdersView> => {
    return api.post(`/driver/orders/${orderId}/arrive`)
}

export const submit_start = async (
    orderId: number
): Promise<views_schemas.OrdersView> => {
    return api.post(`/driver/orders/${orderId}/start`)
}

export const submit_finish = async (
    orderId: number
): Promise<views_schemas.OrdersView> => {
    return api.post(`/driver/orders/${orderId}/finish`)
}

export const stats = async (): Promise<views_schemas.DriversStatView> => {
    return api.get(`/driver/stats`)
}