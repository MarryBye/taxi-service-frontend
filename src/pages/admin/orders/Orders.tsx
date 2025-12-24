import React from "react";
import { Link } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";

import { TEXT } from "@/styles/Text";
import { LINK } from "@/styles/Link";

import { useAdminOrdersList } from "@/hooks/useAdmin";
import type { OrdersView } from "@/types/views";

export default function AdminOrdersListPage(): React.ReactElement {
    const { data, loading, error } = useAdminOrdersList();

    if (loading) {
        return (
            <AdminLayout>
                <p className={TEXT.accent_1}>Загрузка заказов…</p>
            </AdminLayout>
        );
    }

    if (error) {
        return (
            <AdminLayout>
                <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded">
                    Не удалось загрузить список заказов
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <section className="max-w-7xl mx-auto px-8 py-16 flex flex-col gap-8">
                {/* HEADER */}
                <div>
                    <h1 className={`${TEXT.title} text-3xl mb-2`}>
                        Заказы
                    </h1>
                    <p className={TEXT.accent_1}>
                        Все заказы системы
                    </p>
                </div>

                {/* TABLE */}
                <div className="border border-gray-200 rounded bg-white overflow-x-auto">
                    {!data || data.length === 0 ? (
                        <p className={`${TEXT.accent_1} px-6 py-6`}>
                            Заказов пока нет
                        </p>
                    ) : (
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-50">
                            <tr>
                                <Th>ID</Th>
                                <Th>Клиент</Th>
                                <Th>Водитель</Th>
                                <Th>Статус</Th>
                                <Th>Класс авто</Th>
                                <Th>Сумма</Th>
                                <Th>Создан</Th>
                                <Th>Действия</Th>
                            </tr>
                            </thead>

                            <tbody>
                            {data.map((order: OrdersView) => (
                                <tr
                                    key={order.id}
                                    className="hover:bg-gray-50"
                                >
                                    <Td>{order.id}</Td>

                                    <Td>
                                        {order.client.first_name}{" "}
                                        {order.client.last_name}
                                    </Td>

                                    <Td>
                                        {order.driver
                                            ? `${order.driver.first_name} ${order.driver.last_name}`
                                            : "—"}
                                    </Td>

                                    <Td>
                                        <StatusBadge status={order.status} />
                                    </Td>

                                    <Td>{order.order_class}</Td>

                                    <Td>
                                        {order.transaction.amount}
                                    </Td>

                                    <Td>
                                        {new Date(
                                            order.created_at
                                        ).toLocaleDateString()}
                                    </Td>

                                    <Td>
                                        <Link
                                            to={`/admin/orders/${order.id}`}
                                            className={LINK.default}
                                        >
                                            Подробнее
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

function StatusBadge({ status }: { status: OrdersView["status"] }) {
    const className =
        status === "completed"
            ? "text-green-600"
            : status === "canceled"
                ? "text-red-600"
                : status === "in_progress"
                    ? "text-yellow-600"
                    : "text-gray-700";

    return <span className={className}>{status}</span>;
}

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
