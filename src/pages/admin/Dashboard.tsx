import React from "react";
import { Link } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { styleSheet } from "@/styles/Form";

export default function AdminDashboard(): React.ReactElement {
    return (
        <AdminLayout>
            <section className={styleSheet.contentStyles.SECTION}>
                {/* HEADER */}
                <div>
                    <h1
                        className={`${styleSheet.textStyles.H1} mb-2`}
                    >
                        Адмін-панель
                    </h1>

                    <p className={styleSheet.textStyles.PARAGRAPH}>
                        Керування системою
                    </p>
                </div>

                {/* NAVIGATION GRID */}
                <div className={styleSheet.layoutStyles.GRID_3}>
                    <AdminCard
                        title="Користувачі"
                        description="Клієнти, водії та адміністратори"
                        to="/admin/users"
                    />

                    <AdminCard
                        title="Автомобілі"
                        description="Автопарк і призначення водіїв"
                        to="/admin/cars"
                    />

                    <AdminCard
                        title="Замовлення"
                        description="Усі поїздки та їх статуси"
                        to="/admin/orders"
                    />

                    <AdminCard
                        title="Обслуговування"
                        description="Ремонт і технічний стан авто"
                        to="/admin/maintenances"
                    />

                    <AdminCard
                        title="Транзакції"
                        description="Платежі, нарахування та штрафи"
                        to="/admin/transactions"
                    />

                    <AdminCard
                        title="Статистика"
                        description="Аналітика та показники системи"
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
            className={styleSheet.emphasisStyles.BOX}
        >
            <h2
                className={styleSheet.textStyles.H4}
            >
                {title}
            </h2>

            <p className={styleSheet.textStyles.SMALL}>
                {description}
            </p>

            <span
                className={`${styleSheet.textStyles.LINK} mt-4 w-fit`}
            >
                Перейти →
            </span>
        </Link>
    );
}
