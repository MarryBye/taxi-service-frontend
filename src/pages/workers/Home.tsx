import React from "react";
import { Link } from "react-router-dom";

import { DriverLayout } from "@/components/layout/DriverLayout";

import { TEXT } from "@/styles/Text";
import { LINK } from "@/styles/Link";
import { BUTTON } from "@/styles/Button";

import { useProfile } from "@/hooks/useClients";
import {
    useDriverStats,
    useDriverCurrentOrder,
    useAcceptableOrders,
    useAcceptOrder,
} from "@/hooks/useDrivers";

export default function DriverHomePage(): React.ReactElement | null {
    /* профиль пользователя (водителя) */
    const {
        data: profile,
        loading: profileLoading,
        error: profileError,
    } = useProfile();

    /* статистика водителя */
    const {
        data: driverStats,
        loading: statsLoading,
        error: statsError,
    } = useDriverStats();

    /* текущий заказ */
    const {
        data: currentOrder,
        loading: currentOrderLoading,
        error: currentOrderError,
    } = useDriverCurrentOrder();

    /* доступные заказы */
    const {
        data: acceptableOrders,
        loading: acceptableLoading,
        error: acceptableError,
    } = useAcceptableOrders();

    if (
        profileLoading ||
        statsLoading ||
        acceptableLoading
    ) {
        return null;
    }

    if (!profile || !driverStats || !acceptableOrders) {
        return null;
    }

    return (
        <DriverLayout
            left={
                <div className="flex flex-col gap-6">
                    <div>
                        <h2 className={`${TEXT.title} text-xl mb-2`}>
                            Водитель
                        </h2>

                        <p className={TEXT.default}>
                            {profile.first_name} {profile.last_name}
                        </p>
                    </div>

                    <div>
                        <p className={TEXT.accent_2}>Автомобиль</p>
                        <p className={TEXT.default}>
                            {driverStats.car
                                ? `${driverStats.car.mark} ${driverStats.car.model}`
                                : "Нет"}
                        </p>
                    </div>

                    <div>
                        <p className={TEXT.accent_2}>Баланс</p>
                        <p className={TEXT.default}>
                            {profile.earning_balance ?? 0} грн
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 pt-4">
                        <Link
                            to="/driver/history"
                            className={BUTTON.transparent}
                        >
                            История поездок
                        </Link>

                        <Link
                            to="/driver/stats"
                            className={BUTTON.transparent}
                        >
                            Статистика
                        </Link>
                    </div>
                </div>
            }
            right={
                <div className="flex flex-col gap-8">
                    {/* ТЕКУЩИЙ ЗАКАЗ */}
                    {!currentOrder ? (
                        <div className="border border-gray-200 rounded p-6 bg-white">
                            <h3 className={`${TEXT.subtitle} text-lg mb-3`}>
                                Текущий заказ
                            </h3>

                            <p className={TEXT.accent_1}>
                                Активного заказа нет
                            </p>
                        </div>
                    ) : (
                        <div className="border border-gray-200 rounded p-6 bg-white">
                            <h3 className={`${TEXT.subtitle} text-lg mb-3`}>
                                Текущий заказ
                            </h3>

                            <p className={TEXT.accent_1}>
                                Клиент: {currentOrder.client.id}
                            </p>
                            <p className={TEXT.accent_1}>
                                Статус: {currentOrder.status}
                            </p>
                            <p className={TEXT.accent_1}>
                                Цена: {currentOrder.transaction.amount} грн
                            </p>

                            <Link
                                to={`/driver/orders/${currentOrder.id}`}
                                className={LINK.default}
                            >
                                Перейти в заказ
                            </Link>
                        </div>
                    )}

                    {/* ДОСТУПНЫЕ ЗАКАЗЫ */}
                    <div className="border border-gray-200 rounded p-6 bg-white">
                        <h3 className={`${TEXT.subtitle} text-lg mb-4`}>
                            Доступные заказы
                        </h3>

                        <div className="flex flex-col gap-4">
                            {acceptableOrders.length === 0 && (
                                <p className={TEXT.accent_1}>
                                    Больше заказов нет
                                </p>
                            )}

                            {acceptableOrders.map((order) => (
                                <div
                                    key={order.id}
                                    className="border border-gray-300 rounded p-4 flex justify-between items-center"
                                >
                                    <div>
                                        <p className={TEXT.default}>
                                            Маршрут: {order.route.distance} км
                                        </p>
                                        <p className={TEXT.accent_2}>
                                            Класс: {order.order_class}
                                        </p>
                                        <p className={TEXT.accent_2}>
                                            Цена: {order.transaction.amount} грн
                                        </p>

                                        <Link
                                            to={`/driver/orders/${order.id}`}
                                            className={LINK.default}
                                        >
                                            Подробнее
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }
        />
    );
}
