import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";

import { TEXT } from "@/styles/Text";
import { BUTTON } from "@/styles/Button";

import { useUpdateOrder } from "@/hooks/useAdmin";
import type { UpdateOrderSchema } from "@/types/admin";
import type { OrderStatuses, CarClasses } from "@/types/enums/db";

export default function AdminOrderUpdatePage(): React.ReactElement {
    const navigate = useNavigate();
    const { orderId } = useParams<{ orderId: string }>();
    const id = orderId ? Number(orderId) : null;

    if (!id) {
        return (
            <AdminLayout>
                <p className={TEXT.accent_1}>Некорректный ID заказа</p>
            </AdminLayout>
        );
    }

    const { mutate: updateOrder, loading, error } = useUpdateOrder(id);

    const [form, setForm] = useState<UpdateOrderSchema>({
        status: "searching_for_driver",
        order_class: "standard",
    });

    function handleChange(
        e: React.ChangeEvent<HTMLSelectElement>
    ) {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        await updateOrder(form);
        navigate(`/admin/orders/${id}`);
    }

    return (
        <AdminLayout>
            <section className="max-w-xl mx-auto px-8 py-16 flex flex-col gap-8">
                {/* HEADER */}
                <div>
                    <h1 className={`${TEXT.title} text-3xl mb-2`}>
                        Редактирование заказа
                    </h1>
                    <p className={TEXT.accent_1}>
                        Изменение статуса и класса автомобиля
                    </p>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded">
                        Ошибка при обновлении заказа
                    </div>
                )}

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6 bg-white border border-gray-200 rounded p-6"
                >
                    {/* STATUS */}
                    <div className="flex flex-col gap-2">
                        <label className={TEXT.accent_2}>
                            Статус заказа
                        </label>

                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-4 py-2"
                        >
                            {[
                                "searching_for_driver",
                                "waiting_for_driver",
                                "waiting_for_client",
                                "in_progress",
                                "waiting_for_marks",
                                "completed",
                                "canceled",
                            ].map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* CAR CLASS */}
                    <div className="flex flex-col gap-2">
                        <label className={TEXT.accent_2}>
                            Класс автомобиля
                        </label>

                        <select
                            name="order_class"
                            value={form.order_class}
                            onChange={handleChange}
                            className="border border-gray-300 rounded px-4 py-2"
                        >
                            {["standard", "comfort", "business"].map(
                                (c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                )
                            )}
                        </select>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            className={BUTTON.default}
                            disabled={loading}
                        >
                            Сохранить
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className={BUTTON.transparent}
                        >
                            Отмена
                        </button>
                    </div>
                </form>
            </section>
        </AdminLayout>
    );
}
