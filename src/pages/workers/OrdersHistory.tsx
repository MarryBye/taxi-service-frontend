import React from "react";
import { Link } from "react-router-dom";

import { DefaultLayout } from "@/components/layout/DefaultLayout";

import { TEXT } from "@/styles/Text";
import { LINK } from "@/styles/Link";
import { BUTTON } from "@/styles/Button";

import {useDriverHistory, useDriverStats} from "@/hooks/useDrivers";
import type { Order } from "@/types/orders";

export default function DriverOrdersHistoryPage(): React.ReactElement | null {
    const { data: history, loading: history_loading, error: history_error } = useDriverHistory();
    const { data: stats, loading: loading_stats, error: stats_error } = useDriverStats();

    if (loading_stats) {
        return null;
    }

    if (history_loading) {
        return (
            <DefaultLayout>
                <p className={TEXT.accent_1}>Загрузка истории поездок…</p>
            </DefaultLayout>
        );
    }

    if (history_error) {
        return (
            <DefaultLayout>
                <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded">
                    Не удалось загрузить историю поездок
                </div>
            </DefaultLayout>
        );
    }

    return (
        <DefaultLayout>
            <section className="max-w-7xl mx-auto px-8 py-16 flex flex-col gap-10">
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="border border-gray-200 rounded p-6 bg-white">
                        <p className={TEXT.accent_2}>Всего поездок</p>
                        <p className={`${TEXT.default} text-2xl font-semibold`}>
                            {stats.rides_count}
                        </p>
                    </div>

                    <div className="border border-gray-200 rounded p-6 bg-white">
                        <p className={TEXT.accent_2}>Завершено</p>
                        <p className={`${TEXT.default} text-2xl font-semibold`}>
                            {stats.finished_rides_count}
                        </p>
                    </div>

                    <div className="border border-gray-200 rounded p-6 bg-white">
                        <p className={TEXT.accent_2}>Отменено</p>
                        <p className={`${TEXT.default} text-2xl font-semibold`}>
                            {stats.canceled_rides_count}
                        </p>
                    </div>
                </div>

                <div className="border border-gray-200 rounded bg-white overflow-x-auto">
                    <h2 className={`${TEXT.subtitle} text-lg px-6 py-4 border-b`}>
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
                                <th className="text-left px-4 py-3 border-b">
                                    ID
                                </th>
                                <th className="text-left px-4 py-3 border-b">
                                    Клиент
                                </th>
                                <th className="text-left px-4 py-3 border-b">
                                    Статус
                                </th>
                                <th className="text-left px-4 py-3 border-b">
                                    Класс авто
                                </th>
                                <th className="text-left px-4 py-3 border-b">
                                    Дата
                                </th>
                                <th className="text-left px-4 py-3 border-b">
                                    Действия
                                </th>
                            </tr>
                            </thead>

                            <tbody>
                            {history.map((order: Order) => (
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
                                            <span
                                                className={
                                                    order.status === "completed"
                                                        ? "text-green-600"
                                                        : order.status === "canceled"
                                                            ? "text-red-600"
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
                                        {new Date(order.created_at).toLocaleString()}
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
        </DefaultLayout>
    );
}
