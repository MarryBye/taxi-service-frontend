import React from "react";
import { Link } from "react-router-dom";

import { DefaultLayout } from "@/components/layout/DefaultLayout";
import { styleSheet } from "@/styles/Form";

import {
    useDriverOrdersHistory,
    useDriverCurrentOrder,
} from "@/hooks/useDrivers";

import type { OrdersView } from "@/types/views";

export default function DriverOrdersHistoryPage(): React.ReactElement {
    const {
        data: history,
        loading: historyLoading,
        error: historyError,
    } = useDriverOrdersHistory();

    const {
        data: currentOrder,
        loading: currentLoading,
    } = useDriverCurrentOrder();

    if (historyLoading || currentLoading) {
        return (
            <p className={styleSheet.textStyles.MUTED}>
                Завантаження…
            </p>
        );
    }

    if (historyError) {
        return (
            <p className={styleSheet.textStyles.ERROR}>
                Помилка завантаження
            </p>
        );
    }

    return (
        <DefaultLayout>
            <section className={styleSheet.contentStyles.SECTION}>
                <h1 className={styleSheet.textStyles.H1}>
                    Мої поїздки
                </h1>

                {/* ПОТОЧНЕ ЗАМОВЛЕННЯ */}
                <div
                    className={`${styleSheet.containerStyles.CARD} mt-4 mb-4`}
                >
                    <h2 className={styleSheet.textStyles.H4}>
                        Поточна поїздка
                    </h2>

                    {!currentOrder ? (
                        <p className={styleSheet.textStyles.MUTED}>
                            Активної поїздки немає
                        </p>
                    ) : (
                        <table className={styleSheet.tableStyles.TABLE}>
                            <thead className={styleSheet.tableStyles.THEAD}>
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
                                    Клас
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
                            <tr>
                                <td className={styleSheet.tableStyles.TD}>
                                    {currentOrder.id}
                                </td>

                                <td className={styleSheet.tableStyles.TD}>
                                    {currentOrder.client.first_name}{" "}
                                    {currentOrder.client.last_name}
                                </td>

                                <td className={styleSheet.tableStyles.TD}>
                                    <OrderStatus
                                        status={currentOrder.status}
                                    />
                                </td>

                                <td className={styleSheet.tableStyles.TD}>
                                    {currentOrder.order_class}
                                </td>

                                <td className={styleSheet.tableStyles.TD}>
                                    {new Date(
                                        currentOrder.created_at
                                    ).toLocaleString()}
                                </td>

                                <td className={styleSheet.tableStyles.TD}>
                                    <Link
                                        to={`/driver/orders/${currentOrder.id}`}
                                        className={styleSheet.textStyles.LINK}
                                    >
                                        Відкрити
                                    </Link>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    )}
                </div>

                {/* ІСТОРІЯ */}
                <div className={styleSheet.containerStyles.CARD}>
                    <h2 className={styleSheet.textStyles.H4}>
                        Історія поїздок
                    </h2>

                    {!history || history.length === 0 ? (
                        <p className={styleSheet.textStyles.MUTED}>
                            Історія порожня
                        </p>
                    ) : (
                        <table className={styleSheet.tableStyles.TABLE}>
                            <thead className={styleSheet.tableStyles.THEAD}>
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
                                    Клас
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
                                    className={
                                        currentOrder?.id === order.id
                                            ? "bg-yellow-50"
                                            : styleSheet.tableStyles.TR
                                    }
                                >
                                    <td className={styleSheet.tableStyles.TD}>
                                        {order.id}
                                    </td>

                                    <td className={styleSheet.tableStyles.TD}>
                                        {order.client.first_name}{" "}
                                        {order.client.last_name}
                                    </td>

                                    <td className={styleSheet.tableStyles.TD}>
                                        <OrderStatus status={order.status} />
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
                                            Відкрити
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

/* ================= helpers ================= */

function OrderStatus({ status }: { status: string }) {
    const color =
        status === "completed"
            ? styleSheet.otherStyles.BADGE_SUCCESS
            : status === "canceled"
                ? styleSheet.otherStyles.BADGE_ERROR
                : styleSheet.otherStyles.BADGE_WARNING;

    return (
        <span
            className={`${styleSheet.otherStyles.BADGE} ${color}`}
        >
            {status}
        </span>
    );
}
