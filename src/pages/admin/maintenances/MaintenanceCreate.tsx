import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";

import { TEXT } from "@/styles/Text";
import { BUTTON } from "@/styles/Button";

import { useMai } from "@/hooks/useAdmin";
import type { CreateMaintenanceSchema } from "@/types/admin";
import type { MaintenanceStatuses } from "@/types/enums/db";

export default function AdminMaintenanceCreatePage(): React.ReactElement {
    const navigate = useNavigate();
    const { mutate: createMaintenance, loading, error } =
        useCreateMaintenance();

    const [form, setForm] = useState<CreateMaintenanceSchema>({
        car_id: 0,
        description: "",
        cost: 0,
        status: "diagnosis",
        maintenance_start: "",
        maintenance_end: "",
    });

    function handleChange(
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]:
                name === "cost" || name === "car_id"
                    ? Number(value)
                    : value,
        }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        await createMaintenance(form);
        navigate("/admin/maintenances");
    }

    return (
        <AdminLayout>
            <section className="max-w-xl mx-auto px-8 py-16 flex flex-col gap-8">
                {/* HEADER */}
                <div>
                    <h1 className={`${TEXT.title} text-3xl`}>
                        Добавить обслуживание
                    </h1>
                    <p className={TEXT.accent_1}>
                        Регистрация технического обслуживания автомобиля
                    </p>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded">
                        Ошибка при создании обслуживания
                    </div>
                )}

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5 bg-white border border-gray-200 rounded p-6"
                >
                    <input
                        type="number"
                        name="car_id"
                        placeholder="ID автомобиля"
                        value={form.car_id}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded px-4 py-2"
                    />

                    <textarea
                        name="description"
                        placeholder="Описание обслуживания"
                        value={form.description}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded px-4 py-2 min-h-[100px]"
                    />

                    <input
                        type="number"
                        name="cost"
                        placeholder="Стоимость"
                        value={form.cost}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded px-4 py-2"
                    />

                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-4 py-2"
                    >
                        <option value="diagnosis">Диагностика</option>
                        <option value="in_progress">В процессе</option>
                        <option value="completed">Завершено</option>
                    </select>

                    <input
                        type="datetime-local"
                        name="maintenance_start"
                        value={form.maintenance_start}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded px-4 py-2"
                    />

                    <input
                        type="datetime-local"
                        name="maintenance_end"
                        value={form.maintenance_end}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded px-4 py-2"
                    />

                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className={BUTTON.default}
                        >
                            Создать
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/admin/maintenances")}
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
