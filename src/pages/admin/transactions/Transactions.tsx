import React from "react";
import { Link } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";

import { TEXT } from "@/styles/Text";
import { LINK } from "@/styles/Link";
import { BUTTON } from "@/styles/Button";

import { useTransactionsList } from "@/hooks/useAdmin";
import type { TransactionsView } from "@/types/views";

export default function AdminTransactionsListPage(): React.ReactElement {
    const { data, loading, error } = useTransactionsList();

    if (loading) {
        return (
            <AdminLayout>
                <p className={TEXT.accent_1}>Загрузка транзакций…</p>
            </AdminLayout>
        );
    }

    if (error) {
        return (
            <AdminLayout>
                <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded">
                    Не удалось загрузить список транзакций
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <section className="max-w-7xl mx-auto px-8 py-16 flex flex-col gap-8">
                {/* HEADER */}
                <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div>
                        <h1 className={`${TEXT.title} text-3xl mb-2`}>
                            Транзакции
                        </h1>
                        <p className={TEXT.accent_1}>
                            Все платежи и начисления в системе
                        </p>
                    </div>

                    <Link
                        to="/admin/transactions/create"
                        className={BUTTON.default}
                    >
                        + Создать транзакцию
                    </Link>
                </div>

                {/* TABLE */}
                <div className="border border-gray-200 rounded bg-white overflow-x-auto">
                    {!data || data.length === 0 ? (
                        <p className={`${TEXT.accent_1} px-6 py-6`}>
                            Транзакций пока нет
                        </p>
                    ) : (
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-50">
                            <tr>
                                <Th>ID</Th>
                                <Th>Тип баланса</Th>
                                <Th>Тип операции</Th>
                                <Th>Метод оплаты</Th>
                                <Th>Сумма</Th>
                                <Th>Дата</Th>
                                <Th>Действия</Th>
                            </tr>
                            </thead>

                            <tbody>
                            {data.map((tx: TransactionsView) => (
                                <tr
                                    key={tx.id}
                                    className="hover:bg-gray-50"
                                >
                                    <Td>{tx.id}</Td>

                                    <Td>{tx.balance_type}</Td>

                                    <Td>{tx.transaction_type}</Td>

                                    <Td>{tx.payment_method}</Td>

                                    <Td>
                                            <span
                                                className={
                                                    tx.transaction_type === "credit"
                                                        ? "text-green-600 font-medium"
                                                        : tx.transaction_type === "debit"
                                                            ? "text-red-600 font-medium"
                                                            : "text-gray-700"
                                                }
                                            >
                                                {tx.amount}
                                            </span>
                                    </Td>

                                    <Td>
                                        {new Date(
                                            tx.created_at
                                        ).toLocaleString()}
                                    </Td>

                                    <Td>
                                        <Link
                                            to={`/admin/transactions/${tx.id}`}
                                            className={LINK.default}
                                        >
                                            Открыть
                                        </Link>
                                    </Td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </section>
        </AdminLayout>
    );
}

/* ================= helpers ================= */

function Th({ children }: { children: React.ReactNode }) {
    return (
        <th className="text-left px-4 py-3 border-b">
            {children}
        </th>
    );
}

function Td({ children }: { children: React.ReactNode }) {
    return (
        <td className="px-4 py-3 border-b">
            {children}
        </td>
    );
}
