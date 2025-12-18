import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";

import { TEXT } from "@/styles/Text";
import { BUTTON } from "@/styles/Button";

import { useUpdateCar } from "@/hooks/admin/useCars";
import type { UpdateCar } from "@/types/cars";

export default function AdminCarUpdatePage(): React.ReactElement {
    const navigate = useNavigate();
    const { carId } = useParams<{ carId: string }>();
    const id = carId ? Number(carId) : null;

    const { mutate: updateCar, loading, error } = useUpdateCar(id);

    const [form, setForm] = useState<UpdateCar>({
        mark: "",
        model: "",
        car_number: "",
        country: "Ukraine",
        city: "Kyiv",
        color: "",
        car_class: "standard",
        car_status: "available",
        driver_id: undefined,
    });

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]:
                name === "driver_id"
                    ? value === ""
                        ? undefined
                        : Number(value)
                    : value,
        });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!id) return;
        await updateCar(form);
        navigate("/admin/cars");
    }

    return (
        <AdminLayout>
            <section className="max-w-xl flex flex-col gap-8">
                <h1 className={`${TEXT.title} text-3xl`}>
                    Редактировать автомобиль
                </h1>

                {error && (
                    <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded">
                        Ошибка обновления автомобиля
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                >
                    <input
                        name="mark"
                        placeholder="Марка"
                        value={form.mark}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-4 py-2"
                    />

                    <input
                        name="model"
                        placeholder="Модель"
                        value={form.model}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-4 py-2"
                    />

                    <input
                        name="car_number"
                        placeholder="Номер авто"
                        value={form.car_number}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-4 py-2"
                    />

                    <input
                        name="color"
                        placeholder="Цвет"
                        value={form.color}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-4 py-2"
                    />

                    <div className="flex gap-2">
                        <select
                            name="car_class"
                            value={form.car_class}
                            onChange={handleChange}
                            className="w-1/2 border border-gray-300 rounded px-4 py-2"
                        >
                            <option value="standard">Standard</option>
                            <option value="comfort">Comfort</option>
                            <option value="business">Business</option>
                        </select>

                        <select
                            name="car_status"
                            value={form.car_status}
                            onChange={handleChange}
                            className="w-1/2 border border-gray-300 rounded px-4 py-2"
                        >
                            <option value="available">Available</option>
                            <option value="busy">Busy</option>
                            <option value="on_maintenance">
                                On maintenance
                            </option>
                            <option value="not_working">Not working</option>
                        </select>
                    </div>

                    <input
                        name="driver_id"
                        placeholder="ID водителя"
                        value={form.driver_id ?? ""}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-4 py-2"
                    />

                    <button
                        type="submit"
                        className={BUTTON.default}
                        disabled={loading}
                    >
                        Сохранить
                    </button>
                </form>
            </section>
        </AdminLayout>
    );
}
