import React from "react";
import { Link } from "react-router-dom";

import { DriverLayout } from "@/components/layout/DriverLayout";
import { styleSheet } from "@/styles/Form";

import { useProfile } from "@/hooks/useClients";
import {
    useDriverStats,
    useDriverCurrentOrder,
    useAcceptableOrders,
} from "@/hooks/useDrivers";

export default function DriverHomePage(): React.ReactElement | null {
    const { data: profile, loading: profileLoading } = useProfile();
    const { data: driverStats, loading: statsLoading } = useDriverStats();
    const { data: currentOrder } = useDriverCurrentOrder();
    const { data: acceptableOrders, loading: acceptableLoading } =
        useAcceptableOrders();

    if (profileLoading || statsLoading || acceptableLoading) {
        return null;
    }

    if (!profile || !driverStats || !acceptableOrders) {
        return null;
    }

    return (
        <DriverLayout
            left={
                <div className={styleSheet.layoutStyles.STACK}>
                    <div>
                        <h2
                            className={`${styleSheet.textStyles.H3} mb-2`}
                        >
                            Водій
                        </h2>

                        <p className={styleSheet.textStyles.DEFAULT}>
                            {profile.first_name} {profile.last_name}
                        </p>
                    </div>

                    <div>
                        <p className={styleSheet.textStyles.MUTED}>
                            Автомобіль
                        </p>
                        <p className={styleSheet.textStyles.DEFAULT}>
                            {driverStats.car
                                ? `${driverStats.car.mark} ${driverStats.car.model}`
                                : "Немає"}
                        </p>
                    </div>

                    <div>
                        <p className={styleSheet.textStyles.MUTED}>
                            Баланс
                        </p>
                        <p className={styleSheet.textStyles.DEFAULT}>
                            {profile.earning_balance ?? 0} грн
                        </p>
                    </div>

                    <div
                        className={`${styleSheet.containerStyles.COLUMN} pt-4`}
                    >
                        <Link
                            to="/driver/history"
                            className={styleSheet.inputStyles.BUTTON_SECONDARY}
                        >
                            Історія поїздок
                        </Link>

                        <Link
                            to="/driver/stats"
                            className={styleSheet.inputStyles.BUTTON_SECONDARY}
                        >
                            Статистика
                        </Link>
                    </div>
                </div>
            }
            right={
                <div className={styleSheet.layoutStyles.STACK}>
                    {/* ПОТОЧНЕ ЗАМОВЛЕННЯ */}
                    {!currentOrder ? (
                        <div className={styleSheet.containerStyles.CARD}>
                            <h3
                                className={`${styleSheet.textStyles.H4} mb-3`}
                            >
                                Поточне замовлення
                            </h3>

                            <p className={styleSheet.textStyles.SUBTLE}>
                                Активного замовлення немає
                            </p>
                        </div>
                    ) : (
                        <div className={styleSheet.containerStyles.CARD}>
                            <h3
                                className={`${styleSheet.textStyles.H4} mb-3`}
                            >
                                Поточне замовлення
                            </h3>

                            <p className={styleSheet.textStyles.SMALL}>
                                Клієнт: {currentOrder.client.id}
                            </p>
                            <p className={styleSheet.textStyles.SMALL}>
                                Статус: {currentOrder.status}
                            </p>
                            <p className={styleSheet.textStyles.SMALL}>
                                Ціна: {currentOrder.transaction.amount} грн
                            </p>

                            <Link
                                to={`/driver/orders/${currentOrder.id}`}
                                className={styleSheet.textStyles.LINK}
                            >
                                Перейти до замовлення
                            </Link>
                        </div>
                    )}

                    {/* ДОСТУПНІ ЗАМОВЛЕННЯ */}
                    <div className={styleSheet.containerStyles.CARD}>
                        <h3
                            className={`${styleSheet.textStyles.H4} mb-4`}
                        >
                            Доступні замовлення
                        </h3>

                        <div className={styleSheet.layoutStyles.STACK}>
                            {acceptableOrders.length === 0 && (
                                <p className={styleSheet.textStyles.SUBTLE}>
                                    Більше замовлень немає
                                </p>
                            )}

                            {acceptableOrders.map((order) => (
                                <div
                                    key={order.id}
                                    className={`${styleSheet.containerStyles.CARD} flex justify-between items-center`}
                                >
                                    <div>
                                        <p className={styleSheet.textStyles.DEFAULT}>
                                            Маршрут: {order.route.distance} км
                                        </p>
                                        <p className={styleSheet.textStyles.MUTED}>
                                            Клас: {order.order_class}
                                        </p>
                                        <p className={styleSheet.textStyles.MUTED}>
                                            Ціна: {order.transaction.amount} грн
                                        </p>

                                        <Link
                                            to={`/driver/orders/${order.id}`}
                                            className={styleSheet.textStyles.LINK}
                                        >
                                            Детальніше
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
