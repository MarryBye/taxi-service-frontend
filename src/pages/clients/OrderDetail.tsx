import React, { useState } from "react";
import {Form, useNavigate, useParams} from "react-router-dom";

import { DefaultLayout } from "@/components/layout/DefaultLayout";

import { TEXT } from "@/styles/Text";
import { BUTTON } from "@/styles/Button";
import {FormStyles} from "@/styles/Form";

import {
    useOrderInfo,
    useCancelOrder,
    useRateOrder,
    useCurrentOrder,
} from "@/hooks/useClients";

import ClientCancelOrderForm from "@/components/forms/authorized/CancelOrderForm";
import type {CancelOrderSchema} from "@/types/authorized";
import ClientRateOrderForm from "@/components/forms/authorized/RateOrderForm";
import type {RateOrderSchema} from "@/types/authorized";

export default function OrderDetailPage(): React.ReactElement {
    const navigate = useNavigate();
    const { orderId } = useParams<{ orderId: string }>();
    const numericOrderId = orderId ? Number(orderId) : null;

    const { data: currentOrder } = useCurrentOrder();
    const {data: order, loading, error} = useOrderInfo(numericOrderId);
    const { mutate: cancelOrder, loading: cancelLoading } = useCancelOrder(numericOrderId!);
    const { mutate: rateOrder, loading: rateLoading } = useRateOrder(numericOrderId!);

    if (loading) {
        return (
            <div className={FormStyles.LOADER}></div>
        )
    }

    return (
        <DefaultLayout>
            <section className="max-w-2xl mx-auto px-8 py-20">
                <h1 className={`${TEXT.title} text-3xl mb-6`}>
                    Детали поездки
                </h1>

                {/* ДЛИТЕЛЬНОСТЬ */}
                <div className="mb-4">
                    <p className="text-sm text-gray-500">Длительность</p>
                    <p className="font-medium">
                        {order.duration ? `${order.duration} мин` : "—"}
                    </p>
                </div>


                {order.cancel_info && (
                    <div className="mb-4">
                        <p className="text-sm text-gray-500">
                            Поездка отменена
                        </p>
                        <p className="text-sm">
                            {order.cancel_info.comment}
                        </p>
                    </div>
                )}

                {/* ВАША ОЦЕНКА */}
                {order.rating_by_client && (
                    <div className="mb-4">
                        <p className="text-sm text-gray-500">
                            Ваша оценка водителю
                        </p>
                        <p className="font-medium">
                            {order.rating_by_client.mark} / 5
                        </p>
                    </div>
                )}

                {/* ОТМЕНА ЗАКАЗА (CLIENT) */}
                <ClientCancelOrderForm
                    submitHandler={
                        (form: CancelOrderSchema) => {
                            console.log(form);
                            cancelOrder(form);
                        }
                    }
                />

                {/* ОЦЕНКА ВОДИТЕЛЯ (CLIENT) */}
                <ClientRateOrderForm
                    submitHandler={
                        (form: RateOrderSchema) => {
                            rateOrder(form)
                        }
                    }
                />

                <div className="flex gap-4 mt-6">
                    <button
                        className={BUTTON.transparent}
                        onClick={() => navigate("/orders/history")}
                    >
                        К истории заказов
                    </button>
                </div>
            </section>
        </DefaultLayout>
    );
}
