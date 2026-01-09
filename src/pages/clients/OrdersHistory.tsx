import React from "react";
import { Link } from "react-router-dom";

import { DefaultLayout } from "@/components/layout/DefaultLayout";
import { styleSheet } from "@/styles/Form";

import {
    useOrdersHistory,
    useCurrentOrder,
} from "@/hooks/useClients";
import type { OrdersView } from "@/types/views";

export default function OrdersHistoryPage(): React.ReactElement {
    const { data, loading, error } = useOrdersHistory();
    const { data: currentOrder, loading: currentLoading } =
        useCurrentOrder();

    if (loading || currentLoading) {
        return (
            <p className={styleSheet.textStyles.MUTED}>
                Завантаження…
            </p>
        );
    }

    if (error) {
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
                    Мої замовлення
                </h1>

                {/* ПОТОЧНЕ ЗАМОВЛЕННЯ */}
                <div className={styleSheet.containerStyles.CARD}>
                    <h2 className={styleSheet.textStyles.H4}>
                        Поточне замовлення
                    </h2>

                    {!currentOrder ? (
                        <p className={styleSheet.textStyles.MUTED}>
                            Активного замовлення немає
                        </p>
                    ) : (
                        <div className={styleSheet.containerStyles.ROW}>
                            <div className={styleSheet.containerStyles.COLUMN}>
                                <p className={styleSheet.textStyles.DEFAULT}>
                                    Замовлення #{currentOrder.id}
                                </p>
                                <p className={styleSheet.textStyles.DEFAULT}>
                                    Статус: {currentOrder.status}
                                </p>
                                <p className={styleSheet.textStyles.DEFAULT}>
                                    Клас: {currentOrder.order_class}
                                </p>
                            </div>

                            <Link
                                to={`/orders/${currentOrder.id}`}
                                className={styleSheet.inputStyles.BUTTON_PRIMARY}
                            >
                                Відкрити
                            </Link>
                        </div>
                    )}
                </div>

                {/* ІСТОРІЯ */}
                <div className={styleSheet.containerStyles.CARD}>
                    <h2 className={styleSheet.textStyles.H4}>
                        Історія замовлень
                    </h2>

                    {!data || data.length === 0 ? (
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
                            {data.map((order: OrdersView) => (
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
                                        {order.status}
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
                                            to={`/orders/${order.id}`}
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
