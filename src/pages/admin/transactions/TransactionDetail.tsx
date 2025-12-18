import React from "react";
import { Link, useParams } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";

import { TEXT } from "@/styles/Text";
import { LINK } from "@/styles/Link";
import { BUTTON } from "@/styles/Button";

import { useTransaction } from "@/hooks/admin/useTransactions";

export default function AdminTransactionDetailPage(): React.ReactElement {
    const { transactionId } = useParams<{ transactionId: string }>();
    const id = transactionId ? Number(transactionId) : null;

    const { data: transaction, loading, error } = useTransaction(id);

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

    return (
        <AdminLayout>
            <section className="max-w-3xl flex flex-col gap-8">
                {/* ===== HEADER ===== */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className={`${TEXT.title} text-2xl mb-1`}>
                            Транзакция #{transaction.id}
                        </h1>
                        <p className={TEXT.accent_1}>
                            Детальная информация
                        </p>
                    </div>

                    <Link
                        to="/admin/transactions"
                        className={BUTTON.transparent}
                    >
                        ← Назад
                    </Link>
                </div>

                {/* ===== MAIN INFO ===== */}
                <div className="border border-gray-200 rounded bg-white p-6 flex flex-col gap-4">
                    <div>
                        <p className={TEXT.accent_2}>Пользователь</p>
                        <p className={TEXT.default}>
                            ID: {transaction.user_id}
                        </p>
                    </div>

                    <div>
                        <p className={TEXT.accent_2}>Сумма</p>
                        <p className={TEXT.default}>
                            {transaction.amount} грн
                        </p>
                    </div>

                    <div>
                        <p className={TEXT.accent_2}>Тип транзакции</p>
                        <p className={TEXT.default}>
                            {transaction.transaction_type}
                        </p>
                    </div>

                    <div>
                        <p className={TEXT.accent_2}>Тип баланса</p>
                        <p className={TEXT.default}>
                            {transaction.balance_type}
                        </p>
                    </div>

                    <div>
                        <p className={TEXT.accent_2}>Метод оплаты</p>
                        <p className={TEXT.default}>
                            {transaction.payment_method}
                        </p>
                    </div>

                    <div>
                        <p className={TEXT.accent_2}>Дата создания</p>
                        <p className={TEXT.default}>
                            {new Date(transaction.created_at).toLocaleString()}
                        </p>
                    </div>
                </div>
            </section>
        </AdminLayout>
    );
}
