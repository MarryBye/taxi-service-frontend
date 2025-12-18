import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { DefaultLayout } from "@/components/layout/DefaultLayout";

import { TEXT } from "@/styles/Text";
import { BUTTON } from "@/styles/Button";

import { useClientUpdateProfile } from "@/hooks/useClients";
import type { UpdateProfile } from "@/types/clients";

export default function UpdateProfile(): React.ReactElement {
    const navigate = useNavigate();
    const { mutate, loading, error } = useClientUpdateProfile();

    const [form, setForm] = useState<UpdateProfile>({
        email: "",
        first_name: "",
        last_name: "",
        tel_number: "",
        country_name: "Ukraine",
        city_name: "Odessa",
        password: "",
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
        await mutate(form);
        navigate("/profile");
    }

    return (
        <DefaultLayout>
            <section className="max-w-lg mx-auto px-8 py-20">
                <h1 className={`${TEXT.title} text-3xl mb-6`}>
                    Редактирование профиля
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                >
                    <input
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-4 py-2"
                    />

                    <input
                        name="tel_number"
                        placeholder="Номер телефона"
                        value={form.tel_number}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-4 py-2"
                    />

                    <div className="flex gap-2">
                        <input
                            name="first_name"
                            placeholder="Имя"
                            value={form.first_name}
                            onChange={handleChange}
                            className="w-1/2 border border-gray-300 rounded px-4 py-2"
                        />
                        <input
                            name="last_name"
                            placeholder="Фамилия"
                            value={form.last_name}
                            onChange={handleChange}
                            className="w-1/2 border border-gray-300 rounded px-4 py-2"
                        />
                    </div>

                    <div className="flex gap-2">
                        <select
                            name="country_name"
                            value={form.country_name}
                            onChange={handleChange}
                            className="w-1/2 border border-gray-300 rounded px-4 py-2"
                        >
                            <option value="Ukraine">Ukraine</option>
                        </select>

                        <select
                            name="city_name"
                            value={form.city_name}
                            onChange={handleChange}
                            className="w-1/2 border border-gray-300 rounded px-4 py-2"
                        >
                            <option value="Kyiv">Kyiv</option>
                            <option value="Odessa">Odessa</option>
                            <option value="Lviv">Lviv</option>
                        </select>
                    </div>

                    <input
                        type="password"
                        name="password"
                        placeholder="Новый пароль"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-4 py-2"
                    />

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
                            className={BUTTON.transparent}
                            onClick={() => navigate("/profile")}
                        >
                            Отмена
                        </button>
                    </div>
                </form>
            </section>
        </DefaultLayout>
    );
}
