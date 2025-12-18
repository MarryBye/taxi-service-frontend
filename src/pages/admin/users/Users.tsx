import React from "react";
import { Link } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";

import { TEXT } from "@/styles/Text";
import { LINK } from "@/styles/Link";
import { BUTTON } from "@/styles/Button";

import { useUsers } from "@/hooks/admin/useUsers";

export default function AdminUsersListPage(): React.ReactElement {
    const { data, loading, error } = useUsers();

    if (loading) {
        return (
            <AdminLayout>
                <p className={TEXT.accent_1}>Загрузка пользователей…</p>
            </AdminLayout>
        );
    }

    if (error) {
        return (
            <AdminLayout>
                <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded">
                    Не удалось загрузить список пользователей
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <section className="flex flex-col gap-8">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div>
                        <h1 className={`${TEXT.title} text-3xl mb-2`}>
                            Пользователи
                        </h1>
                        <p className={TEXT.accent_1}>
                            Управление пользователями системы
                        </p>
                    </div>

                    <Link to="/admin/users/create" className={BUTTON.default}>
                        + Создать пользователя
                    </Link>
                </div>

                <div className="border border-gray-200 rounded bg-white overflow-x-auto">
                    {!data || data.length === 0 ? (
                        <p className={`${TEXT.accent_1} px-6 py-6`}>
                            Пользователей пока нет
                        </p>
                    ) : (
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left px-4 py-3 border-b">
                                    ID
                                </th>
                                <th className="text-left px-4 py-3 border-b">
                                    Имя
                                </th>
                                <th className="text-left px-4 py-3 border-b">
                                    Email
                                </th>
                                <th className="text-left px-4 py-3 border-b">
                                    Телефон
                                </th>
                                <th className="text-left px-4 py-3 border-b">
                                    Роль
                                </th>
                                <th className="text-left px-4 py-3 border-b">
                                    Город
                                </th>
                                <th className="text-left px-4 py-3 border-b">
                                    Дата создания
                                </th>
                                <th className="text-left px-4 py-3 border-b">
                                    Действия
                                </th>
                            </tr>
                            </thead>

                            <tbody>
                            {data.map((user: any) => (
                                <tr
                                    key={user.id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-4 py-3 border-b">
                                        {user.id}
                                    </td>

                                    <td className="px-4 py-3 border-b">
                                        {user.first_name} {user.last_name}
                                    </td>

                                    <td className="px-4 py-3 border-b">
                                        {user.email}
                                    </td>

                                    <td className="px-4 py-3 border-b">
                                        {user.tel_number}
                                    </td>

                                    <td className="px-4 py-3 border-b">
                                            <span
                                                className={
                                                    user.role === "admin"
                                                        ? "text-red-600 font-medium"
                                                        : user.role === "driver"
                                                            ? "text-blue-600"
                                                            : "text-gray-700"
                                                }
                                            >
                                                {user.role}
                                            </span>
                                    </td>

                                    <td className="px-4 py-3 border-b">
                                        {user.city}, {user.country}
                                    </td>

                                    <td className="px-4 py-3 border-b">
                                        {new Date(
                                            user.created_at
                                        ).toLocaleDateString()}
                                    </td>

                                    <td className="px-4 py-3 border-b">
                                        <div className="flex gap-3">
                                            <Link
                                                to={`/admin/users/${user.id}`}
                                                className={LINK.default}
                                            >
                                                Открыть
                                            </Link>

                                            <Link
                                                to={`/admin/users/${user.id}/edit`}
                                                className={LINK.default}
                                            >
                                                Редактировать
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </section>
        </AdminLayout>
    );
}
