import React from "react";
import { Link } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";

import { TEXT } from "@/styles/Text";
import { LINK } from "@/styles/Link";
import { BUTTON } from "@/styles/Button";

import { useCarsList } from "@/hooks/useAdmin";

export default function AdminCarsListPage(): React.ReactElement {
    const { data, loading, error } = useCarsList();

    if (loading) {
        return (
            <AdminLayout>
                <p className={TEXT.accent_1}>Загрузка автомобилей…</p>
            </AdminLayout>
        );
    }

    if (error) {
        return (
            <AdminLayout>
                <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded">
                    Не удалось загрузить список автомобилей
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
                            Автомобили
                        </h1>
                        <p className={TEXT.accent_1}>
                            Управление автопарком
                        </p>
                    </div>

                    <Link to="/admin/cars/create" className={BUTTON.default}>
                        + Добавить автомобиль
                    </Link>
                </div>

                <div className="border border-gray-200 rounded bg-white overflow-x-auto">
                    {!data || data.length === 0 ? (
                        <p className={`${TEXT.accent_1} px-6 py-6`}>
                            Автомобилей пока нет
                        </p>
                    ) : (
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left px-4 py-3 border-b">
                                    ID
                                </th>
                                <th className="text-left px-4 py-3 border-b">
                                    Авто
                                </th>
                                <th className="text-left px-4 py-3 border-b">
                                    Номер
                                </th>
                                <th className="text-left px-4 py-3 border-b">
                                    Цвет
                                </th>
                                <th className="text-left px-4 py-3 border-b">
                                    Класс
                                </th>
                                <th className="text-left px-4 py-3 border-b">
                                    Статус
                                </th>
                                <th className="text-left px-4 py-3 border-b">
                                    Водитель
                                </th>
                                <th className="text-left px-4 py-3 border-b">
                                    Локация
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
                            {data.map((car: any) => (
                                <tr
                                    key={car.id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-4 py-3 border-b">
                                        {car.id}
                                    </td>

                                    <td className="px-4 py-3 border-b">
                                        {car.mark} {car.model}
                                    </td>

                                    <td className="px-4 py-3 border-b">
                                        {car.car_number}
                                    </td>

                                    <td className="px-4 py-3 border-b">
                                        {car.color}
                                    </td>

                                    <td className="px-4 py-3 border-b">
                                        {car.car_class}
                                    </td>

                                    <td className="px-4 py-3 border-b">
                                            <span
                                                className={
                                                    car.car_status === "available"
                                                        ? "text-green-600"
                                                        : car.car_status === "busy"
                                                            ? "text-yellow-600"
                                                            : car.car_status === "on_maintenance"
                                                                ? "text-orange-600"
                                                                : "text-red-600"
                                                }
                                            >
                                                {car.car_status}
                                            </span>
                                    </td>

                                    <td className="px-4 py-3 border-b">
                                        {car.driver_id ?? "—"}
                                    </td>

                                    <td className="px-4 py-3 border-b">
                                        {car.city.name}, {car.city.country.full_name}
                                    </td>

                                    <td className="px-4 py-3 border-b">
                                        {new Date(
                                            car.created_at
                                        ).toLocaleDateString()}
                                    </td>

                                    <td className="px-4 py-3 border-b">
                                        <div className="flex gap-3">
                                            <Link
                                                to={`/admin/cars/${car.id}`}
                                                className={LINK.default}
                                            >
                                                Открыть
                                            </Link>

                                            <Link
                                                to={`/admin/cars/${car.id}/edit`}
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
