import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import {formatDuration} from "@/utils/helpers";
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
import {DefaultLayout} from "@/components/layout/DefaultLayout";
import {useClientStats} from "@/hooks/useClients";

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
    const { mutate: acceptOrder, error: acceptError } = useAcceptOrder(numericOrderId);
    const { mutate: submitArrive, error: arriveError } = useSubmitArrival(numericOrderId);
    const { mutate: submitStart, error: startError } = useSubmitStart(numericOrderId);
    const { mutate: submitFinish, error: finishError } = useSubmitFinish(numericOrderId);
    const { mutate: cancelOrder, error: cancelError } = useDriverCancelOrder(numericOrderId);
    const { mutate: rateOrder, error: rateError } = useDriverRateOrder(numericOrderId);

    if (infoLoading || statLoading || !orderInfo || !orderStat) {
        return (
            <DefaultLayout>
                <div className={styleSheet.otherStyles.LOADER} />
            </DefaultLayout>
        );
    }

    const errors = [
        rateError, cancelError, finishError, startError, arriveError, acceptError
    ]

    const status = orderInfo.status;

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

            <section className={styleSheet.contentStyles.SECTION_NARROW}>

                <button
                    className={styleSheet.inputStyles.BUTTON_SECONDARY}
                    onClick={() => navigate("/driver")}
                >
                    ← Назад
                </button>

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
                        {orderInfo.client.last_name}{" "}
                    </p>

                    <p className={styleSheet.textStyles.SMALL}>
                        Телефон:{" "}
                        {orderInfo.client.tel_number}
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
                            onClick={() => {
                                acceptOrder().then((result) => {
                                    if (result) {
                                        navigate("/driver");
                                    }
                                });
                            }}
                        />
                    )}

                    {status === "waiting_for_driver" && (
                        <>
                            <PrimaryAction
                                label="Приїхав на точку"
                                onClick={() => {
                                    submitArrive().then((result) => {
                                        if (result) {
                                            navigate("/driver");
                                        }
                                    });
                                }}
                            />
                            <CancelBlock onSubmit={cancelOrder} />
                        </>
                    )}

                    {status === "waiting_for_client" && (
                        <>
                            <PrimaryAction
                                label="Почати поїздку"
                                onClick={() => {
                                    submitStart().then((result) => {
                                        if (result) {
                                            navigate("/driver");
                                        }
                                    });
                                }}
                            />
                            <CancelBlock onSubmit={cancelOrder} />
                        </>
                    )}

                    {status === "in_progress" && (
                        <>
                            <PrimaryAction
                                label="Завершити поїздку"
                                onClick={() => {
                                    submitFinish().then((result) => {
                                        if (result) {
                                            navigate("/driver");
                                        }
                                    });
                                }}
                            />
                            <CancelBlock onSubmit={cancelOrder} />
                        </>
                    )}

                    {status === "waiting_for_marks" && (
                        <WorkerRateOrderForm
                            submitHandler={
                                (form: RateOrderSchema) => {
                                    rateOrder(form).then((result) => {
                                        if (result) {
                                            navigate("/driver");
                                        }
                                    });
                                }
                            }
                        />
                    )}
                </div>
            </section>
        </DefaultLayout>
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
