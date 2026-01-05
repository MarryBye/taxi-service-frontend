import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { DriverLayout } from "@/components/layout/DriverLayout";
import { TEXT } from "@/styles/Text";
import { BUTTON } from "@/styles/Button";

import {
    useDriverCurrentOrder,
    useDriverOrderStat,
    useAcceptOrder,
    useDriverCancelOrder,
    useDriverRateOrder,

    useSubmitArrival,
    useSubmitFinish,
    useSubmitStart
} from "@/hooks/useDrivers";

import type {CancelOrderSchema, RateOrderSchema} from "@/types/workers";
import WorkerRateOrderForm from "@/components/forms/workers/RateOrderForm";
import WorkerCancelOrderForm from "@/components/forms/workers/CancelOrderForm";
import {FormStyles} from "@/styles/Form"; // <-- ВАЖНО: схемы водителя

export default function DriverOrderDetailPage(): React.ReactElement {
    const navigate = useNavigate();
    const { orderId } = useParams<{ orderId: string }>();
    const numericOrderId = orderId ? Number(orderId) : null;

    const {data: order, loading: order_loading, error: order_error} = useDriverOrderStat(numericOrderId);
    const {data: current_order, loading: current_order_loading, error: current_order_error} = useDriverCurrentOrder();
    const {mutate: acceptOrder} = useAcceptOrder(numericOrderId);
    const {mutate: submitArrive} = useSubmitArrival(numericOrderId);
    const {mutate: submitFinish} = useSubmitFinish(numericOrderId);
    const {mutate: submitStart} = useSubmitStart(numericOrderId);
    const {mutate: cancelOrder} = useDriverCancelOrder(numericOrderId);
    const {mutate: rateOrder} = useDriverRateOrder(numericOrderId);

    if (order_loading) {
        return (
            <div className={FormStyles.LOADER}></div>
        )
    }

    return (
        <DriverLayout
            left={null}
            right={
                <section className="max-w-xl mx-auto px-6 py-16">
                    <h1 className={`${TEXT.title} text-2xl mb-6`}>
                        Заказ #{order.id}
                    </h1>

                    <p className="text-sm text-gray-500 mb-4">
                        Длительность: {order.duration ? `${order.duration} мин` : "—"}
                    </p>

                    {order.cancel_info && (
                        <div className="mb-4">
                            <p className="text-sm text-gray-500">Заказ отменён</p>
                            <p>{order.cancel_info.comment}</p>
                        </div>
                    )}

                    {order.rating_by_driver && (
                        <div className="mb-4">
                            <p className="text-sm text-gray-500">Ваша оценка</p>
                            <p className="font-medium">{order.rating_by_driver.mark} / 5</p>
                        </div>
                    )}

                    <button className={BUTTON.default} onClick={acceptOrder}>
                        Принять заказ
                    </button>

                    <button className={BUTTON.default} onClick={submitArrive}>
                        Приїхав на точку
                    </button>

                    <button className={BUTTON.default} onClick={submitStart}>
                        Почати поїздку
                    </button>

                    <button className={BUTTON.default} onClick={submitFinish}>
                        Закінчити поїздку
                    </button>

                    <WorkerCancelOrderForm
                        submitHandler={
                            (form: CancelOrderSchema) => {
                                console.log(form);
                                cancelOrder(form);
                            }
                        }
                    />

                    <WorkerRateOrderForm
                        submitHandler={
                            (form: RateOrderSchema) => {
                                rateOrder(form)
                            }
                        }
                    />

                    <button
                        className={`${BUTTON.transparent} mt-8`}
                        onClick={() => navigate("/driver")}
                    >
                        Назад
                    </button>
                </section>
            }
        />
    );
}
