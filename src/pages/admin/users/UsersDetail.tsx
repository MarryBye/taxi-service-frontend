import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";

import { TEXT } from "@/styles/Text";
import { LINK } from "@/styles/Link";
import { BUTTON } from "@/styles/Button";

import { useUser, useDeleteUser } from "@/hooks/admin/useUsers";

export default function AdminUserDetailPage(): React.ReactElement {
    const navigate = useNavigate();
    const { userId } = useParams<{ userId: string }>();
    const id = userId ? Number(userId) : null;

    const { data: user, loading, error } = useUser(id);
    const { mutate: deleteUser, loading: deleteLoading } = useDeleteUser();

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
        if (!id) return;
        if (!confirm("Удалить пользователя?")) return;

        await deleteUser(id);
        navigate("/admin/users");
    }

    return (
        <AdminLayout>
            <section className="max-w-3xl flex flex-col gap-8">
                {/* ===== HEADER ===== */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className={`${TEXT.title} text-3xl mb-2`}>
                            Пользователь #{user.id}
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

                {/* ===== INFO ===== */}
                <div className="border border-gray-200 rounded bg-white p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p className={TEXT.accent_2}>Имя</p>
                        <p className={TEXT.default}>
                            {user.first_name} {user.last_name}
                        </p>
                    </div>

                    <div>
                        <p className={TEXT.accent_2}>Роль</p>
                        <p className={TEXT.default}>{user.role}</p>
                    </div>

                    <div>
                        <p className={TEXT.accent_2}>Email</p>
                        <p className={TEXT.default}>{user.email}</p>
                    </div>

                    <div>
                        <p className={TEXT.accent_2}>Телефон</p>
                        <p className={TEXT.default}>{user.tel_number}</p>
                    </div>

                    <div>
                        <p className={TEXT.accent_2}>Локация</p>
                        <p className={TEXT.default}>
                            {user.city}, {user.country}
                        </p>
                    </div>

                    <div>
                        <p className={TEXT.accent_2}>Создан</p>
                        <p className={TEXT.default}>
                            {new Date(user.created_at).toLocaleString()}
                        </p>
                    </div>

                    <div>
                        <p className={TEXT.accent_2}>Обновлён</p>
                        <p className={TEXT.default}>
                            {new Date(user.changed_at).toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* ===== ACTIONS ===== */}
                <div className="flex gap-4">
                    <Link
                        to={`/admin/users/${user.id}/edit`}
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
