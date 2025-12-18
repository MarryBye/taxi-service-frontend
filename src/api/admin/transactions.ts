import api from '@/utils/api';

import type { CreateTransaction } from "@/types/transactions";

export function gerTransaction(transactionId: number) {
    return api.get(`/admin/transactions/${transactionId}`);
}

export function createTransaction(payload: CreateTransaction) {
    return api.post('/admin/transactions', payload);
}