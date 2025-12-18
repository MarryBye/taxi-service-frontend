import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";

import { TEXT } from "@/styles/Text";
import { BUTTON } from "@/styles/Button";

import { useCreateOrder } from "@/hooks/admin/useOrders";

export default function AdminOrderCreatePage(): React.ReactElement {
    const navigate = useNavigate();
    const { mutate: createOrder, loading, error } = useCreateOrder();

    const [form, setForm] = useState({
        order_class: "standard",
        payment_method: "cash",
        amount: 0,
        country_name: "Ukraine",
        city_name: "Kyiv",
        street_name: "",
        house_number: "",
        latitude: 0,
        longitude: 0,
    });

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        createOrder({
            order_class: form.order_class,
            payment_method: form.payment_method,
            amount: Number(form.amount),
            addresses: [
                {
                    country_name: form.country_name,
                    city_name: form.city_name,
                    street_name: form.street_name,
                    house_number: form.house_number,
                    latitude: Number(form.latitude),
                    longitude: Number(form.longitude),
                },
            ],
        });

        navigate("/admin/orders");
    }

    return (
        <AdminLayout>
            <section className="max-w-xl flex flex-col gap-8">
                <h1 className={`${TEXT.title} text-3xl`}>
                    Создание заказа
                </h1>

                {error && (
                    <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded">
                        Ошибка создания заказа
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                >
                    <select
                        name="order_class"
                        value={form.order_class}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-4 py-2"
                    >
                        <option value="standard">Standard</option>
                        <option value="comfort">Comfort</option>
                        <option value="business">Business</option>
                    </select>

                    <select
                        name="payment_method"
                        value={form.payment_method}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-4 py-2"
                    >
                        <option value="cash">Cash</option>
                        <option value="credit_card">Credit card</option>
                    </select>

                    <input
                        type="number"
                        name="amount"
                        placeholder="Сумма"
                        value={form.amount}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-4 py-2"
                    />

                    <input
                        name="street_name"
                        placeholder="Улица"
                        value={form.street_name}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-4 py-2"
                    />

                    <input
                        name="house_number"
                        placeholder="Дом"
                        value={form.house_number}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-4 py-2"
                    />

                    <div className="flex gap-2">
                        <input
                            type="number"
                            name="latitude"
                            placeholder="Latitude"
                            value={form.latitude}
                            onChange={handleChange}
                            className="w-1/2 border border-gray-300 rounded px-4 py-2"
                        />

                        <input
                            type="number"
                            name="longitude"
                            placeholder="Longitude"
                            value={form.longitude}
                            onChange={handleChange}
                            className="w-1/2 border border-gray-300 rounded px-4 py-2"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={BUTTON.default}
                    >
                        Создать заказ
                    </button>
                </form>
            </section>
        </AdminLayout>
    );
}
