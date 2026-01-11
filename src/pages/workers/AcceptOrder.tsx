import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { DriverLayout } from "@/components/layout/DriverLayout";
import { styleSheet } from "@/styles/Form";

import {
    useDriverOrderInfo,
    useDriverOrderStat,
    useAcceptOrder,
    useDriverCancelOrder,
    useDriverRateOrder,
    useSubmitArrival,
    useSubmitFinish,
    useSubmitStart,
} from "@/hooks/useDrivers";

import type { CancelOrderSchema, RateOrderSchema } from "@/types/workers";
import WorkerRateOrderForm from "@/components/forms/workers/RateOrderForm";
import WorkerCancelOrderForm from "@/components/forms/workers/CancelOrderForm";

export default function DriverOrderDetailPage(): React.ReactElement {
    const navigate = useNavigate();
    const { orderId } = useParams<{ orderId: string }>();
    const numericOrderId = orderId ? Number(orderId) : null;

    /* ===== DATA ===== */
    const { data: orderInfo, loading: infoLoading } =
        useDriverOrderInfo(numericOrderId);

    const { data: orderStat, loading: statLoading } =
        useDriverOrderStat(numericOrderId);

    /* ===== ACTIONS ===== */
    const { mutate: acceptOrder } = useAcceptOrder(numericOrderId);
    const { mutate: submitArrive } = useSubmitArrival(numericOrderId);
    const { mutate: submitStart } = useSubmitStart(numericOrderId);
    const { mutate: submitFinish } = useSubmitFinish(numericOrderId);
    const { mutate: cancelOrder } = useDriverCancelOrder(numericOrderId);
    const { mutate: rateOrder } = useDriverRateOrder(numericOrderId);

    if (infoLoading || statLoading || !orderInfo || !orderStat) {
        return (
            <DriverLayout
                left={null}
                right={<div className={styleSheet.otherStyles.LOADER} />}
            />
        );
    }

    const status = orderInfo.status;

    return (
        <DriverLayout
            left={null}
            right={
                <section className={styleSheet.contentStyles.SECTION_NARROW}>
                    {/* ===== HEADER ===== */}
                    <div className="mb-6">
                        <h1 className={styleSheet.textStyles.H2}>
                            Замовлення #{orderInfo.id}
                        </h1>
                        <p className={styleSheet.textStyles.MUTED}>
                            Статус: <b>{status}</b>
                        </p>
                    </div>

                    {/* ===== ORDER INFO ===== */}
                    <div className={`${styleSheet.containerStyles.CARD} mb-6`}>
                        <p className={styleSheet.textStyles.SMALL}>
                            Клієнт:{" "}
                            {orderInfo.client.first_name}{" "}
                            {orderInfo.client.last_name}
                        </p>

                        <p className={styleSheet.textStyles.SMALL}>
                            Дистанція: {orderInfo.route.distance} км
                        </p>

                        <p className={styleSheet.textStyles.SMALL}>
                            Клас авто: {orderInfo.order_class}
                        </p>

                        <p className={styleSheet.textStyles.SMALL}>
                            Вартість: {orderInfo.transaction.amount} грн
                        </p>
                    </div>

                    {/* ===== ORDER STAT ===== */}
                    <div className={`${styleSheet.containerStyles.CARD} mb-6`}>
                        <p className={styleSheet.textStyles.SMALL}>
                            Тривалість:{" "}
                            {orderStat.duration
                                ? `${orderStat.duration} хв`
                                : "—"}
                        </p>

                        {orderStat.cancel_info && (
                            <div className="mt-4">
                                <p className={styleSheet.textStyles.MUTED}>
                                    Замовлення скасовано
                                </p>
                                <p className={styleSheet.textStyles.DEFAULT}>
                                    {orderStat.cancel_info.comment}
                                </p>
                            </div>
                        )}

                        {orderStat.rating_by_driver && (
                            <div className="mt-4">
                                <p className={styleSheet.textStyles.MUTED}>
                                    Ваша оцінка
                                </p>
                                <p className={styleSheet.textStyles.STRONG}>
                                    {orderStat.rating_by_driver.mark} / 5
                                </p>
                            </div>
                        )}
                    </div>

                    {/* ===== ACTIONS ===== */}
                    <div className="flex flex-col gap-4 mb-6">
                        {status === "searching_for_driver" && (
                            <PrimaryAction
                                label="Прийняти замовлення"
                                onClick={acceptOrder}
                            />
                        )}

                        {status === "waiting_for_driver" && (
                            <>
                                <PrimaryAction
                                    label="Приїхав на точку"
                                    onClick={submitArrive}
                                />
                                <CancelBlock onSubmit={cancelOrder} />
                            </>
                        )}

                        {status === "waiting_for_client" && (
                            <>
                                <PrimaryAction
                                    label="Почати поїздку"
                                    onClick={submitStart}
                                />
                                <CancelBlock onSubmit={cancelOrder} />
                            </>
                        )}

                        {status === "in_progress" && (
                            <>
                                <PrimaryAction
                                    label="Завершити поїздку"
                                    onClick={submitFinish}
                                />
                                <CancelBlock onSubmit={cancelOrder} />
                            </>
                        )}

                        {status === "waiting_for_marks" && (
                            <WorkerRateOrderForm
                                submitHandler={(form: RateOrderSchema) =>
                                    rateOrder(form)
                                }
                            />
                        )}
                    </div>

                    {/* ===== BACK ===== */}
                    <button
                        className={styleSheet.inputStyles.BUTTON_SECONDARY}
                        onClick={() => navigate("/driver")}
                    >
                        ← Назад
                    </button>
                </section>
            }
        />
    );
}

/* ================= helpers ================= */

function PrimaryAction({
                           label,
                           onClick,
                       }: {
    label: string;
    onClick: () => void;
}) {
    return (
        <button
            className={styleSheet.inputStyles.BUTTON_PRIMARY}
            onClick={onClick}
        >
            {label}
        </button>
    );
}

function CancelBlock({
                         onSubmit,
                     }: {
    onSubmit: (form: CancelOrderSchema) => void;
}) {
    return (
        <div className={`${styleSheet.containerStyles.CARD} mt-2`}>
            <WorkerCancelOrderForm submitHandler={onSubmit} />
        </div>
    );
}
