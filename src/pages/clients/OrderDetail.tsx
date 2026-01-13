import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { DefaultLayout } from "@/components/layout/DefaultLayout";
import { styleSheet } from "@/styles/Form";

import {
    useOrderInfo,
    useOrderStat,
    useCancelOrder,
    useRateOrder,
} from "@/hooks/useClients";

import ClientCancelOrderForm from "@/components/forms/authorized/CancelOrderForm";
import ClientRateOrderForm from "@/components/forms/authorized/RateOrderForm";

import type { CancelOrderSchema, RateOrderSchema } from "@/types/authorized";
import {formatDuration} from "@/utils/helpers";

export default function OrderDetailPage(): React.ReactElement {
    const navigate = useNavigate();
    const { orderId } = useParams<{ orderId: string }>();
    const numericOrderId = orderId ? Number(orderId) : null;

    const { data: orderInfo, loading: infoLoading } =
        useOrderInfo(numericOrderId);

    const { data: orderStat, loading: statLoading } =
        useOrderStat(numericOrderId);

    const { mutate: cancelOrder, error: cancelError } = useCancelOrder(numericOrderId!);
    const { mutate: rateOrder, error: rateError } = useRateOrder(numericOrderId!);

    if (infoLoading || statLoading || !orderInfo || !orderStat) {
        return (
            <DefaultLayout>
                <div className={styleSheet.otherStyles.LOADER} />
            </DefaultLayout>
        );
    }

    const status = orderInfo.status;
    const errors = [cancelError, rateError]

    const canCancel = [
        "searching_for_driver",
        "waiting_for_driver",
        "waiting_for_client",
    ].includes(status);

    return (
        <DefaultLayout>
            {
                errors.map((error, index) => (
                    error && (
                        <p
                            className={styleSheet.emphasisStyles.BOX_WARNING}
                        >
                            {error.response.data.detail}
                        </p>
                    )
                ))
            }
            <section className={styleSheet.contentStyles.SECTION}>
                {/* ===== HEADER ===== */}
                <div className="mb-6">
                    <h1 className={styleSheet.textStyles.H1}>
                        Деталі поїздки #{orderInfo.id}
                    </h1>
                    <p className={styleSheet.textStyles.MUTED}>
                        Статус: <b>{status}</b>
                    </p>
                </div>

                {/* ===== ORDER INFO ===== */}
                <div className={`${styleSheet.containerStyles.CARD} mb-6`}>
                    <p className={styleSheet.textStyles.SMALL}>
                        Дистанція: {orderInfo.route.distance} км
                    </p>

                    <p className={styleSheet.textStyles.SUBTLE}>
                        Водій: {orderInfo.driver ? (
                            <p
                                className={styleSheet.textStyles.DEFAULT}
                            >
                                <p>
                                    {orderInfo.driver.first_name} {orderInfo.driver.last_name}
                                </p>
                                <p>
                                    {orderInfo.driver.tel_number}
                                </p>
                            </p>
                        ): ("Не призначено")}
                    </p>

                    <p className={styleSheet.textStyles.SMALL}>
                        Клас авто: {orderInfo.order_class}
                    </p>
                    <p className={styleSheet.textStyles.SMALL}>
                        Вартість: {orderInfo.transaction.amount} грн
                    </p>

                    <div>
                        <p className={styleSheet.textStyles.SUBTLE}>Маршрут</p>
                        <p className={styleSheet.textStyles.DEFAULT}>
                            {orderInfo.route.start_location.country}, {orderInfo.route.start_location.city}, {orderInfo.route.start_location.street}, {orderInfo.route.start_location.house} → {orderInfo.route.end_location.country}, {orderInfo.route.end_location.city}, {orderInfo.route.end_location.street}, {orderInfo.route.end_location.house}
                        </p>
                    </div>

                    <div>
                        <p className={styleSheet.textStyles.SUBTLE}>Повний маршрут</p>
                        {orderInfo.route.all_addresses.map((address, i) => (
                            <p className={styleSheet.textStyles.DEFAULT}>
                                #{i + 1}, {address.country}, {address.city}, {address.street}, {address.house}
                            </p>
                        ))}
                    </div>
                </div>

                {/* ===== ORDER STAT ===== */}
                <div className={`${styleSheet.containerStyles.CARD} mb-6`}>
                    <p className={styleSheet.textStyles.SMALL}>
                        Тривалість: {formatDuration(orderStat.duration)}
                    </p>

                    {orderStat.cancel_info && (
                        <div className="mt-4">
                            <p className={styleSheet.textStyles.MUTED}>
                                Поїздку скасовано
                            </p>
                            <p className={styleSheet.textStyles.DEFAULT}>
                                {orderStat.cancel_info.comment}
                            </p>
                        </div>
                    )}

                    {orderStat.rating_by_client && (
                        <div className="mt-4">
                            <p className={styleSheet.textStyles.MUTED}>
                                Ваша оцінка водію
                            </p>
                            <p className={styleSheet.textStyles.STRONG}>
                                {orderStat.rating_by_client.mark} / 5
                            </p>
                        </div>
                    )}
                </div>

                {/* ===== ACTIONS ===== */}
                <div className="flex flex-col gap-4 mb-6">
                    {canCancel && (
                        <div className={styleSheet.containerStyles.CARD}>
                            <ClientCancelOrderForm
                                submitHandler={
                                    (form: CancelOrderSchema) => {
                                        cancelOrder(form).then((result) => {
                                            if (result) {
                                                navigate("/orders/history");
                                            }
                                        });
                                    }
                                }
                            />
                        </div>
                    )}

                    {status === "waiting_for_marks" && (
                        <ClientRateOrderForm
                                submitHandler={
                                    (form: RateOrderSchema) => {
                                    rateOrder(form).then((result) => {
                                        if (result) {
                                            navigate("/orders/history");
                                        }
                                    });
                                }
                            }
                        />
                    )}
                </div>

                {/* ===== BACK ===== */}
                <button
                    className={styleSheet.inputStyles.BUTTON_SECONDARY}
                    onClick={() => navigate("/orders/history")}
                >
                    ← До історії замовлень
                </button>
            </section>
        </DefaultLayout>
    );
}
