import React from "react";
import { Link, useParams } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";

import { TEXT } from "@/styles/Text";
import { BUTTON } from "@/styles/Button";

import { useTransactionInfo } from "@/hooks/useAdmin";
import type { TransactionsView } from "@/types/views";

export default function AdminTransactionDetailPage(): React.ReactElement {
    const { transactionId } = useParams<{ transactionId: string }>();
    const id = transactionId ? Number(transactionId) : null;

    const {
        data: transaction,
        loading,
        error,
    } = useTransactionInfo(id);

    if (loading) {
        return (
            <AdminLayout>
                <p className={TEXT.accent_1}>Загрузка транзакции…</p>
            </AdminLayout>
        );
    }

    if (error || !transaction) {
        return (
            <AdminLayout>
                <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded">
                    Транзакция не найдена
                </div>
            </AdminLayout>
        );
    }

    const tx: TransactionsView = transaction;

    return (
        <AdminLayout>
            <section className="max-w-3xl mx-auto px-8 py-16 flex flex-col gap-8">
                {/* HEADER */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className={`${TEXT.title} text-2xl mb-1`}>
                            Транзакция #{tx.id}
                        </h1>
                        <p className={TEXT.accent_1}>
                            Детальная информация
                        </p>
                    </div>

                    <Link
                        to="/admin/transactions"
                        className={BUTTON.transparent}
                    >
                        ← К списку
                    </Link>
                </div>

                {/* INFO */}
                <div className="border border-gray-200 rounded bg-white p-6 flex flex-col gap-4">
                    <Info label="Тип баланса">
                        {tx.balance_type}
                    </Info>

                    <Info label="Тип операции">
                        {tx.transaction_type}
                    </Info>

                    <Info label="Метод оплаты">
                        {tx.payment_method}
                    </Info>

                    <Info label="Сумма">
                        <span
                            className={
                                tx.transaction_type === "credit"
                                    ? "text-green-600 font-medium"
                                    : tx.transaction_type === "debit"
                                        ? "text-red-600 font-medium"
                                        : ""
                            }
                        >
                            {tx.amount} грн
                        </span>
                    </Info>

                    <Info label="Дата создания">
                        {new Date(tx.created_at).toLocaleString()}
                    </Info>
                </div>
            </section>
        </AdminLayout>
    );
}

/* ================= helpers ================= */

function Info({
                  label,
                  children,
              }: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <p className={TEXT.accent_2}>{label}</p>
            <p className={TEXT.default}>{children}</p>
        </div>
    );
}
