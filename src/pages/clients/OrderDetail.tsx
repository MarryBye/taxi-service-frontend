import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { DefaultLayout } from "@/components/layout/DefaultLayout";

import { TEXT } from "@/styles/Text";
import { BUTTON } from "@/styles/Button";

import {
    useOrderInfo,
    useCancelOrder,
    useRateOrder,
    useCurrentOrder,
} from "@/hooks/useClients";

import type {
    ClientTags,
    ClientCancelTags,
} from "@/types/enums/db";

export default function OrderDetailPage(): React.ReactElement {
    const navigate = useNavigate();
    const { orderId } = useParams<{ orderId: string }>();

    const numericOrderId = orderId ? Number(orderId) : null;

    const {
        data: order,
        loading,
        error,
    } = useOrderInfo(numericOrderId);

    const { data: currentOrder } = useCurrentOrder();

    const { mutate: cancelOrder, loading: cancelLoading } =
        useCancelOrder(numericOrderId!);

    const { mutate: rateOrder, loading: rateLoading } =
        useRateOrder(numericOrderId!);

    const [cancelComment, setCancelComment] = useState("");
    const [cancelTags, setCancelTags] = useState<ClientCancelTags[]>([]);

    const [rateMark, setRateMark] = useState<number>(5);
    const [rateComment, setRateComment] = useState("");
    const [rateTags, setRateTags] = useState<ClientTags[]>([]);

    if (loading) {
        return (
            <DefaultLayout>
                <p className="text-center py-20">Загрузка поездки…</p>
            </DefaultLayout>
        );
    }

    if (error || !order) {
        return (
            <DefaultLayout>
                <p className="text-center py-20 text-gray-500">
                    Информация о поездке недоступна
                </p>
            </DefaultLayout>
        );
    }

    const isCurrentOrder =
        currentOrder && currentOrder.id === order.id;

    const canRate =
        order.duration !== null &&
        !order.cancel_info &&
        !order.rating_by_client;

    function toggleTag<T>(
        tag: T,
        list: T[],
        setList: (v: T[]) => void
    ) {
        setList(
            list.includes(tag)
                ? list.filter((t) => t !== tag)
                : [...list, tag]
        );
    }

    async function handleCancelSubmit(e: React.FormEvent) {
        e.preventDefault();

        await cancelOrder({
            comment: cancelComment,
            tags: cancelTags,
        });

        navigate("/orders/history");
    }

    async function handleRateSubmit(e: React.FormEvent) {
        e.preventDefault();

        await rateOrder({
            mark: rateMark,
            comment: rateComment,
            tags: rateTags,
        });

        navigate("/orders/history");
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

                {/* ИНФОРМАЦИЯ ОБ ОТМЕНЕ */}
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
                {isCurrentOrder && !order.cancel_info && (
                    <form
                        onSubmit={handleCancelSubmit}
                        className="border rounded p-4 mb-6 flex flex-col gap-3"
                    >
                        <p className="font-medium">
                            Отменить поездку
                        </p>

                        <textarea
                            placeholder="Комментарий"
                            value={cancelComment}
                            onChange={(e) =>
                                setCancelComment(e.target.value)
                            }
                            className="border rounded px-3 py-2"
                        />

                        {/* ClientCancelTags */}
                        <div className="flex flex-wrap gap-3">
                            {(
                                [
                                    "driver_too_far",
                                    "long_wait_time",
                                    "changed_plans",
                                    "wrong_pickup_location",
                                    "found_another_transport",
                                    "driver_not_responding",
                                    "price_too_high",
                                    "emergency",
                                    "other",
                                ] as ClientCancelTags[]
                            ).map((tag) => (
                                <label
                                    key={tag}
                                    className="flex items-center gap-2 text-sm"
                                >
                                    <input
                                        type="checkbox"
                                        checked={cancelTags.includes(tag)}
                                        onChange={() =>
                                            toggleTag(
                                                tag,
                                                cancelTags,
                                                setCancelTags
                                            )
                                        }
                                    />
                                    {tag}
                                </label>
                            ))}
                        </div>

                        <button
                            type="submit"
                            disabled={cancelLoading}
                            className={BUTTON.transparent}
                        >
                            Отменить поездку
                        </button>
                    </form>
                )}

                {/* ОЦЕНКА ВОДИТЕЛЯ (CLIENT) */}
                {canRate && (
                    <form
                        onSubmit={handleRateSubmit}
                        className="border rounded p-4 mb-6 flex flex-col gap-3"
                    >
                        <p className="font-medium">
                            Оценить водителя
                        </p>

                        <select
                            value={rateMark}
                            onChange={(e) =>
                                setRateMark(Number(e.target.value))
                            }
                            className="border rounded px-3 py-2"
                        >
                            {[1, 2, 3, 4, 5].map((m) => (
                                <option key={m} value={m}>
                                    {m}
                                </option>
                            ))}
                        </select>

                        <textarea
                            placeholder="Комментарий"
                            value={rateComment}
                            onChange={(e) =>
                                setRateComment(e.target.value)
                            }
                            className="border rounded px-3 py-2"
                        />

                        {/* ClientTags */}
                        <div className="flex flex-wrap gap-3">
                            {(
                                [
                                    "accurate",
                                    "friendly",
                                    "respectful",
                                    "communicative",
                                    "polite",
                                    "on_time",
                                    "clear_instructions",
                                    "calm",
                                    "helpful",
                                    "other",
                                ] as ClientTags[]
                            ).map((tag) => (
                                <label
                                    key={tag}
                                    className="flex items-center gap-2 text-sm"
                                >
                                    <input
                                        type="checkbox"
                                        checked={rateTags.includes(tag)}
                                        onChange={() =>
                                            toggleTag(
                                                tag,
                                                rateTags,
                                                setRateTags
                                            )
                                        }
                                    />
                                    {tag}
                                </label>
                            ))}
                        </div>

                        <button
                            type="submit"
                            disabled={rateLoading}
                            className={BUTTON.default}
                        >
                            Отправить оценку
                        </button>
                    </form>
                )}

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
