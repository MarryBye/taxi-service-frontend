import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";

import { TEXT } from "@/styles/Text";
import { BUTTON } from "@/styles/Button";

import { useUpdateOrder } from "@/hooks/admin/useOrders";
import type { OrderStatus } from "@/types/db";

export default function AdminOrderUpdatePage(): React.ReactElement {
    const navigate = useNavigate();
    const { orderId } = useParams<{ orderId: string }>();
    const id = orderId ? Number(orderId) : null;

    const { mutate: updateOrder, loading, error } = useUpdateOrder(orderId);

    const [form, setForm] = useState<{
        status: OrderStatus;
    }>({
        status: "searching_for_driver",
    });

    function handleChange(
        e: React.ChangeEvent<HTMLSelectElement>
    ) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!id) return;

        await updateOrder({
            status: form.status,
        });

        navigate(`/admin/orders/${id}`);
    }

    return (
        <AdminLayout>
            <section className="max-w-xl flex flex-col gap-8">
                <div>
                    <h1 className={`${TEXT.title} text-3xl mb-2`}>
                        Редактирование заказа
                    </h1>
                    <p className={TEXT.accent_1}>
                        Изменение статуса заказа
                    </p>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded">
                        Ошибка при обновлении заказа
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6 bg-white border border-gray-200 rounded p-6"
                >
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
                            <option value="searching_for_driver">
                                searching_for_driver
                            </option>
                            <option value="waiting_for_driver">
                                waiting_for_driver
                            </option>
                            <option value="waiting_for_client">
                                waiting_for_client
                            </option>
                            <option value="in_progress">
                                in_progress
                            </option>
                            <option value="waiting_for_marks">
                                waiting_for_marks
                            </option>
                            <option value="completed">
                                completed
                            </option>
                            <option value="canceled">
                                canceled
                            </option>
                        </select>
                    </div>

                    <div className="flex gap-4">
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
