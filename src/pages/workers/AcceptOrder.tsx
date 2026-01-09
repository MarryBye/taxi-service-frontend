import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { DriverLayout } from "@/components/layout/DriverLayout";
import { styleSheet } from "@/styles/Form";

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

import type { CancelOrderSchema, RateOrderSchema } from "@/types/workers";
import WorkerRateOrderForm from "@/components/forms/workers/RateOrderForm";
import WorkerCancelOrderForm from "@/components/forms/workers/CancelOrderForm";

export default function DriverOrderDetailPage(): React.ReactElement {
    const navigate = useNavigate();
    const { orderId } = useParams<{ orderId: string }>();
    const numericOrderId = orderId ? Number(orderId) : null;

    const { data: order, loading: order_loading } =
        useDriverOrderStat(numericOrderId);

    const { data: current_order, loading: current_order_loading } =
        useDriverCurrentOrder();

    const { mutate: acceptOrder } = useAcceptOrder(numericOrderId);
    const { mutate: submitArrive } = useSubmitArrival(numericOrderId);
    const { mutate: submitFinish } = useSubmitFinish(numericOrderId);
    const { mutate: submitStart } = useSubmitStart(numericOrderId);
    const { mutate: cancelOrder } = useDriverCancelOrder(numericOrderId);
    const { mutate: rateOrder } = useDriverRateOrder(numericOrderId);

    if (order_loading) {
        return (
            <div className={styleSheet.otherStyles.LOADER}></div>
        );
    }

    return (
        <DriverLayout
            left={null}
            right={
                <section className={`${styleSheet.contentStyles.SECTION_NARROW}`}>
                    <h1
                        className={`${styleSheet.textStyles.H2} mb-6`}
                    >
                        Заказ #{order.id}
                    </h1>

                    <p
                        className={`${styleSheet.textStyles.MUTED} mb-4`}
                    >
                        Длительность:{" "}
                        {order.duration ? `${order.duration} мин` : "—"}
                    </p>

                    {order.cancel_info && (
                        <div className="mb-4">
                            <p className={styleSheet.textStyles.MUTED}>
                                Заказ отменён
                            </p>
                            <p className={styleSheet.textStyles.DEFAULT}>
                                {order.cancel_info.comment}
                            </p>
                        </div>
                    )}

                    {order.rating_by_driver && (
                        <div className="mb-4">
                            <p className={styleSheet.textStyles.MUTED}>
                                Ваша оценка
                            </p>
                            <p className={styleSheet.textStyles.STRONG}>
                                {order.rating_by_driver.mark} / 5
                            </p>
                        </div>
                    )}

                    <button
                        className={styleSheet.inputStyles.BUTTON_PRIMARY}
                        onClick={acceptOrder}
                    >
                        Принять заказ
                    </button>

                    <button
                        className={styleSheet.inputStyles.BUTTON_PRIMARY}
                        onClick={submitArrive}
                    >
                        Приїхав на точку
                    </button>

                    <button
                        className={styleSheet.inputStyles.BUTTON_PRIMARY}
                        onClick={submitStart}
                    >
                        Почати поїздку
                    </button>

                    <button
                        className={styleSheet.inputStyles.BUTTON_PRIMARY}
                        onClick={submitFinish}
                    >
                        Закінчити поїздку
                    </button>

                    <WorkerCancelOrderForm
                        submitHandler={(form: CancelOrderSchema) => {
                            console.log(form);
                            cancelOrder(form);
                        }}
                    />

                    <WorkerRateOrderForm
                        submitHandler={(form: RateOrderSchema) => {
                            rateOrder(form);
                        }}
                    />

                    <button
                        className={`${styleSheet.inputStyles.BUTTON_SECONDARY} mt-8`}
                        onClick={() => navigate("/driver")}
                    >
                        Назад
                    </button>
                </section>
            }
        />
    );
}
