import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { DefaultLayout } from "@/components/layout/DefaultLayout";

import { TEXT } from "@/styles/Text";
import { BUTTON } from "@/styles/Button";

import { useUpdateProfile } from "@/hooks/useClients";
import { useCountriesList, useCitiesList } from "@/hooks/usePublic";

import type { UpdateProfile } from "@/types/authorized";

export default function UpdateProfilePage(): React.ReactElement {
    const navigate = useNavigate();
    const { mutate, loading, error } = useUpdateProfile();

    const { data: countries } = useCountriesList();

    const [selectedCountryId, setSelectedCountryId] = useState<number | null>(null);

    const { data: cities } = useCitiesList(
        selectedCountryId ?? 0
    );

    const [form, setForm] = useState<UpdateProfile>({
        email: "",
        first_name: "",
        last_name: "",
        tel_number: "",
        city_id: 0,
        password: "",
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
        const res = await mutate(form);

        if (res) {
            navigate("/profile");
        }
    }

    return (
        <DefaultLayout>
            <section className="max-w-lg mx-auto px-8 py-20">
                <h1 className={`${TEXT.title} text-3xl mb-6`}>
                    Редактирование профиля
                </h1>

                {error && (
                    <p className="text-red-500 mb-4">
                        Не удалось обновить профиль
                    </p>
                )}

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
                            name="country"
                            value={selectedCountryId ?? ""}
                            onChange={handleChange}
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
