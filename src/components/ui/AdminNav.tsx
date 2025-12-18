import React from "react";
import { Link } from "react-router-dom";

import { TEXT } from "@/styles/Text"
import { LINK } from "@/styles/Link";

export function AdminNav(): React.ReactElement {
    return (
        <nav className="flex flex-col gap-3">
            <Link to="/admin/" className={LINK.navbar}>
                Главная
            </Link>

            <Link to="/admin/users" className={LINK.navbar}>
                Пользователи
            </Link>

            <Link to="/admin/cars" className={LINK.navbar}>
                Автомобили
            </Link>

            <Link to="/admin/orders" className={LINK.navbar}>
                Заказы
            </Link>

            <Link to="/admin/maintenances" className={LINK.navbar}>
                Обслуживание
            </Link>
        </nav>
    );
}
