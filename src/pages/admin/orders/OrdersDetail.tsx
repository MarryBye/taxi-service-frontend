import React from "react";
import { Link, useParams } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";

import { TEXT } from "@/styles/Text";
import { LINK } from "@/styles/Link";
import { BUTTON } from "@/styles/Button";

import { useOrder, useDeleteOrder } from "@/hooks/admin/useOrders";

export default function AdminOrderDetailPage(): React.ReactElement {
    const { orderId } = useParams<{ orderId: string }>();
    const id = orderId ? Number(orderId) : null;

    const { data: order, loading, error } = useOrder(id);
    const { mutate: deleteOrder } = useDeleteOrder();

    if (loading) {
        return (
            <AdminLayout>
                <p className={TEXT.accent_1}>Загрузка заказа…</p>
            </AdminLayout>
        );
    }

    if (error || !order) {
        return (
            <AdminLayout>
                <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded">
                    Заказ не найден
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <section className="flex flex-col gap-10 max-w-3xl">
                {/* HEADER */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className={`${TEXT.title} text-3xl mb-1`}>
                            Заказ #{order.id}
                        </h1>
                        <p className={TEXT.accent_1}>
                            Детальная информация о заказе
                        </p>
                    </div>

                    <Link to="/admin/orders" className={BUTTON.transparent}>
                        ← Назад
                    </Link>
                </div>

                {/* INFO */}
                <div className="border border-gray-200 rounded p-6 bg-white flex flex-col gap-4">
                    <div>
                        <p className={TEXT.accent_2}>Статус</p>
                        <p className={TEXT.default}>{order.status}</p>
                    </div>

                    <div>
                        <p className={TEXT.accent_2}>Класс автомобиля</p>
                        <p className={TEXT.default}>{order.order_class}</p>
                    </div>

                    <div>
                        <p className={TEXT.accent_2}>Клиент</p>
                        <p className={TEXT.default}>{order.client_id}</p>
                    </div>

                    <div>
                        <p className={TEXT.accent_2}>Водитель</p>
                        <p className={TEXT.default}>
                            {order.driver_id ?? "Не назначен"}
                        </p>
                    </div>

                    <div>
                        <p className={TEXT.accent_2}>Транзакция</p>
                        <p className={TEXT.default}>
                            {order.transaction_id ?? "—"}
                        </p>
                    </div>

                    <div>
                        <p className={TEXT.accent_2}>Маршрут</p>
                        <p className={TEXT.default}>
                            {order.route_id ?? "—"}
                        </p>
                    </div>

                    <div className="flex gap-6">
                        <div>
                            <p className={TEXT.accent_2}>Создан</p>
                            <p className={TEXT.default}>
                                {new Date(order.created_at).toLocaleString()}
                            </p>
                        </div>

                        <div>
                            <p className={TEXT.accent_2}>Обновлён</p>
                            <p className={TEXT.default}>
                                {new Date(order.changed_at).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-4">
                    <Link
                        to={`/admin/orders/${order.id}/edit`}
                        className={BUTTON.transparent}
                    >
                        Редактировать
                    </Link>

                    <button
                        className={BUTTON.warning}
                        onClick={() => {
                            if (confirm("Удалить заказ?")) {
                                deleteOrder(order.id);
                            }
                        }}
                    >
                        Удалить
                    </button>
                </div>
            </section>
        </AdminLayout>
    );
}
