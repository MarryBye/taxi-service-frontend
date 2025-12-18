import type { OrderStatus, CarClass, PaymentMethod } from "@/types/db";
import type { Address } from "@/types/common";

export type BaseOrder<T extends object = {}> = {
    client_id: number;
    driver_id: number;
    transaction_id: number;
    status: OrderStatus;
    order_class: CarClass;
} & T;

export type Order = BaseOrder<{
    id: number;
    created_at: string;
    changed_at: string;
    client_rating_id?: number;
    driver_rating_id?: number;
    cancel_id?: number;
    route_id?: number;
}>;

export type CreateOrder = {
    order_class: CarClass,
    payment_method: PaymentMethod,
    amount: number,
    addresses: Address[],
}

export type UpdateOrder = {
    status?: OrderStatus,
    order_class: CarClass,
}