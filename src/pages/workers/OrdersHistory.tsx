import React from "react";
import { Link } from "react-router-dom";

import { DriverLayout } from "@/components/layout/DriverLayout";
import { styleSheet } from "@/styles/Form";

import { useDriverOrdersHistory, useDriverStats } from "@/hooks/useDrivers";
import type { OrdersView } from "@/types/views";
import {DefaultLayout} from "@/components/layout/DefaultLayout";

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
                    <p
                        className={`${styleSheet.textStyles.MUTED} text-center py-20`}
                    >
                        Завантаження історії поїздок…
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
                    <div
                        className={`${styleSheet.otherStyles.BADGE_ERROR} px-6 py-4 rounded`}
                    >
                        Не вдалося завантажити історію поїздок
                    </div>
                }
            />
        );
    }

    return (
        <DefaultLayout>
                <section
                    className={`${styleSheet.contentStyles.SECTION} flex flex-col gap-10`}
                >
                    {/* HEADER */}
                    <div
                        className="flex flex-col md:flex-row justify-between gap-6"
                    >
                        <div>
                            <h1
                                className={`${styleSheet.textStyles.H1} mb-2`}
                            >
                                Історія поїздок
                            </h1>

                            <p className={styleSheet.textStyles.PARAGRAPH}>
                                Усі завершені та скасовані замовлення
                            </p>
                        </div>

                        <Link
                            to="/driver"
                            className={styleSheet.inputStyles.BUTTON_SECONDARY}
                        >
                            ← Назад до панелі
                        </Link>
                    </div>

                    {/* STATS */}
                    <div
                        className={styleSheet.layoutStyles.GRID_3}
                    >
                        <StatCard
                            title="Усього поїздок"
                            value={stats.rides_count}
                        />
                        <StatCard
                            title="Завершено"
                            value={stats.finished_rides_count}
                        />
                        <StatCard
                            title="Скасовано"
                            value={stats.canceled_rides_count}
                        />
                    </div>

                    {/* TABLE */}
                    <div
                        className={`${styleSheet.containerStyles.CARD} overflow-x-auto`}
                    >
                        <h2
                            className={`${styleSheet.textStyles.H4} px-6 py-4 border-b`}
                        >
                            Поїздки
                        </h2>

                        {!history || history.length === 0 ? (
                            <p
                                className={`${styleSheet.textStyles.SUBTLE} px-6 py-6`}
                            >
                                Поїздок поки що немає
                            </p>
                        ) : (
                            <table
                                className={styleSheet.tableStyles.TABLE}
                            >
                                <thead
                                    className={styleSheet.tableStyles.THEAD}
                                >
                                <tr>
                                    <th className={styleSheet.tableStyles.TH}>
                                        ID
                                    </th>
                                    <th className={styleSheet.tableStyles.TH}>
                                        Клієнт
                                    </th>
                                    <th className={styleSheet.tableStyles.TH}>
                                        Статус
                                    </th>
                                    <th className={styleSheet.tableStyles.TH}>
                                        Клас авто
                                    </th>
                                    <th className={styleSheet.tableStyles.TH}>
                                        Дата
                                    </th>
                                    <th className={styleSheet.tableStyles.TH}>
                                        Дії
                                    </th>
                                </tr>
                                </thead>

                                <tbody>
                                {history.map((order: OrdersView) => (
                                    <tr
                                        key={order.id}
                                        className={styleSheet.tableStyles.TR}
                                    >
                                        <td className={styleSheet.tableStyles.TD}>
                                            {order.id}
                                        </td>

                                        <td className={styleSheet.tableStyles.TD}>
                                            {order.client.first_name}{" "}
                                            {order.client.last_name}
                                        </td>

                                        <td className={styleSheet.tableStyles.TD}>
                                            <OrderStatus
                                                status={order.status}
                                            />
                                        </td>

                                        <td className={styleSheet.tableStyles.TD}>
                                            {order.order_class}
                                        </td>

                                        <td className={styleSheet.tableStyles.TD}>
                                            {new Date(
                                                order.created_at
                                            ).toLocaleString()}
                                        </td>

                                        <td className={styleSheet.tableStyles.TD}>
                                            <Link
                                                to={`/driver/orders/${order.id}`}
                                                className={styleSheet.textStyles.LINK}
                                            >
                                                Детальніше
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

/* ================== helpers ================== */

function StatCard({
                      title,
                      value,
                  }: {
    title: string;
    value: number;
}) {
    return (
        <div className={styleSheet.containerStyles.CARD}>
            <p className={styleSheet.textStyles.MUTED}>
                {title}
            </p>

            <p
                className={`${styleSheet.textStyles.STRONG} text-2xl`}
            >
                {value}
            </p>
        </div>
    );
}

function OrderStatus({ status }: { status: string }) {
    const color =
        status === "completed"
            ? styleSheet.otherStyles.BADGE_SUCCESS
            : status === "canceled"
                ? styleSheet.otherStyles.BADGE_ERROR
                : styleSheet.textStyles.DEFAULT;

    return (
        <span
            className={`${styleSheet.otherStyles.BADGE} ${color}`}
        >
            {status}
        </span>
    );
}
