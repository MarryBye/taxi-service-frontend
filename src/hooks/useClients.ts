import { useEffect } from "react";
import { useApiQuery } from "@/utils/useApiQuery";
import { useApiMutation } from "@/utils/useApiMutation";
import { useAuthStore } from "@/store/auth.store";

import * as authorizedApi from "@/api/authorized";
import * as authorizedTypes from "@/types/authorized";

import * as views from "@/types/views";

export function useProfile() {
    const setUser = useAuthStore((s) => s.setUser);

    const query = useApiQuery<views.UsersView>(
        authorizedApi.get_profile,
        []
    );

    useEffect(() => {
        if (!query.data) return;

        setUser(query.data);
    }, [query.data, setUser]);

    return query;
}

export function useUpdateProfile() {
    return useApiMutation<
        authorizedTypes.UpdateProfile,
        views.UsersView
    >(authorizedApi.update_profile);
}

export function useOrdersHistory() {
    return useApiQuery<views.OrdersView[]>(
        () => authorizedApi.orders_history(),
        []
    );
}

export function useCurrentOrder() {
    return useApiQuery<views.OrdersView>(
        () => authorizedApi.current_order(),
        []
    );
}

export function useOrderInfo(orderId: number | null) {
    return useApiQuery<views.OrdersStatView>(
        () => {
            if (!orderId) {
                return Promise.reject("orderId is null");
            }
            return authorizedApi.order_info(orderId);
        },
        [orderId]
    );
}

export function useMakeOrder() {
    return useApiMutation<
        authorizedTypes.MakeOrderSchema,
        views.OrdersView
    >(authorizedApi.make_order);
}

export function useCancelOrder(orderId: number) {
    return useApiMutation<
        authorizedTypes.CancelOrderSchema,
        views.OrdersStatView
    >((data) => authorizedApi.cancel_order(orderId, data));
}

export function useRateOrder(orderId: number) {
    return useApiMutation<
        authorizedTypes.RateOrderSchema,
        views.OrdersStatView
    >((data) => authorizedApi.rate_order(orderId, data));
}

export function useClientStats() {
    return useApiQuery<views.ClientsStatView>(
        () => authorizedApi.stats(),
        []
    );
}
