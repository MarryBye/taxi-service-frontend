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

export default function DriverHomePage(): React.ReactElement {
    const { data: profile, loading: profileLoading } = useProfile();
    const { data: driverStats, loading: statsLoading } = useDriverStats();
    const { data: currentOrder } = useDriverCurrentOrder();
    const { data: acceptableOrders, loading: acceptableLoading, error: acceptableError } = useAcceptableOrders();

    if (profileLoading || statsLoading || acceptableLoading) {
        return (
            <DriverLayout
                left={null}
                right={
                    <p className={styleSheet.textStyles.MUTED}>
                        Завантаження…
                    </p>
                }
            />
        );
    }

    if (!profile || !driverStats) {
        return (
            <DriverLayout
                left={null}
                right={
                    <div className={styleSheet.emphasisStyles.BOX_DANGER}>
                        Не вдалося завантажити дані водія
                    </div>
                }
            />
        );
    }

    return (
        <DriverLayout
            /* ================= LEFT ================= */
            left={
                <div className={styleSheet.layoutStyles.STACK}>
                    <div>
                        <h2 className={styleSheet.textStyles.H3}>
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
                        <Link
                            to='/driver/withdraw_cash'
                            className={styleSheet.inputStyles.BUTTON_SECONDARY}>
                            {profile.earning_balance ?? 0} грн
                        </Link>
                    </div>

                    <div className="flex flex-col gap-3 pt-4">
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

            /* ================= RIGHT ================= */
            right={
                <div className={styleSheet.layoutStyles.STACK}>
                    {/* CURRENT ORDER */}
                    <div className={styleSheet.containerStyles.CARD}>
                        <h3 className={styleSheet.textStyles.H4}>
                            Поточне замовлення
                        </h3>

                        {!currentOrder ? (
                            <p className={styleSheet.textStyles.SUBTLE}>
                                Активного замовлення немає
                            </p>
                        ) : (
                            <div className="flex flex-col gap-2">
                                <p className={styleSheet.textStyles.SMALL}>
                                    Статус: <b>{currentOrder.status}</b>
                                </p>
                                <p className={styleSheet.textStyles.SMALL}>
                                    Ціна: <b>{currentOrder.transaction.amount} грн</b>
                                </p>

                                <Link
                                    to={`/driver/orders/${currentOrder.id}`}
                                    className={styleSheet.textStyles.LINK}
                                >
                                    Перейти до замовлення →
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* ACCEPTABLE ORDERS */}
                    <div className={styleSheet.containerStyles.CARD}>
                        <h3 className={styleSheet.textStyles.H4}>
                            Доступні замовлення
                        </h3>

                        {acceptableOrders.length === 0 ? (
                            <p className={styleSheet.textStyles.SUBTLE}>
                                Більше замовлень немає
                            </p>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {acceptableOrders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="border rounded-lg px-4 py-3 flex justify-between items-center"
                                    >
                                        <div className="flex flex-col gap-1">
                                            <p className={styleSheet.textStyles.DEFAULT}>
                                                {order.route.distance} км
                                            </p>
                                            <p className={styleSheet.textStyles.MUTED}>
                                                Клас: {order.order_class}
                                            </p>
                                            <p className={styleSheet.textStyles.MUTED}>
                                                Ціна: {order.transaction.amount} грн
                                            </p>
                                        </div>

                                        <Link
                                            to={`/driver/orders/${order.id}`}
                                            className={styleSheet.textStyles.LINK}
                                        >
                                            Деталі →
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            }
        />
    );
}
