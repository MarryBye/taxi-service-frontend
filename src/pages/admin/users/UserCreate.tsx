import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";

import { TEXT } from "@/styles/Text";
import { BUTTON } from "@/styles/Button";

import { useCreateUser } from "@/hooks/useAdmin";
import type { CreateUserSchema } from "@/types/admin";

export default function AdminUserCreatePage(): React.ReactElement {
    const navigate = useNavigate();
    const { mutate: createUser, loading, error } = useCreateUser();

    const [form, setForm] = useState<CreateUserSchema>({
        login: "",
        password: "",
        email: "",
        tel_number: "",
        first_name: "",
        last_name: "",
        city_id: 1, // временно, пока нет селектора городов
        role: "client",
    });

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]:
                name === "city_id"
                    ? Number(value)
                    : value,
        }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await createUser(form);
        navigate("/admin/users");
    }

    return (
        <AdminLayout>
            <section className="max-w-xl mx-auto px-8 py-16 flex flex-col gap-8">
                {/* HEADER */}
                <div>
                    <h1 className={`${TEXT.title} text-3xl mb-2`}>
                        Создание пользователя
                    </h1>
                    <p className={TEXT.accent_1}>
                        Добавление нового пользователя в систему
                    </p>
                </div>

                {/* FORM */}
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

                    {/* CITY */}
                    <select
                        name="city_id"
                        value={form.city_id}
                        onChange={handleChange}
                        className="border border-gray-300 rounded px-4 py-2"
                    >
                        <option value={1}>Kyiv</option>
                        <option value={2}>Lviv</option>
                        <option value={3}>Odessa</option>
                        <option value={4}>Dnipro</option>
                        <option value={5}>Kharkiv</option>
                    </select>

                    {/* ROLE */}
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
