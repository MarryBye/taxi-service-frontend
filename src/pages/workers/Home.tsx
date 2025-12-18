import React from "react";
import { Link } from "react-router-dom";

import { DriverLayout } from "@/components/layout/DriverLayout";

import { TEXT } from "@/styles/Text";
import { LINK } from "@/styles/Link";
import { BUTTON } from "@/styles/Button";

import { useDriverCurrentOrder, useDriverStats, useAcceptableOrders, useAcceptOrder, useCancelOrder, useCompleteOrder, useSubmitArrive, useSubmitStart, useRateOrder, useDriverHistory } from "@/hooks/useDrivers";
import type { Order } from "@/types/orders";

export default function DriverHomePage(): React.ReactElement | null {
    const { data: current_order, loading: current_order_loading, error: current_order_error } = useDriverCurrentOrder();
    const { data: driver, loading: driver_loading, error: driver_error } = useDriverStats();
    const { data: acceptable_orders, loading: acceptable_orders_loading, error: acceptable_orders_error } = useAcceptableOrders();
    const { mutate: acceptOrder, loading, error } = useAcceptOrder();

    const { mutate: cancelOrder, loading: cancelOrderLoading, error: cancelOrderError } = useCancelOrder();
    const { mutate: completeOrder, loading: completeOrderLoading, error: completeOrderError } = useCompleteOrder();
    const { mutate: submitArrive, loading: submitArriveLoading, error: submitArriveError } = useSubmitArrive();
    const { mutate: submitStart, loading: submitStartLoading, error: submitStartError } = useSubmitStart();
    const { mutate: rateOrder, loading: rateOrderLoading, error: rateOrderError } = useRateOrder();

    if (driver_loading || !driver) return null;
    if (acceptable_orders_loading || !acceptable_orders) return null;
    if (current_order_loading || !current_order) return null;

    return (
        <DriverLayout
            left={
                <div className="flex flex-col gap-6">
                    <div>
                        <h2 className={`${TEXT.title} text-xl mb-2`}>
                            Водитель
                        </h2>

                        <p className={TEXT.default}>
                            {driver.first_name} {driver.last_name}
                        </p>
                    </div>

                    {driver.car_id ? (
                        <div>
                            <p className={TEXT.accent_2}>Автомобиль</p>
                            <p className={TEXT.default}>{driver.car_id}</p>
                        </div>
                    ) : (<div>
                        <p className={TEXT.accent_2}>Автомобиль</p>
                        <p className={TEXT.default}>Нет</p>
                    </div>)}
                    <div>
                        <p className={TEXT.accent_2}>Баланс</p>
                        <p className={TEXT.default}>
                            {driver.earning_balance ? driver.earning_balance : 0} грн
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 pt-4">
                        <Link
                            to="/worker/history"
                            className={BUTTON.transparent}
                        >
                            История поездок
                        </Link>

                        <Link
                            to="/worker/stats"
                            className={BUTTON.transparent}
                        >
                            Статистика
                        </Link>
                    </div>
                </div>
            }
            right={
                <div className="flex flex-col gap-8">
                    {!current_order ?
                        <div className="border border-gray-200 rounded p-6 bg-white">
                            <h3 className={`${TEXT.subtitle} text-lg mb-3`}>
                                Текущий заказ
                            </h3>

                            <p className={TEXT.accent_1}>
                                Активного заказа нет
                            </p>
                        </div>
                        :
                        <div className="flex flex-row gap-4 justify-between border border-gray-200 rounded p-6 bg-white items-center">
                            <div>
                                <h3 className={`${TEXT.subtitle} text-lg mb-3`}>
                                    Текущий заказ
                                </h3>

                                <p className={TEXT.accent_1}>
                                    Кліент: {current_order.client_id}
                                </p>
                                <p className={TEXT.accent_1}>
                                    Статус: {current_order.status}
                                </p>
                                <p className={TEXT.accent_1}>
                                    Цена: {current_order.transaction_id}
                                </p>
                                <p className={TEXT.accent_1}>
                                    Маршрут: {current_order.route_id}
                                </p>
                            </div>
                            <div className='flex flex-col gap-4'>
                                {
                                    current_order.status === 'waiting_for_driver' ?
                                        <button className={BUTTON.success} onClick={async () => await submitArrive({})}>
                                            Прибыл
                                        </button>
                                    : current_order.status === 'waiting_for_client' ?
                                        <button className={BUTTON.success} onClick={async () => await submitStart({})}>
                                            Начало поездки
                                        </button>
                                    : current_order.status === 'in_progress' ?
                                        <button className={BUTTON.success} onClick={async () => await completeOrder({})}>
                                            Завершить
                                        </button>
                                    : current_order.status === 'waiting_for_marks' ?
                                        <button className={BUTTON.transparent} onClick={async () => await rateOrder({
                                            mark: 5,
                                            comment: "Opa!",
                                            client_tags: ['accurate', 'communicative']
                                        })}>
                                            Оценить
                                        </button>
                                    : null
                                }
                                {current_order.status !== 'waiting_for_marks' ?
                                    <button className={BUTTON.warning} onClick={async () => await cancelOrder({
                                        comment: "Opa",
                                        client_tags: ["reason 1", "reason 2"]
                                    })}>
                                        Отменить
                                    </button>
                                :
                                    null
                                }

                            </div>
                        </div>
                    }

                    <div className="border border-gray-200 rounded p-6 bg-white">
                        <h3 className={`${TEXT.subtitle} text-lg mb-4`}>
                            Доступные заказы
                        </h3>

                        <div className="flex flex-col gap-4">

                            {
                                acceptable_orders.map(order => (
                                    <div className="border border-gray-300 rounded p-4 flex justify-between items-center">
                                        <div>
                                            <p className={TEXT.default}>
                                                Маршрут: {order.route_id}
                                            </p>
                                            <p className={TEXT.accent_2}>
                                                Класс: {order.order_class}
                                            </p>
                                            <p className={TEXT.accent_2}>
                                                Цена: {order.transaction_id}
                                            </p>
                                        </div>

                                        <button className={BUTTON.default} onClick={() => acceptOrder({order_id: order.id})}>
                                            Принять
                                        </button>
                                    </div>
                                ))
                            }

                            <p className={TEXT.accent_1}>
                                Больше заказов нет
                            </p>
                        </div>
                    </div>
                </div>
            }
        />
    );
}
