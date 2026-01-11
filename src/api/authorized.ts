import api from '@/utils/api';

import * as client_schemas from '@/types/authorized';
import * as views_schemas from '@/types/views';

export const get_profile = async (): Promise<views_schemas.UsersView> => {
    return api.get('/client/profile')
}

export const update_profile = async (
    data: client_schemas.UpdateProfile
): Promise<views_schemas.UsersView> => {
    return api.put('/client/profile', data)
}

export const make_order = async (
    data: client_schemas.MakeOrderSchema
): Promise<views_schemas.OrdersView> => {
    return api.post('/client/orders', data)
}

export const orders_history = async (): Promise<views_schemas.OrdersView[]> => {
    return api.get('/client/orders')
}

export const current_order = async (): Promise<views_schemas.OrdersView> => {
    return api.get('/client/orders/current')
}

export const order_info = async (
    orderId: number
): Promise<views_schemas.OrdersView> => {
    return api.get(`/client/orders/${orderId}`)
}

export const order_stat = async (
    orderId: number
): Promise<views_schemas.OrdersStatView> => {
    return api.get(`/client/orders/${orderId}/stat`)
}

export const cancel_order = async (
    orderId: number,
    data: client_schemas.CancelOrderSchema
): Promise<views_schemas.OrdersStatView> => {
    return api.post(`/client/orders/${orderId}/cancel`, data)
}

export const rate_order = async (
    orderId: number,
    data: client_schemas.RateOrderSchema
): Promise<views_schemas.OrdersStatView> => {
    return api.post(`/client/orders/${orderId}/rate`, data)
}

export const stats = async (): Promise<views_schemas.ClientsStatView> => {
    return api.get('/client/stats')
}