import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";

import { TEXT } from "@/styles/Text";
import { BUTTON } from "@/styles/Button";

import { useCreateCar } from "@/hooks/admin/useCars";
import type { CreateCar } from "@/types/cars";

export default function AdminCarCreatePage(): React.ReactElement {
    const navigate = useNavigate();
    const { mutate: createCar, loading, error } = useCreateCar();

    const [form, setForm] = useState<CreateCar>({
        mark: "",
        model: "",
        car_number: "",
        country: "Ukraine",
        city: "Kyiv",
        color: "",
        car_class: "standard",
        car_status: "available",
        driver_id: undefined
    });

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]:
                name === "driver_id"
                    ? value === ""
                        ? undefined
                        : Number(value)
                    : value,
        }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        await createCar(form);
        navigate("/admin/cars");
    }

    return (
        <AdminLayout>
            <section className="max-w-2xl flex flex-col gap-8">
                {/* ===== HEADER ===== */}
                <div>
                    <h1 className={`${TEXT.title} text-3xl mb-2`}>
                        Добавить автомобиль
                    </h1>
                    <p className={TEXT.accent_1}>
                        Создание нового автомобиля в системе
                    </p>
                </div>

                {/* ===== FORM ===== */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5 bg-white border border-gray-200 rounded p-6"
                >
                    <input
                        name="mark"
                        placeholder="Марка"
                        value={form.mark}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded px-4 py-2"
                    />

                    <input
                        name="model"
                        placeholder="Модель"
                        value={form.model}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded px-4 py-2"
                    />

                    <input
                        name="car_number"
                        placeholder="Номер автомобиля"
                        value={form.car_number}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded px-4 py-2"
                    />

                    <input
                        name="color"
                        placeholder="Цвет"
                        value={form.color}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded px-4 py-2"
                    />

                    <div className="flex gap-4">
                        <select
                            name="country"
                            value={form.country}
                            onChange={handleChange}
                            className="w-1/2 border border-gray-300 rounded px-4 py-2"
                        >
                            <option value="Ukraine">Ukraine</option>
                        </select>

                        <select
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                            className="w-1/2 border border-gray-300 rounded px-4 py-2"
                        >
                            <option value="Kyiv">Kyiv</option>
                            <option value="Lviv">Lviv</option>
                            <option value="Odessa">Odessa</option>
                            <option value="Dnipro">Dnipro</option>
                            <option value="Kharkiv">Kharkiv</option>
                        </select>
                    </div>

                    <div className="flex gap-4">
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
                            <option value="on_maintenance">On maintenance</option>
                            <option value="not_working">Not working</option>
                        </select>
                    </div>

                    <input
                        name="driver_id"
                        placeholder="ID водителя (необязательно)"
                        value={form.driver_id ?? ""}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-4 py-2"
                    />

                    {error && (
                        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded">
                            Ошибка при создании автомобиля
                        </div>
                    )}

                    <div className="flex gap-4 pt-2">
                        <button
                            type="submit"
                            className={BUTTON.default}
                            disabled={loading}
                        >
                            Создать
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/admin/cars")}
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
