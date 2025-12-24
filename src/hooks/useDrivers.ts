import { useApiQuery } from "@/utils/useApiQuery";
import { useApiMutation } from "@/utils/useApiMutation";

import * as driversApi from "@/api/worker";
import * as driversTypes from "@/types/workers";

import * as views from "@/types/views";

export function useDriverOrdersHistory() {
    return useApiQuery<views.OrdersView[]>(
        () => driversApi.orders_history(),
        []
    );
}

export function useDriverCurrentOrder() {
    return useApiQuery<views.OrdersView>(
        () => driversApi.current_order(),
        []
    );
}

export function useAcceptableOrders() {
    return useApiQuery<views.OrdersView[]>(
        () => driversApi.acceptable_orders(),
        []
    );
}

export function useDriverOrderStat(orderId: number | null) {
    return useApiQuery<views.OrdersStatView>(
        () => {
            if (!orderId) {
                return Promise.reject("orderId is null");
            }
            return driversApi.order_stat(orderId);
        },
        [orderId]
    );
}

export function useAcceptOrder(orderId: number) {
    return useApiMutation<void, views.OrdersView>(
        () => driversApi.accept_order(orderId)
    );
}

export function useDriverCancelOrder(orderId: number) {
    return useApiMutation<
        driversTypes.CancelOrderSchema,
        views.OrdersStatView
    >((data) => driversApi.cancel_order(orderId, data));
}

export function useDriverRateOrder(orderId: number) {
    return useApiMutation<
        driversTypes.RateOrderSchema,
        views.OrdersStatView
    >((data) => driversApi.rate_order(orderId, data));
}

export function useSubmitArrival(orderId: number) {
    return useApiMutation<void, views.OrdersView>(
        () => driversApi.submit_arrival(orderId)
    );
}

export function useSubmitStart(orderId: number) {
    return useApiMutation<void, views.OrdersView>(
        () => driversApi.submit_start(orderId)
    );
}

export function useSubmitFinish(orderId: number) {
    return useApiMutation<void, views.OrdersView>(
        () => driversApi.submit_finish(orderId)
    );
}

export function useDriverStats() {
    return useApiQuery<views.DriversStatView>(
        () => driversApi.stats(),
        []
    );
}
