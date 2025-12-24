import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";

import { TEXT } from "@/styles/Text";
import { BUTTON } from "@/styles/Button";

import { useAdminOrderInfo } from "@/hooks/useAdmin";
import type { OrdersView } from "@/types/views";

export default function AdminOrderDetailPage(): React.ReactElement {
    const navigate = useNavigate();
    const { orderId } = useParams<{ orderId: string }>();
    const id = orderId ? Number(orderId) : null;

    const { data: order, loading, error } = useAdminOrderInfo(id);

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

    const o: OrdersView = order;

    return (
        <AdminLayout>
            <section className="max-w-3xl mx-auto px-8 py-16 flex flex-col gap-10">
                {/* HEADER */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className={`${TEXT.title} text-3xl mb-1`}>
                            Заказ #{o.id}
                        </h1>
                        <p className={TEXT.accent_1}>
                            Детальная информация о заказе
                        </p>
                    </div>

                    <Link to="/admin/orders" className={BUTTON.transparent}>
                        ← К списку
                    </Link>
                </div>

                {/* INFO */}
                <div className="border border-gray-200 rounded p-6 bg-white flex flex-col gap-5">
                    <Info label="Статус">
                        {o.status}
                    </Info>

                    <Info label="Класс автомобиля">
                        {o.order_class}
                    </Info>

                    <Info label="Клиент">
                        {o.client.first_name} {o.client.last_name}
                    </Info>

                    <Info label="Водитель">
                        {o.driver
                            ? `${o.driver.first_name} ${o.driver.last_name}`
                            : "Не назначен"}
                    </Info>

                    <Info label="Сумма">
                        {o.transaction.amount}
                    </Info>

                    <Info label="Маршрут">
                        Дистанция: {o.route.distance} км
                    </Info>

                    <div className="flex gap-8">
                        <Info label="Создан">
                            {new Date(o.created_at).toLocaleString()}
                        </Info>

                        <Info label="Обновлён">
                            {new Date(o.changed_at).toLocaleString()}
                        </Info>
                    </div>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-4">
                    <Link
                        to={`/admin/orders/${o.id}/edit`}
                        className={BUTTON.default}
                    >
                        Редактировать
                    </Link>
                </div>
            </section>
        </AdminLayout>
    );
}

/* ================= helpers ================= */

function Info({
                  label,
                  children,
              }: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <p className={TEXT.accent_2}>{label}</p>
            <p className={TEXT.default}>{children}</p>
        </div>
    );
}
