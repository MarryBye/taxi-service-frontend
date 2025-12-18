import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { DefaultLayout } from "@/components/layout/DefaultLayout";

import { TEXT } from "@/styles/Text";
import { BUTTON } from "@/styles/Button";

import type {
    CarClass,
    PaymentMethod,
} from "@/types/db";

import type { Address } from "@/types/common";
import type { CreateOrder } from "@/types/orders";

import { useMakeOrder } from "@/hooks/useClients";

export default function MakeOrderPage(): React.ReactElement {
    const navigate = useNavigate();
    const { mutate, loading, error } = useMakeOrder();
    const [form, setForm] = useState<CreateOrder>({
        order_class: "standard",
        payment_method: "cash",
        amount: 0,
        addresses: [
            {
                country_name: "Ukraine",
                city_name: "Kyiv",
                street_name: "",
                house_number: "",
                latitude: 0,
                longitude: 0,
            },
            {
                country_name: "Ukraine",
                city_name: "Kyiv",
                street_name: "",
                house_number: "",
                latitude: 0,
                longitude: 0,
            },
        ],
    });

    function updateAddress(
        index: number,
        field: keyof Address,
        value: string | number
    ) {
        const updated = [...form.addresses];
        // @ts-ignore
        updated[index] = {
            ...updated[index],
            [field]: value,
        };

        setForm({
            ...form,
            addresses: updated,
        });
    }

    function addAddress() {
        setForm({
            ...form,
            addresses: [
                ...form.addresses,
                {
                    country_name: "Ukraine",
                    city_name: "Kyiv",
                    street_name: "",
                    house_number: "",
                    latitude: 0,
                    longitude: 0,
                },
            ],
        });
    }

    function removeAddress(index: number) {
        setForm({
            ...form,
            addresses: form.addresses.filter((_, i) => i !== index),
        });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await mutate(form)
        navigate('/orders/history')
    }

    return (
        <DefaultLayout>
            <section className="max-w-3xl mx-auto px-8 py-16">
                <h1 className={`${TEXT.title} text-3xl mb-8`}>
                    Создание заказа
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                >
                    <div>
                        <label className={`${TEXT.default} block mb-2`}>
                            Класс автомобиля
                        </label>
                        <select
                            value={form.order_class}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    order_class: e.target.value as CarClass,
                                })
                            }
                            className="w-full border border-gray-300 rounded px-4 py-2"
                        >
                            <option value="standard">Standard</option>
                            <option value="comfort">Comfort</option>
                            <option value="business">Business</option>
                        </select>
                    </div>

                    <div>
                        <label className={`${TEXT.default} block mb-2`}>
                            Способ оплаты
                        </label>
                        <select
                            value={form.payment_method}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    payment_method: e.target.value as PaymentMethod,
                                })
                            }
                            className="w-full border border-gray-300 rounded px-4 py-2"
                        >
                            <option value="cash">Наличные</option>
                            <option value="credit_card">Карта</option>
                        </select>
                    </div>

                    <div>
                        <label className={`${TEXT.default} block mb-2`}>
                            Сумма
                        </label>
                        <input
                            type="number"
                            min={0}
                            value={form.amount}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    amount: Number(e.target.value),
                                })
                            }
                            className="w-full border border-gray-300 rounded px-4 py-2"
                        />
                    </div>

                    <div>
                        <label className={`${TEXT.default} block mb-4`}>
                            Адреса маршрута
                        </label>

                        <div className="flex flex-col gap-4">
                            {form.addresses.map((address, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-200 rounded p-4 flex flex-col gap-3"
                                >
                                    <div className="flex gap-2">
                                        <input
                                            placeholder="Улица"
                                            value={address.street_name}
                                            onChange={(e) =>
                                                updateAddress(
                                                    index,
                                                    "street_name",
                                                    e.target.value
                                                )
                                            }
                                            className="w-2/3 border border-gray-300 rounded px-4 py-2"
                                        />

                                        <input
                                            placeholder="Дом"
                                            value={address.house_number}
                                            onChange={(e) =>
                                                updateAddress(
                                                    index,
                                                    "house_number",
                                                    e.target.value
                                                )
                                            }
                                            className="w-1/3 border border-gray-300 rounded px-4 py-2"
                                        />
                                    </div>

                                    {form.addresses.length > 2 && (
                                        <button
                                            type="button"
                                            onClick={() => removeAddress(index)}
                                            className={BUTTON.transparent}
                                        >
                                            Удалить адрес
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={addAddress}
                            className={`${BUTTON.transparent} mt-4`}
                        >
                            Добавить адрес
                        </button>
                    </div>

                    { error ? <p className={TEXT.accent_1}>{error.message}</p> : null }

                    <button type="submit" className={BUTTON.default}>
                        Оформить заказ
                    </button>
                </form>
            </section>
        </DefaultLayout>
    );
}
