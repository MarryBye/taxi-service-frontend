import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";

import { TEXT } from "@/styles/Text";
import { LINK } from "@/styles/Link";
import { BUTTON } from "@/styles/Button";

import { useCreateUser } from "@/hooks/admin/useUsers";
import type { CreateUser } from "@/types/users";

export default function AdminUserCreatePage(): React.ReactElement {
    const navigate = useNavigate();
    const { mutate: createUser, loading, error } = useCreateUser();

    const [form, setForm] = useState<CreateUser>({
        login: "",
        password: "",
        email: "",
        tel_number: "",
        first_name: "",
        last_name: "",
        country: "Ukraine",
        city: "Kyiv",
        role: "client",
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
        await createUser(form);
        navigate("/admin/users");
    }

    return (
        <AdminLayout>
            <section className="max-w-xl flex flex-col gap-8">
                {/* ===== HEADER ===== */}
                <div>
                    <h1 className={`${TEXT.title} text-3xl mb-2`}>
                        Создание пользователя
                    </h1>
                    <p className={TEXT.accent_1}>
                        Добавление нового пользователя в систему
                    </p>
                </div>

                {/* ===== FORM ===== */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5 bg-white border border-gray-200 rounded p-6"
                >
                    <input
                        name="login"
                        placeholder="Логин"
                        value={form.login}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded px-4 py-2"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded px-4 py-2"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded px-4 py-2"
                    />

                    <input
                        name="tel_number"
                        placeholder="Телефон"
                        value={form.tel_number}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded px-4 py-2"
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

                    <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-4 py-2"
                    >
                        <option value="client">Клиент</option>
                        <option value="driver">Водитель</option>
                        <option value="admin">Администратор</option>
                    </select>

                    {error && (
                        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded">
                            Ошибка при создании пользователя
                        </div>
                    )}

                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            className={BUTTON.default}
                            disabled={loading}
                        >
                            Создать
                        </button>

                        <Link
                            to="/admin/users"
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
