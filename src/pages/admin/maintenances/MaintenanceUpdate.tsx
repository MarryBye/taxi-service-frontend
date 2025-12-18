import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";

import { TEXT } from "@/styles/Text";
import { LINK } from "@/styles/Link";
import { BUTTON } from "@/styles/Button";

import { useUpdateMaintenance } from "@/hooks/admin/useMaintenances";

export default function AdminMaintenanceUpdatePage(): React.ReactElement {
    const { maintenanceId } = useParams<{ maintenanceId: string }>();
    const navigate = useNavigate();

    const { mutate: updateMaintenance, loading, error } =
        useUpdateMaintenance(maintenanceId);

    const [form, setForm] = useState({
        description: "",
        cost: "",
        status: "diagnosis",
        maintenance_start: "",
        maintenance_end: "",
    });

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        await updateMaintenance({
            description: form.description,
            cost: Number(form.cost),
            status: form.status,
            maintenance_start: form.maintenance_start || null,
            maintenance_end: form.maintenance_end || null,
        });

        navigate(`/admin/maintenances/${maintenanceId}`);
    }

    return (
        <AdminLayout>
            <section className="max-w-xl flex flex-col gap-8">
                <div>
                    <h1 className={`${TEXT.title} text-3xl mb-2`}>
                        Редактирование обслуживания
                    </h1>
                    <p className={TEXT.accent_1}>
                        Обновление данных по ремонту или ТО
                    </p>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded">
                        Ошибка обновления обслуживания
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5 bg-white border border-gray-200 rounded p-6"
                >
                    <div>
                        <label className={TEXT.accent_2}>
                            Описание
                        </label>
                        <input
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-4 py-2"
                        />
                    </div>

                    <div>
                        <label className={TEXT.accent_2}>
                            Стоимость (грн)
                        </label>
                        <input
                            type="number"
                            name="cost"
                            value={form.cost}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-4 py-2"
                        />
                    </div>

                    <div>
                        <label className={TEXT.accent_2}>
                            Статус
                        </label>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-4 py-2"
                        >
                            <option value="diagnosis">diagnosis</option>
                            <option value="in_progress">in_progress</option>
                            <option value="completed">completed</option>
                        </select>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className={TEXT.accent_2}>
                                Начало
                            </label>
                            <input
                                type="date"
                                name="maintenance_start"
                                value={form.maintenance_start}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-4 py-2"
                            />
                        </div>

                        <div className="w-1/2">
                            <label className={TEXT.accent_2}>
                                Завершение
                            </label>
                            <input
                                type="date"
                                name="maintenance_end"
                                value={form.maintenance_end}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-4 py-2"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className={BUTTON.default}
                        >
                            Сохранить
                        </button>

                        <Link
                            to={`/admin/maintenances/${maintenanceId}`}
                            className={BUTTON.transparent}
                        >
                            Отмена
                        </Link>
                    </div>
                </form>
            </section>
        </AdminLayout>
    );
}
