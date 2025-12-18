import React from "react";
import { Link } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";

import { TEXT } from "@/styles/Text";
import { LINK } from "@/styles/Link";
import { BUTTON } from "@/styles/Button";

import { useOrders } from "@/hooks/admin/useOrders";
import type { Order } from "@/types/orders";

export default function AdminOrdersListPage(): React.ReactElement {
    const { data, loading, error } = useOrders();

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
            <section className="flex flex-col gap-8">
                {/* ===== HEADER ===== */}
                <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div>
                        <h1 className={`${TEXT.title} text-3xl mb-2`}>
                            Заказы
                        </h1>
                        <p className={TEXT.accent_1}>
                            Все заказы системы
                        </p>
                    </div>
                </div>

                {/* ===== TABLE ===== */}
                <div className="border border-gray-200 rounded bg-white overflow-x-auto">
                    {!data || data.length === 0 ? (
                        <p className={`${TEXT.accent_1} px-6 py-6`}>
                            Заказов пока нет
                        </p>
                    ) : (
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left px-4 py-3 border-b">
                                    ID
                                </th>
                                <th className="text-left px-4 py-3 border-b">
                                    Клиент
                                </th>
                                <th className="text-left px-4 py-3 border-b">
                                    Водитель
                                </th>
                                <th className="text-left px-4 py-3 border-b">
                                    Статус
                                </th>
                                <th className="text-left px-4 py-3 border-b">
                                    Класс авто
                                </th>
                                <th className="text-left px-4 py-3 border-b">
                                    Транзакция
                                </th>
                                <th className="text-left px-4 py-3 border-b">
                                    Создан
                                </th>
                                <th className="text-left px-4 py-3 border-b">
                                    Действия
                                </th>
                            </tr>
                            </thead>

                            <tbody>
                            {data.map((order: Order) => (
                                <tr
                                    key={order.id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-4 py-3 border-b">
                                        {order.id}
                                    </td>

                                    <td className="px-4 py-3 border-b">
                                        {order.client_id}
                                    </td>

                                    <td className="px-4 py-3 border-b">
                                        {order.driver_id ?? "—"}
                                    </td>

                                    <td className="px-4 py-3 border-b">
                                            <span
                                                className={
                                                    order.status === "completed"
                                                        ? "text-green-600"
                                                        : order.status === "canceled"
                                                            ? "text-red-600"
                                                            : order.status === "in_progress"
                                                                ? "text-yellow-600"
                                                                : "text-gray-700"
                                                }
                                            >
                                                {order.status}
                                            </span>
                                    </td>

                                    <td className="px-4 py-3 border-b">
                                        {order.order_class}
                                    </td>

                                    <td className="px-4 py-3 border-b">
                                        {order.transaction_id ?? "—"}
                                    </td>

                                    <td className="px-4 py-3 border-b">
                                        {new Date(
                                            order.created_at
                                        ).toLocaleDateString()}
                                    </td>

                                    <td className="px-4 py-3 border-b">
                                        <Link
                                            to={`/admin/orders/${order.id}`}
                                            className={LINK.default}
                                        >
                                            Подробнее
                                        </Link>
                                    </td>
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
