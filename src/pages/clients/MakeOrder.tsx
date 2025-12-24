import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { DefaultLayout } from "@/components/layout/DefaultLayout";

import { TEXT } from "@/styles/Text";
import { BUTTON } from "@/styles/Button";

import type { CarClasses, PaymentMethods } from "@/types/enums/db";
import type { Address } from "@/types/common";

import { useMakeOrder, useProfile } from "@/hooks/useClients";
import {data} from "autoprefixer";

export default function MakeOrderPage(): React.ReactElement {
    const navigate = useNavigate();
    const { mutate: makeOrder, loading, error } = useMakeOrder();
    const { data: profile, loading: profileLoading, error: profileError } = useProfile();

    const [orderClass, setOrderClass] = useState<CarClasses>("standard");
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethods>("cash");
    const [addresses, setAddresses] = useState<Address[]>([]);

    if (profileLoading || profileError) return <div>Loading...</div>;
    if (!profile) return <div>No profile</div>;

    const updateAddress = (
        index: number,
        field: keyof Address,
        value: string
    ) => {
        const next = [...addresses];
        // @ts-ignore
        next[index] = { ...next[index], [field]: value };
        setAddresses(next);
    };

    const addAddress = () => {
        setAddresses([...addresses, emptyAddress(profile.city.country.full_name, profile.city.name)]);
    };

    const removeAddress = (index: number) => {
        setAddresses(addresses.filter((_, i) => i !== index));
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const res = await makeOrder({
            order_class: orderClass,
            payment_method: paymentMethod,
            addresses,
        });

        if (res) {
            navigate("/orders/history");
        }
    }

    return (
        <DefaultLayout>
            <section className="max-w-3xl mx-auto px-8 py-16">
                <h1 className={`${TEXT.title} text-3xl mb-8`}>
                    Создание заказа
                </h1>

                <h3 className="mb-4">
                    Регион: {profile.city.country.full_name}, {profile.city.name}
                </h3>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* CAR CLASS */}
                    <Select
                        label="Класс автомобиля"
                        value={orderClass}
                        onChange={setOrderClass}
                        options={[
                            ["standard", "Standard"],
                            ["comfort", "Comfort"],
                            ["business", "Business"],
                        ]}
                    />

                    {/* PAYMENT */}
                    <Select
                        label="Способ оплаты"
                        value={paymentMethod}
                        onChange={setPaymentMethod}
                        options={[
                            ["cash", "Наличные"],
                            ["credit_card", "Карта"],
                        ]}
                    />

                    {/* ADDRESSES */}
                    <div>
                        <p className={`${TEXT.default} mb-4`}>
                            Адреса маршрута
                        </p>

                        <div className="flex flex-col gap-4">
                            {addresses.map((a, i) => (
                                <div
                                    key={i}
                                    className="border rounded p-4 flex flex-col gap-3"
                                >
                                    <div className="flex gap-2">
                                        <input
                                            placeholder="Улица"
                                            value={a.street}
                                            onChange={(e) =>
                                                updateAddress(i, "street", e.target.value)
                                            }
                                            className="w-2/3 border rounded px-4 py-2"
                                        />
                                        <input
                                            placeholder="Дом"
                                            value={a.house}
                                            onChange={(e) =>
                                                updateAddress(i, "house", e.target.value)
                                            }
                                            className="w-1/3 border rounded px-4 py-2"
                                        />
                                    </div>

                                    {addresses.length > 2 && (
                                        <button
                                            type="button"
                                            onClick={() => removeAddress(i)}
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

                    {error && (
                        <p className={TEXT.accent_1}>
                            {error.message}
                        </p>
                    )}

                    <button
                        type="submit"
                        className={BUTTON.default}
                        disabled={loading}
                    >
                        {loading ? "Создание..." : "Оформить заказ"}
                    </button>
                </form>
            </section>
        </DefaultLayout>
    );
}

/* =========================
   HELPERS
========================= */

function emptyAddress(country: string, city: string): Address {
    return {
        country: country,
        city: city,
        street: "",
        house: "",
    };
}

function Select<T extends string>({
                                      label,
                                      value,
                                      onChange,
                                      options,
                                  }: {
    label: string;
    value: T;
    onChange: (v: T) => void;
    options: [T, string][];
}) {
    return (
        <div>
            <label className={`${TEXT.default} block mb-2`}>
                {label}
            </label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value as T)}
                className="w-full border rounded px-4 py-2"
            >
                {options.map(([v, l]) => (
                    <option key={v} value={v}>
                        {l}
                    </option>
                ))}
            </select>
        </div>
    );
}
