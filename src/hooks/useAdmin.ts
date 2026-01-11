import { useApiQuery } from "@/utils/useApiQuery";
import { useApiMutation } from "@/utils/useApiMutation";

import * as adminsApi from "@/api/admin";
import * as adminsTypes from "@/types/admin";
import * as views from "@/types/views";

export function useUsersList() {
    return useApiQuery<views.UsersView[]>(
        () => adminsApi.users_list(),
        []
    );
}

export function useUserInfo(userId: number | null) {
    return useApiQuery<views.UsersView>(
        () => {
            if (!userId) {
                return Promise.reject("userId is null");
            }
            return adminsApi.user_info(userId);
        },
        [userId]
    );
}

export function useCreateUser() {
    return useApiMutation<
        adminsTypes.CreateUserSchema,
        views.UsersView
    >(adminsApi.create_user);
}

export function useUpdateUser(userId: number) {
    return useApiMutation<
        adminsTypes.UpdateUserSchema,
        views.UsersView
    >((data) => adminsApi.update_user(userId, data));
}

export function useDeleteUser(userId: number) {
    return useApiMutation<void, null>(
        () => adminsApi.delete_user(userId)
    );
}

export function useClientStats(userId: number | null) {
    return useApiQuery<views.ClientsStatView>(
        () => {
            if (!userId) {
                return Promise.reject("userId is null");
            }
            return adminsApi.client_stats(userId);
        },
        [userId]
    );
}

export function useDriverStats(userId: number | null) {
    return useApiQuery<views.DriversStatView>(
        () => {
            if (!userId) {
                return Promise.reject("userId is null");
            }
            return adminsApi.driver_stats(userId);
        },
        [userId]
    );
}

export function useCarsList() {
    return useApiQuery<views.CarsView[]>(
        () => adminsApi.cars_list(),
        []
    );
}

export function useCarInfo(carId: number | null) {
    return useApiQuery<views.CarsView>(
        () => {
            if (!carId) {
                return Promise.reject("carId is null");
            }
            return adminsApi.car_info(carId);
        },
        [carId]
    );
}

export function useCreateCar() {
    return useApiMutation<
        adminsTypes.CreateCarSchema,
        views.CarsView
    >(adminsApi.create_car);
}

export function useUpdateCar(carId: number) {
    return useApiMutation<
        adminsTypes.UpdateCarSchema,
        views.CarsView
    >((data) => adminsApi.update_car(carId, data));
}

export function useDeleteCar(carId: number) {
    return useApiMutation<void, null>(
        () => adminsApi.delete_car(carId)
    );
}

export function useAdminOrdersList() {
    return useApiQuery<views.OrdersView[]>(
        () => adminsApi.orders_list(),
        []
    );
}

export function useAdminOrderInfo(orderId: number | null) {
    return useApiQuery<views.OrdersView>(
        () => {
            if (!orderId) {
                return Promise.reject("orderId is null");
            }
            return adminsApi.order_info(orderId);
        },
        [orderId]
    );
}

export function useAdminOrderStat(orderId: number | null) {
    return useApiQuery<views.OrdersStatView>(
        () => {
            if (!orderId) {
                return Promise.reject("orderId is null");
            }
            return adminsApi.order_stat(orderId);
        },
        [orderId]
    );
}

export function useMaintenancesList() {
    return useApiQuery<views.MaintenancesView[]>(
        () => adminsApi.maintenances_list(),
        []
    );
}

export function useMaintenanceInfo(maintenanceId: number | null) {
    return useApiQuery<views.MaintenancesView>(
        () => {
            if (!maintenanceId) {
                return Promise.reject("maintenanceId is null");
            }
            return adminsApi.maintenance_info(maintenanceId);
        },
        [maintenanceId]
    );
}

export function useUpdateMaintenance(maintenanceId: number) {
    return useApiMutation<
        adminsTypes.UpdateMaintenanceSchema,
        views.MaintenancesView
    >((data) => adminsApi.update_maintenance(maintenanceId, data));
}

export function useDeleteMaintenance(maintenanceId: number) {
    return useApiMutation<void, null>(
        () => adminsApi.delete_maintenance(maintenanceId)
    );
}

export function useCreateMaintenance() {
    return useApiMutation<
        adminsTypes.CreateMaintenanceSchema,
        views.MaintenancesView
    >((data) => adminsApi.create_maintenance(data));
}

export function useTransactionsList() {
    return useApiQuery<views.TransactionsView[]>(
        () => adminsApi.transactions_list(),
        []
    );
}

export function useTransactionInfo(transactionId: number | null) {
    return useApiQuery<views.TransactionsView>(
        () => {
            if (!transactionId) {
                return Promise.reject("transactionId is null");
            }
            return adminsApi.transaction_info(transactionId);
        },
        [transactionId]
    );
}

export function useCreateTransaction() {
    return useApiMutation<
        adminsTypes.CreateTransactionSchema,
        views.TransactionsView
    >(adminsApi.create_transaction);
}
