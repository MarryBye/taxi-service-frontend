import type { TransactionType, PaymentMethod, CarClass, BalanceType } from "@/types/db";
import type { Address } from "@/types/common";

export type BaseTransaction<T extends object = {}> = {
    amount: number;
    transaction_type: TransactionType;
    balance_type: BalanceType;
    user_id: number;
    payment_method: PaymentMethod;
} & T;

export type Transaction = BaseTransaction<{
    id: number;
    created_at: string;
}>;

export type CreateTransaction = BaseTransaction<{
    user_id: number;
    balance_type: BalanceType;
    transaction_type: TransactionType;
    payment_method: PaymentMethod;
    amount: number;
}>;