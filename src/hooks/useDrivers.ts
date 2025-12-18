import { useApiQuery } from "@/utils/useApiQuery";
import { useApiMutation } from "@/utils/useApiMutation";
import * as api from "@/api/drivers";

import type { AcceptOrder, CancelOrderSchema, RateOrderSchema } from "@/types/drivers";

export function useAcceptableOrders() {
    return useApiQuery(api.acceptableOrders, []);
}

export function useDriverCurrentOrder() {
    return useApiQuery(api.currentOrder, []);
}

export function useAcceptOrder() {
    return useApiMutation<AcceptOrder, any>(api.acceptOrder);
}

export function useCancelOrder() {
    return useApiMutation<CancelOrderSchema, any>(api.cancelOrder);
}

export function useSubmitArrive() {
    return useApiMutation<any, any>(api.submitArrive);
}

export function useCompleteOrder() {
    return useApiMutation<any, any>(api.completeOrder);
}

export function useSubmitStart() {
    return useApiMutation<any, any>(api.submitStart);
}

export function useDriverHistory() {
    return useApiQuery(api.history, []);
}

export function useRateOrder() {
    return useApiMutation<RateOrderSchema, any>(api.rateOrder);
}

export function useDriverStats() {
    return useApiQuery(api.stats, []);
}