import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { DriverLayout } from "@/components/layout/DriverLayout";
import { TEXT } from "@/styles/Text";
import { BUTTON } from "@/styles/Button";

import {
    useDriverOrderStat,
    useAcceptOrder,
    useDriverCancelOrder,
    useDriverRateOrder,
} from "@/hooks/useDrivers";

import type * as enums from "@/types/enums/db";
import type * as driverTypes from "@/types/workers"; // <-- ВАЖНО: схемы водителя

const DRIVER_CANCEL_TAGS: enums.DriverCancelTags[] = [
    "client_not_responding",
    "client_not_at_pickup_point",
    "vehicle_breakdown",
    "traffic_accident",
    "unsafe_pickup_location",
    "route_unreachable",
    "emergency",
    "other",
];

const DRIVER_RATE_TAGS: enums.DriverTags[] = [
    "accurate",
    "fast",
    "friendly",
    "clean",
    "modern_car",
    "polite",
    "communicative",
    "helpful",
    "smooth_driving",
    "safe_driving",
    "good_navigation",
    "other",
];

export default function DriverOrderDetailPage(): React.ReactElement {
    const navigate = useNavigate();
    const { orderId } = useParams<{ orderId: string }>();

    const numericOrderId = orderId ? Number(orderId) : null;

    const orderQuery = useDriverOrderStat(numericOrderId);

    // чтобы не падать на null, используем 0, а UI ниже не покажет кнопки, если id нет
    const safeId = numericOrderId ?? 0;

    const acceptOrder = useAcceptOrder(safeId);
    const cancelOrder = useDriverCancelOrder(safeId);
    const rateOrder = useDriverRateOrder(safeId);

    const [cancelComment, setCancelComment] = useState("");
    const [cancelTags, setCancelTags] = useState<enums.DriverCancelTags[]>([]);

    const [rateMark, setRateMark] = useState(5);
    const [rateComment, setRateComment] = useState("");
    const [rateTags, setRateTags] = useState<enums.DriverTags[]>([]);

    if (orderQuery.loading) {
        return (
            <DriverLayout
                left={null}
                right={<p className="text-center py-20">Загрузка…</p>}
            />
        );
    }

    if (!orderQuery.data) {
        return (
            <DriverLayout
                left={null}
                right={
                    <p className="text-center py-20 text-gray-500">
                        Заказ недоступен
                    </p>
                }
            />
        );
    }

    const order = orderQuery.data;

    const isCanceled = !!order.cancel_info;
    const isFinished = order.duration !== null;

    // принимаем только если еще нет driver, не отменён, не завершён
    const canAccept = !isCanceled && !isFinished;
    const canCancel = !isCanceled && !isFinished;
    // водитель ставит оценку (DriverTags) — по твоим view полям это rating_by_driver
    const canRate = isFinished && !order.rating_by_driver;

    function toggle<T>(tag: T, list: T[], setList: (v: T[]) => void) {
        setList(list.includes(tag) ? list.filter((t) => t !== tag) : [...list, tag]);
    }

    async function handleAccept() {
        await acceptOrder.mutate();
        orderQuery.refetch();
    }

    async function handleCancel(e: React.FormEvent) {
        e.preventDefault();

        const payload: driverTypes.CancelOrderSchema = {
            comment: cancelComment,
            tags: cancelTags,
        };

        await cancelOrder.mutate(payload);
        navigate("/worker");
    }

    async function handleRate(e: React.FormEvent) {
        e.preventDefault();

        const payload: driverTypes.RateOrderSchema = {
            mark: rateMark,
            comment: rateComment,
            tags: rateTags,
        };

        await rateOrder.mutate(payload);
        navigate("/worker");
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

                    {canAccept && (
                        <button className={BUTTON.default} onClick={handleAccept}>
                            Принять заказ
                        </button>
                    )}

                    {canCancel && (
                        <form
                            onSubmit={handleCancel}
                            className="border rounded p-4 mt-6 flex flex-col gap-3"
                        >
                            <p className="font-medium">Отменить заказ</p>

                            <textarea
                                placeholder="Комментарий"
                                value={cancelComment}
                                onChange={(e) => setCancelComment(e.target.value)}
                                className="border rounded px-3 py-2"
                            />

                            {DRIVER_CANCEL_TAGS.map((tag) => (
                                <label key={tag} className="text-sm">
                                    <input
                                        type="checkbox"
                                        checked={cancelTags.includes(tag)}
                                        onChange={() => toggle(tag, cancelTags, setCancelTags)}
                                    />{" "}
                                    {tag}
                                </label>
                            ))}

                            <button className={BUTTON.warning}>Отменить</button>
                        </form>
                    )}

                    {canRate && (
                        <form
                            onSubmit={handleRate}
                            className="border rounded p-4 mt-6 flex flex-col gap-3"
                        >
                            <p className="font-medium">Оценить поездку</p>

                            <select
                                value={rateMark}
                                onChange={(e) => setRateMark(Number(e.target.value))}
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
                                onChange={(e) => setRateComment(e.target.value)}
                                className="border rounded px-3 py-2"
                            />

                            {DRIVER_RATE_TAGS.map((tag) => (
                                <label key={tag} className="text-sm">
                                    <input
                                        type="checkbox"
                                        checked={rateTags.includes(tag)}
                                        onChange={() => toggle(tag, rateTags, setRateTags)}
                                    />{" "}
                                    {tag}
                                </label>
                            ))}

                            <button className={BUTTON.default}>Отправить</button>
                        </form>
                    )}

                    <button
                        className={`${BUTTON.transparent} mt-8`}
                        onClick={() => navigate("/worker")}
                    >
                        Назад
                    </button>
                </section>
            }
        />
    );
}
