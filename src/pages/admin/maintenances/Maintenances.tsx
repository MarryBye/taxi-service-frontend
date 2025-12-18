import React from "react";
import { Link } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";

import { TEXT } from "@/styles/Text";
import { LINK } from "@/styles/Link";
import { BUTTON } from "@/styles/Button";

import { useMaintenances } from "@/hooks/admin/useMaintenances";

export default function AdminMaintenancesListPage(): React.ReactElement {
    const { data, loading, error } = useMaintenances();

    if (loading) {
        return (
            <AdminLayout>
                <p className={TEXT.accent_1}>Загрузка обслуживаний…</p>
            </AdminLayout>
        );
    }

    if (error) {
        return (
            <AdminLayout>
                <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded">
                    Не удалось загрузить список обслуживаний
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <section className="flex flex-col gap-8">
                {/* ===== HEADER ===== */}
                <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div>
                        <h1 className={`${TEXT.title} text-3xl mb-2`}>
                            Обслуживание автомобилей
                        </h1>
                        <p className={TEXT.accent_1}>
                            Диагностика, ремонт и техническое обслуживание
                        </p>
                    </div>

                    <Link
                        to="/admin/maintenances/create"
                        className={BUTTON.default}
                    >
                        + Добавить обслуживание
                    </Link>
                </div>

                {/* ===== TABLE ===== */}
                <div className="border border-gray-200 rounded bg-white overflow-x-auto">
                    {!data || data.length === 0 ? (
                        <p className={`${TEXT.accent_1} px-6 py-6`}>
                            Записей об обслуживании пока нет
                        </p>
                    ) : (
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left px-4 py-3 border-b">
                                    ID
                                </th>
                                <th className="text-left px-4 py-3 border-b">
                                    Автомобиль
                                </th>
                                <th className="text-left px-4 py-3 border-b">
                                    Описание
                                </th>
                                <th className="text-left px-4 py-3 border-b">
                                    Стоимость
                                </th>
                                <th className="text-left px-4 py-3 border-b">
                                    Статус
                                </th>
                                <th className="text-left px-4 py-3 border-b">
                                    Период
                                </th>
                                <th className="text-left px-4 py-3 border-b">
                                    Создано
                                </th>
                                <th className="text-left px-4 py-3 border-b">
                                    Действия
                                </th>
                            </tr>
                            </thead>

                            <tbody>
                            {data.map((m: any) => (
                                <tr
                                    key={m.id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-4 py-3 border-b">
                                        {m.id}
                                    </td>

                                    <td className="px-4 py-3 border-b">
                                        #{m.car_id}
                                    </td>

                                    <td className="px-4 py-3 border-b max-w-xs truncate">
                                        {m.description}
                                    </td>

                                    <td className="px-4 py-3 border-b">
                                        {m.cost} грн
                                    </td>

                                    <td className="px-4 py-3 border-b">
                                            <span
                                                className={
                                                    m.status === "completed"
                                                        ? "text-green-600"
                                                        : m.status === "in_progress"
                                                            ? "text-yellow-600"
                                                            : "text-gray-700"
                                                }
                                            >
                                                {m.status}
                                            </span>
                                    </td>

                                    <td className="px-4 py-3 border-b">
                                        <div className="flex flex-col text-sm">
                                                <span>
                                                    {m.maintenance_start
                                                        ? new Date(
                                                            m.maintenance_start
                                                        ).toLocaleDateString()
                                                        : "—"}
                                                </span>
                                            <span>
                                                    {m.maintenance_end
                                                        ? new Date(
                                                            m.maintenance_end
                                                        ).toLocaleDateString()
                                                        : "—"}
                                                </span>
                                        </div>
                                    </td>

                                    <td className="px-4 py-3 border-b">
                                        {new Date(
                                            m.created_at
                                        ).toLocaleDateString()}
                                    </td>

                                    <td className="px-4 py-3 border-b">
                                        <div className="flex gap-3">
                                            <Link
                                                to={`/admin/maintenances/${m.id}`}
                                                className={LINK.default}
                                            >
                                                Открыть
                                            </Link>

                                            <Link
                                                to={`/admin/maintenances/${m.id}/edit`}
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
