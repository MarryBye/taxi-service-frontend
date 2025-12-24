import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { DefaultLayout } from "@/components/layout/DefaultLayout";

import { TEXT } from "@/styles/Text";
import { LINK } from "@/styles/Link";
import { BUTTON } from "@/styles/Button";

import { useAuth } from "@/hooks/useAuth";
import { useCountriesList, useCitiesList } from "@/hooks/usePublic";

import type { RegisterSchema } from "@/types/auth";

export default function RegisterPage(): React.ReactElement {
    const navigate = useNavigate();
    const { register, registerLoading, registerError } = useAuth();

    const { data: countries } = useCountriesList();

    const [selectedCountryId, setSelectedCountryId] = useState<number | null>(null);

    const { data: cities } = useCitiesList(
        selectedCountryId ?? 0
    );

    const [form, setForm] = useState<RegisterSchema>({
        login: "",
        password: "",
        first_name: "",
        last_name: "",
        email: "",
        tel_number: "",
        city_id: 0,
    });

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        const { name, value } = e.target;

        if (name === "country") {
            setSelectedCountryId(Number(value));
            setForm({ ...form, city_id: 0 });
            return;
        }

        if (name === "city_id") {
            setForm({ ...form, city_id: Number(value) });
            return;
        }

        setForm({
            ...form,
            [name]: value,
        });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const res = await register(form);
        if (res) {
            navigate("/login");
        }
    }

    return (
        <DefaultLayout>
            <section className="max-w-lg mx-auto px-8 py-20">
                <h1 className={`${TEXT.title} text-3xl mb-6`}>
                    Регистрация
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                >
                    <input
                        name="login"
                        placeholder="Логин"
                        value={form.login}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-4 py-2"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-4 py-2"
                    />

                    <input
                        name="tel_number"
                        placeholder="Номер телефона"
                        value={form.tel_number}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-4 py-2"
                    />

                    <div className="flex gap-2">
                        <input
                            name="first_name"
                            placeholder="Имя"
                            value={form.first_name}
                            onChange={handleChange}
                            required
                            className="w-1/2 border border-gray-300 rounded px-4 py-2"
                        />
                        <input
                            name="last_name"
                            placeholder="Фамилия"
                            value={form.last_name}
                            onChange={handleChange}
                            required
                            className="w-1/2 border border-gray-300 rounded px-4 py-2"
                        />
                    </div>

                    <div className="flex gap-2">
                        <select
                            name="country"
                            value={selectedCountryId ?? ""}
                            onChange={handleChange}
                            required
                            className="w-1/2 border border-gray-300 rounded px-4 py-2"
                        >
                            <option value="">Страна</option>
                            {countries?.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.full_name}
                                </option>
                            ))}
                        </select>

                        <select
                            name="city_id"
                            value={form.city_id || ""}
                            onChange={handleChange}
                            required
                            disabled={!cities}
                            className="w-1/2 border border-gray-300 rounded px-4 py-2"
                        >
                            <option value="">Город</option>
                            {cities?.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <input
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-4 py-2"
                    />

                    {registerError && (
                        <p className="text-red-600 text-sm">
                            Ошибка регистрации. Проверьте данные.
                        </p>
                    )}

                    <button
                        type="submit"
                        className={BUTTON.default}
                        disabled={registerLoading}
                    >
                        {registerLoading
                            ? "Регистрация..."
                            : "Зарегистрироваться"}
                    </button>
                </form>

                <div className="mt-6">
                    <p className={TEXT.accent_1}>
                        Уже есть аккаунт?{" "}
                        <Link to="/login" className={LINK.default}>
                            Войти
                        </Link>
                    </p>
                </div>
            </section>
        </DefaultLayout>
    );
}
