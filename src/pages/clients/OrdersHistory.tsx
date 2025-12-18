import React from "react";
import { Link } from "react-router-dom";

import { DefaultLayout } from "@/components/layout/DefaultLayout";

import { TEXT } from "@/styles/Text";
import { LINK } from "@/styles/Link";
import { BUTTON } from "@/styles/Button";

import { useHistory, useCurrentOrder, useCancelOrder, useRateOrder } from "@/hooks/useClients";
import type { Order } from "@/types/orders";

export default function OrdersHistoryPage(): React.ReactElement {
    const { data, loading, error } = useHistory();
    const { data: current_order, loading: currentLoading } = useCurrentOrder();
    const { mutate: cancelOrder } = useCancelOrder();
    const { mutate: rateOrder } = useRateOrder();

    if (loading || currentLoading) return <p className={TEXT.accent_1}>Загрузка…</p>;
    if (error) return <p className="text-red-600">Ошибка загрузки</p>;

    return (
        <DefaultLayout>
            <section className="max-w-7xl mx-auto px-8 py-16 flex flex-col gap-10">
                <h1 className={`${TEXT.title} text-3xl`}>
                    Мои заказы
                </h1>

                <div className="border border-gray-200 rounded p-6 bg-white">
                    <h2 className={`${TEXT.subtitle} text-lg mb-4`}>
                        Текущий заказ
                    </h2>

                    {!current_order ? (
                        <p className={TEXT.accent_1}>
                            Активного заказа нет
                        </p>
                    ) : (
                        <div className="flex flex-col md:flex-row justify-between gap-6">
                            <div className="flex flex-col gap-2">
                                <p className={TEXT.default}>
                                    Водитель: {current_order.driver_id ?? "—"}
                                </p>
                                <p className={TEXT.default}>
                                    Статус: {current_order.status}
                                </p>
                                <p className={TEXT.default}>
                                    Цена: {current_order.transaction_id}
                                </p>
                                <p className={TEXT.default}>
                                    Маршрут: {current_order.route_id}
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 min-w-[200px]">
                                {current_order.status !== "waiting_for_marks" && (
                                    <button
                                        className={BUTTON.warning}
                                        onClick={() =>
                                            cancelOrder({
                                                comment: "Отмена клиентом",
                                                driver_tags: ["reason 1"],
                                            })
                                        }
                                    >
                                        Отменить заказ
                                    </button>
                                )}

                                {current_order.status === "waiting_for_marks" && (
                                    <button
                                        className={BUTTON.success}
                                        onClick={() =>
                                            rateOrder({
                                                mark: 5,
                                                comment: "Opa",
                                                driver_tags: ["accurate", "polite"],
                                            })
                                        }
                                    >
                                        Оценить поездку
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="border border-gray-200 rounded bg-white overflow-x-auto">
                    <h2 className={`${TEXT.subtitle} text-lg px-6 py-4 border-b`}>
                        История заказов
                    </h2>

                    {!data || data.length === 0 ? (
                        <p className={`${TEXT.accent_1} px-6 py-4`}>
                            История пуста
                        </p>
                    ) : (
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left px-4 py-3 border-b">ID</th>
                                <th className="text-left px-4 py-3 border-b">Статус</th>
                                <th className="text-left px-4 py-3 border-b">Класс</th>
                                <th className="text-left px-4 py-3 border-b">Водитель</th>
                                <th className="text-left px-4 py-3 border-b">Дата</th>
                                <th className="text-left px-4 py-3 border-b">Действия</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.map((order: Order) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 border-b">{order.id}</td>
                                    <td className="px-4 py-3 border-b">{order.status}</td>
                                    <td className="px-4 py-3 border-b">{order.order_class}</td>
                                    <td className="px-4 py-3 border-b">
                                        {order.driver_id ?? "—"}
                                    </td>
                                    <td className="px-4 py-3 border-b">
                                        {new Date(order.created_at).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3 border-b">
                                        <Link
                                            to={`/orders/${order.id}`}
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