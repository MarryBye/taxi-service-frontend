import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";

import { TEXT } from "@/styles/Text";
import { BUTTON } from "@/styles/Button";

import {
    useUserInfo,
    useDeleteUser,
} from "@/hooks/useAdmin";

import type { UsersView } from "@/types/views";

export default function AdminUserDetailPage(): React.ReactElement {
    const navigate = useNavigate();
    const { userId } = useParams<{ userId: string }>();
    const id = userId ? Number(userId) : null;

    const {
        data: user,
        loading,
        error,
    } = useUserInfo(id);

    const {
        mutate: deleteUser,
        loading: deleteLoading,
    } = useDeleteUser(id!);

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

    async function handleDelete() {
        if (!confirm("Удалить пользователя?")) return;

        await deleteUser();
        navigate("/admin/users");
    }

    const u: UsersView = user;

    return (
        <AdminLayout>
            <section className="max-w-3xl mx-auto px-8 py-16 flex flex-col gap-8">
                {/* HEADER */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className={`${TEXT.title} text-3xl mb-2`}>
                            Пользователь #{u.id}
                        </h1>
                        <p className={TEXT.accent_1}>
                            Детальная информация
                        </p>
                    </div>

                    <Link
                        to="/admin/users"
                        className={BUTTON.transparent}
                    >
                        ← К списку
                    </Link>
                </div>

                {/* INFO */}
                <div className="border border-gray-200 rounded bg-white p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Info label="Имя">
                        {u.first_name} {u.last_name}
                    </Info>

                    <Info label="Роль">
                        <RoleBadge role={u.role} />
                    </Info>

                    <Info label="Email">
                        {u.email}
                    </Info>

                    <Info label="Телефон">
                        {u.tel_number}
                    </Info>

                    <Info label="Локация">
                        {u.city.country.full_name}, {u.city.name}
                    </Info>

                    <Info label="Создан">
                        {new Date(u.created_at).toLocaleString()}
                    </Info>

                    <Info label="Обновлён">
                        {new Date(u.changed_at).toLocaleString()}
                    </Info>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-4">
                    <Link
                        to={`/admin/users/${u.id}/edit`}
                        className={BUTTON.default}
                    >
                        Редактировать
                    </Link>

                    <button
                        onClick={handleDelete}
                        disabled={deleteLoading}
                        className={BUTTON.warning}
                    >
                        Удалить
                    </button>
                </div>
            </section>
        </AdminLayout>
    );
}

/* ================= helpers ================= */

function Info({
                  label,
                  children,
              }: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <p className={TEXT.accent_2}>{label}</p>
            <p className={TEXT.default}>{children}</p>
        </div>
    );
}

function RoleBadge({ role }: { role: string }) {
    const className =
        role === "admin"
            ? "text-red-600 font-medium"
            : role === "driver"
                ? "text-blue-600"
                : "text-gray-700";

    return <span className={className}>{role}</span>;
}
