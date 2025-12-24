import type * as enums from '@/types/enums/db';

export type Country = {
    id: number;
    code: string;
    full_name: string;
}

export type City = {
    id: number;
    country: Country;
    name: string;
}

export type Address = {
    country: string;
    city: string;
    street: string;
    house: string;
}

export type Transaction = {
    id: number;
    balance_type: enums.BalanceTypes;
    transaction_type: enums.TransactionType;
    payment_method: enums.PaymentMethods;
    amount: number;
    created_at: string;
}

export type Route = {
    id: number;
    start_location: Address;
    end_location: Address;
    distance: number;
    all_addresses: Address[];
}

export type Rating = {
    id: number;
    mark: number;
    created_at: string;
}

export type Cancel = {
    id: number;
    canceled_by: number;
    comment: string;
    created_at: string;
}