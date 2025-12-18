import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";

import { TEXT } from "@/styles/Text";
import { BUTTON } from "@/styles/Button";

import { useCreateMaintenance } from "@/hooks/admin/useMaintenances";
import type { CreateMaintenance } from "@/types/maintenances";

export default function AdminMaintenanceCreatePage(): React.ReactElement {
    const navigate = useNavigate();
    const { mutate: createMaintenance, loading, error } = useCreateMaintenance();

    const [form, setForm] = useState<CreateMaintenance>({
        car_id: 0,
        description: "",
        cost: 0,
        status: "diagnosis",
    });

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]:
                name === "cost" || name === "car_id"
                    ? Number(value)
                    : value,
        });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await createMaintenance(form);
        navigate("/admin/maintenances");
    }

    return (
        <AdminLayout>
            <section className="max-w-xl flex flex-col gap-6">
                <h1 className={`${TEXT.title} text-3xl`}>
                    Добавить обслуживание
                </h1>

                {error && (
                    <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded">
                        Ошибка при создании обслуживания
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
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
