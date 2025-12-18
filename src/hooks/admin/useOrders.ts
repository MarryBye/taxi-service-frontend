import { useApiQuery } from "@/utils/useApiQuery";
import { useApiMutation } from "@/utils/useApiMutation";
import * as api from "@/api/admin/orders";

import type { Order, CreateOrder, UpdateOrder } from "@/types/orders";

export function useOrders() {
    return useApiQuery<Order[]>(api.listOrders, []);
}

export function useOrder(orderId: number) {
    return useApiQuery<Order>(() => api.getOrder(orderId), [orderId]);
}

export function useCreateOrder() {
    return useApiMutation<CreateOrder, Order>(api.createorder);
}

export function useUpdateOrder(orderId: number) {
    return useApiMutation<UpdateOrder, Order>((payload) =>
        api.updateOrder(orderId, payload)
    );
}

export function useDeleteOrder() {
    return useApiMutation<number, void>((id) => api.deleteOrder(id));
}