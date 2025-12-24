import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";

import { TEXT } from "@/styles/Text";
import { BUTTON } from "@/styles/Button";

import {
    useUserInfo,
    useUpdateUser,
} from "@/hooks/useAdmin";

import type { UpdateUserSchema } from "@/types/admin";
import type { UsersView } from "@/types/views";

export default function AdminUserUpdatePage(): React.ReactElement {
    const navigate = useNavigate();
    const { userId } = useParams<{ userId: string }>();
    const id = userId ? Number(userId) : null;

    const {
        data: user,
        loading,
        error,
    } = useUserInfo(id);

    const {
        mutate: updateUser,
        loading: updateLoading,
        error: updateError,
    } = useUpdateUser(id!);

    const [form, setForm] = useState<UpdateUserSchema>({
        first_name: null,
        last_name: null,
        email: null,
        tel_number: null,
        city_id: null,
        role: null,
        password: null,
    });

    /* ===== заполнение формы ===== */
    useEffect(() => {
        if (!user) return;

        const u = user as UsersView;

        setForm({
            first_name: u.first_name,
            last_name: u.last_name,
            email: u.email,
            tel_number: u.tel_number,
            city_id: u.city.id,
            role: u.role,
            password: null,
        });
    }, [user]);

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

        await updateUser(form);
        navigate(`/admin/users/${id}`);
    }

    if (loading) {
        return (
            <AdminLayout>
                <p className={TEXT.accent_1}>Загрузка пользователя…</p>
            </AdminLayout>
        );
    }

    if (error || !user) {
        return (
            <AdminLayout>
                <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded">
                    Пользователь не найден
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <section className="max-w-xl mx-auto px-8 py-16 flex flex-col gap-8">
                {/* HEADER */}
                <div>
                    <h1 className={`${TEXT.title} text-3xl mb-2`}>
                        Редактирование пользователя
                    </h1>
                    <p className={TEXT.accent_1}>
                        Пользователь #{user.id}
                    </p>
                </div>

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5 bg-white border border-gray-200 rounded p-6"
                >
                    <input
                        name="first_name"
                        value={form.first_name ?? ""}
                        onChange={handleChange}
                        placeholder="Имя"
                        className="border rounded px-4 py-2"
                    />

                    <input
                        name="last_name"
                        value={form.last_name ?? ""}
                        onChange={handleChange}
                        placeholder="Фамилия"
                        className="border rounded px-4 py-2"
                    />

                    <input
                        type="email"
                        name="email"
                        value={form.email ?? ""}
                        onChange={handleChange}
                        placeholder="Email"
                        className="border rounded px-4 py-2"
                    />

                    <input
                        name="tel_number"
                        value={form.tel_number ?? ""}
                        onChange={handleChange}
                        placeholder="Телефон"
                        className="border rounded px-4 py-2"
                    />

                    <select
                        name="city_id"
                        value={form.city_id ?? ""}
                        onChange={handleChange}
                        className="border rounded px-4 py-2"
                    >
                        <option value="">— Город —</option>
                        <option value={1}>Kyiv</option>
                        <option value={2}>Lviv</option>
                        <option value={3}>Odessa</option>
                        <option value={4}>Dnipro</option>
                        <option value={5}>Kharkiv</option>
                    </select>

                    <select
                        name="role"
                        value={form.role ?? ""}
                        onChange={handleChange}
                        className="border rounded px-4 py-2"
                    >
                        <option value="">— Роль —</option>
                        <option value="client">Клиент</option>
                        <option value="driver">Водитель</option>
                        <option value="admin">Администратор</option>
                    </select>

                    <input
                        type="password"
                        name="password"
                        value={form.password ?? ""}
                        onChange={handleChange}
                        placeholder="Новый пароль (необязательно)"
                        className="border rounded px-4 py-2"
                    />

                    {updateError && (
                        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded">
                            Ошибка при обновлении пользователя
                        </div>
                    )}

                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={updateLoading}
                            className={BUTTON.default}
                        >
                            Сохранить
                        </button>

                        <Link
                            to={`/admin/users/${id}`}
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
