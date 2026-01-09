import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { DefaultLayout } from "@/components/layout/DefaultLayout";
import { styleSheet } from "@/styles/Form";

import {
    useOrderInfo,
    useCancelOrder,
    useRateOrder,
    useCurrentOrder,
} from "@/hooks/useClients";

import ClientCancelOrderForm from "@/components/forms/authorized/CancelOrderForm";
import type { CancelOrderSchema } from "@/types/authorized";
import ClientRateOrderForm from "@/components/forms/authorized/RateOrderForm";
import type { RateOrderSchema } from "@/types/authorized";

export default function OrderDetailPage(): React.ReactElement {
    const navigate = useNavigate();
    const { orderId } = useParams<{ orderId: string }>();
    const numericOrderId = orderId ? Number(orderId) : null;

    const { data: currentOrder } = useCurrentOrder();
    const { data: order, loading } = useOrderInfo(numericOrderId);
    const { mutate: cancelOrder } =
        useCancelOrder(numericOrderId!);
    const { mutate: rateOrder } =
        useRateOrder(numericOrderId!);

    if (loading) {
        return (
            <div className={styleSheet.otherStyles.LOADER}></div>
        );
    }

    return (
        <DefaultLayout>
            <section className={styleSheet.contentStyles.SECTION}>
                <h1 className={styleSheet.textStyles.H1}>
                    Деталі поїздки
                </h1>

                {/* ТРИВАЛІСТЬ */}
                <div className={styleSheet.containerStyles.SMALL_CONTAINER}>
                    <p className={styleSheet.textStyles.MUTED}>
                        Тривалість
                    </p>
                    <p className={styleSheet.textStyles.DEFAULT}>
                        {order.duration ? `${order.duration} хв` : "—"}
                    </p>
                </div>

                {order.cancel_info && (
                    <div className={styleSheet.containerStyles.SMALL_CONTAINER}>
                        <p className={styleSheet.textStyles.MUTED}>
                            Поїздку скасовано
                        </p>
                        <p className={styleSheet.textStyles.DEFAULT}>
                            {order.cancel_info.comment}
                        </p>
                    </div>
                )}

                {/* ОЦІНКА КЛІЄНТА */}
                {order.rating_by_client && (
                    <div className={styleSheet.containerStyles.SMALL_CONTAINER}>
                        <p className={styleSheet.textStyles.MUTED}>
                            Ваша оцінка водію
                        </p>
                        <p className={styleSheet.textStyles.DEFAULT}>
                            {order.rating_by_client.mark} / 5
                        </p>
                    </div>
                )}

                {/* СКАСУВАННЯ ЗАМОВЛЕННЯ */}
                <ClientCancelOrderForm
                    submitHandler={(form: CancelOrderSchema) => {
                        cancelOrder(form);
                    }}
                />

                {/* ОЦІНКА ВОДІЯ */}
                <ClientRateOrderForm
                    submitHandler={(form: RateOrderSchema) => {
                        rateOrder(form);
                    }}
                />

                <div className={styleSheet.containerStyles.ROW}>
                    <button
                        className={styleSheet.inputStyles.BUTTON_SECONDARY}
                        onClick={() => navigate("/orders/history")}
                    >
                        До історії замовлень
                    </button>
                </div>
            </section>
        </DefaultLayout>
    );
}
