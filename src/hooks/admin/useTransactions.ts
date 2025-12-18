import { useApiQuery } from "@/utils/useApiQuery";
import { useApiMutation } from "@/utils/useApiMutation";
import * as api from "@/api/admin/transactions";

import type { Transaction, CreateTransaction } from "@/types/transactions";

export function useTransaction(transactionId: number) {
    return useApiQuery<Transaction>(
        () => api.gerTransaction(transactionId),
        [transactionId]
    );
}

export function useCreateTransaction() {
    return useApiMutation<CreateTransaction, Transaction>(api.createTransaction);
}
