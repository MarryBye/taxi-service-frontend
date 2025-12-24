import React from "react";
import { Link } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";

import { TEXT } from "@/styles/Text";
import { LINK } from "@/styles/Link";
import { BUTTON } from "@/styles/Button";

import { useUsersList } from "@/hooks/useAdmin";
import type { UsersView } from "@/types/views";

export default function AdminUsersListPage(): React.ReactElement {
    const { data, loading, error } = useUsersList();

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
            <section className="max-w-7xl mx-auto px-8 py-16 flex flex-col gap-8">
                {/* HEADER */}
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

                {/* TABLE */}
                <div className="border border-gray-200 rounded bg-white overflow-x-auto">
                    {!data || data.length === 0 ? (
                        <p className={`${TEXT.accent_1} px-6 py-6`}>
                            Пользователей пока нет
                        </p>
                    ) : (
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-50">
                            <tr>
                                <Th>ID</Th>
                                <Th>Имя</Th>
                                <Th>Email</Th>
                                <Th>Телефон</Th>
                                <Th>Роль</Th>
                                <Th>Город</Th>
                                <Th>Создан</Th>
                                <Th>Действия</Th>
                            </tr>
                            </thead>

                            <tbody>
                            {data.map((user: UsersView) => (
                                <tr
                                    key={user.id}
                                    className="hover:bg-gray-50"
                                >
                                    <Td>{user.id}</Td>

                                    <Td>
                                        {user.first_name} {user.last_name}
                                    </Td>

                                    <Td>{user.email}</Td>

                                    <Td>{user.tel_number}</Td>

                                    <Td>
                                        <UserRoleBadge role={user.role} />
                                    </Td>

                                    <Td>
                                        {user.city.country.full_name},{" "}
                                        {user.city.name}
                                    </Td>

                                    <Td>
                                        {new Date(
                                            user.created_at
                                        ).toLocaleDateString()}
                                    </Td>

                                    <Td>
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
                                    </Td>
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

/* ================= helpers ================= */

function UserRoleBadge({ role }: { role: string }) {
    const className =
        role === "admin"
            ? "text-red-600 font-medium"
            : role === "driver"
                ? "text-blue-600"
                : "text-gray-700";

    return <span className={className}>{role}</span>;
}

function Th({ children }: { children: React.ReactNode }) {
    return (
        <th className="text-left px-4 py-3 border-b">
            {children}
        </th>
    );
}

function Td({ children }: { children: React.ReactNode }) {
    return (
        <td className="px-4 py-3 border-b">
            {children}
        </td>
    );
}
