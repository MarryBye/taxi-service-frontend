import React from "react";
import { Link } from "react-router-dom";

import { DriverLayout } from "@/components/layout/DriverLayout";

import { TEXT } from "@/styles/Text";
import { LINK } from "@/styles/Link";
import { BUTTON } from "@/styles/Button";

import { useDriverOrdersHistory, useDriverStats } from "@/hooks/useDrivers";
import type { OrdersView } from "@/types/views";

export default function DriverOrdersHistoryPage(): React.ReactElement {
    const {
        data: history,
        loading: historyLoading,
        error: historyError,
    } = useDriverOrdersHistory();

    const {
        data: stats,
        loading: statsLoading,
        error: statsError,
    } = useDriverStats();

    if (historyLoading || statsLoading) {
        return (
            <DriverLayout
                left={null}
                right={
                    <p className="text-center py-20 text-gray-500">
                        Загрузка истории поездок…
                    </p>
                }
            />
        );
    }

    if (historyError || statsError || !stats) {
        return (
            <DriverLayout
                left={null}
                right={
                    <div className="bg-red-100 border border-red-300 text-red-700 px-6 py-4 rounded">
                        Не удалось загрузить историю поездок
                    </div>
                }
            />
        );
    }

    return (
        <DriverLayout
            left={null}
            right={
                <section className="max-w-7xl mx-auto px-8 py-16 flex flex-col gap-10">
                    {/* HEADER */}
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                        <div>
                            <h1 className={`${TEXT.title} text-3xl mb-2`}>
                                История поездок
                            </h1>
                            <p className={TEXT.accent_1}>
                                Все завершённые и отменённые заказы
                            </p>
                        </div>

                        <Link to="/worker" className={BUTTON.transparent}>
                            ← Назад в панель
                        </Link>
                    </div>

                    {/* STATS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatCard
                            title="Всего поездок"
                            value={stats.rides_count}
                        />
                        <StatCard
                            title="Завершено"
                            value={stats.finished_rides_count}
                        />
                        <StatCard
                            title="Отменено"
                            value={stats.canceled_rides_count}
                        />
                    </div>

                    {/* TABLE */}
                    <div className="border border-gray-200 rounded bg-white overflow-x-auto">
                        <h2
                            className={`${TEXT.subtitle} text-lg px-6 py-4 border-b`}
                        >
                            Поездки
                        </h2>

                        {!history || history.length === 0 ? (
                            <p className={`${TEXT.accent_1} px-6 py-6`}>
                                Поездок пока нет
                            </p>
                        ) : (
                            <table className="w-full border-collapse">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 border-b text-left">
                                        ID
                                    </th>
                                    <th className="px-4 py-3 border-b text-left">
                                        Клиент
                                    </th>
                                    <th className="px-4 py-3 border-b text-left">
                                        Статус
                                    </th>
                                    <th className="px-4 py-3 border-b text-left">
                                        Класс авто
                                    </th>
                                    <th className="px-4 py-3 border-b text-left">
                                        Дата
                                    </th>
                                    <th className="px-4 py-3 border-b text-left">
                                        Действия
                                    </th>
                                </tr>
                                </thead>

                                <tbody>
                                {history.map((order: OrdersView) => (
                                    <tr
                                        key={order.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-3 border-b">
                                            {order.id}
                                        </td>

                                        <td className="px-4 py-3 border-b">
                                            {order.client.first_name}{" "}
                                            {order.client.last_name}
                                        </td>

                                        <td className="px-4 py-3 border-b">
                                            <OrderStatus status={order.status} />
                                        </td>

                                        <td className="px-4 py-3 border-b">
                                            {order.order_class}
                                        </td>

                                        <td className="px-4 py-3 border-b">
                                            {new Date(
                                                order.created_at
                                            ).toLocaleString()}
                                        </td>

                                        <td className="px-4 py-3 border-b">
                                            <Link
                                                to={`/driver/orders/${order.id}`}
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
            }
        />
    );
}

/* ================== helpers ================== */

function StatCard({
                      title,
                      value,
                  }: {
    title: string;
    value: number;
}) {
    return (
        <div className="border border-gray-200 rounded p-6 bg-white">
            <p className={TEXT.accent_2}>{title}</p>
            <p className={`${TEXT.default} text-2xl font-semibold`}>
                {value}
            </p>
        </div>
    );
}

function OrderStatus({ status }: { status: string }) {
    const color =
        status === "completed"
            ? "text-green-600"
            : status === "canceled"
                ? "text-red-600"
                : "text-gray-700";

    return <span className={color}>{status}</span>;
}
