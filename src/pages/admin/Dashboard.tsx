import React from "react";
import { Link } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";

import { TEXT } from "@/styles/Text";
import { BUTTON } from "@/styles/Button";

export default function AdminDashboard(): React.ReactElement {
    return (
        <AdminLayout>
            <section className="max-w-7xl mx-auto px-8 py-16 flex flex-col gap-10">
                {/* HEADER */}
                <div>
                    <h1 className={`${TEXT.title} text-3xl mb-2`}>
                        Админ-панель
                    </h1>
                    <p className={TEXT.accent_1}>
                        Управление системой
                    </p>
                </div>

                {/* NAVIGATION GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AdminCard
                        title="Пользователи"
                        description="Клиенты, водители и администраторы"
                        to="/admin/users"
                    />

                    <AdminCard
                        title="Автомобили"
                        description="Автопарк и назначение водителей"
                        to="/admin/cars"
                    />

                    <AdminCard
                        title="Заказы"
                        description="Все поездки и их статусы"
                        to="/admin/orders"
                    />

                    <AdminCard
                        title="Обслуживание"
                        description="Ремонт и техническое состояние авто"
                        to="/admin/maintenances"
                    />

                    <AdminCard
                        title="Транзакции"
                        description="Платежи, начисления и штрафы"
                        to="/admin/transactions"
                    />

                    {/* задел на будущее */}
                    <AdminCard
                        title="Статистика"
                        description="Аналитика и показатели системы"
                        to="/admin/orders"
                    />
                </div>
            </section>
        </AdminLayout>
    );
}

/* ================= helpers ================= */

function AdminCard({
                       title,
                       description,
                       to,
                   }: {
    title: string;
    description: string;
    to: string;
}) {
    return (
        <Link
            to={to}
            className="
                border border-gray-200 rounded-lg
                p-6 bg-white
                hover:shadow-md hover:border-gray-300
                transition
                flex flex-col gap-2
            "
        >
            <h2 className={`${TEXT.subtitle} text-lg`}>
                {title}
            </h2>

            <p className={TEXT.accent_1}>
                {description}
            </p>

            <span className={`${BUTTON.transparent} mt-4 w-fit`}>
                Перейти →
            </span>
        </Link>
    );
}
