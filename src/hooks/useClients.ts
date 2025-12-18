import { useApiQuery } from "@/utils/useApiQuery";
import { useApiMutation } from "@/utils/useApiMutation";
import * as api from "@/api/clients";

import type { MakeOrder, CancelOrder, RateOrder, UpdateProfile } from "@/types/clients";

export function useProfile() {
    return useApiQuery(api.getProfile, []);
}

export function useMakeOrder() {
    return useApiMutation<MakeOrder, any>(api.makeOrder);
}

export function useClientUpdateProfile() {
    return useApiMutation<UpdateProfile, any>(api.updateProfile);
}

export function useCancelOrder() {
    return useApiMutation<CancelOrder, any>(api.cancelOrder);
}

export function useRateOrder() {
    return useApiMutation<RateOrder, any>(api.rateOrder);
}

export function useHistory() {
    return useApiQuery(api.getHistory, []);
}

export function useCurrentOrder() {
    return useApiQuery(api.currentOrder, []);
}