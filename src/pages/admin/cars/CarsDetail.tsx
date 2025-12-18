import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";

import { TEXT } from "@/styles/Text";
import { LINK } from "@/styles/Link";
import { BUTTON } from "@/styles/Button";

import { useCar, useDeleteCar } from "@/hooks/admin/useCars";

export default function AdminCarDetailPage(): React.ReactElement {
    const navigate = useNavigate();
    const { carId } = useParams<{ carId: string }>();
    const id = carId ? Number(carId) : null;

    const { data: car, loading, error } = useCar(id);
    const { mutate: deleteCar } = useDeleteCar();

    if (loading) {
        return (
            <AdminLayout>
                <p className={TEXT.accent_1}>Загрузка автомобиля…</p>
            </AdminLayout>
        );
    }

    if (error || !car) {
        return (
            <AdminLayout>
                <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded">
                    Автомобиль не найден
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <section className="max-w-4xl flex flex-col gap-8">
                {/* HEADER */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className={`${TEXT.title} text-3xl mb-1`}>
                            {car.mark} {car.model}
                        </h1>
                        <p className={TEXT.accent_1}>
                            Детали автомобиля
                        </p>
                    </div>

                    <Link
                        to="/admin/cars"
                        className={BUTTON.transparent}
                    >
                        ← Назад
                    </Link>
                </div>

                {/* INFO */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-200 rounded p-6 bg-white">
                    <div>
                        <p className={TEXT.accent_2}>ID</p>
                        <p className={TEXT.default}>{car.id}</p>
                    </div>

                    <div>
                        <p className={TEXT.accent_2}>Гос. номер</p>
                        <p className={TEXT.default}>{car.car_number}</p>
                    </div>

                    <div>
                        <p className={TEXT.accent_2}>Марка</p>
                        <p className={TEXT.default}>{car.mark}</p>
                    </div>

                    <div>
                        <p className={TEXT.accent_2}>Модель</p>
                        <p className={TEXT.default}>{car.model}</p>
                    </div>

                    <div>
                        <p className={TEXT.accent_2}>Цвет</p>
                        <p className={TEXT.default}>{car.color}</p>
                    </div>

                    <div>
                        <p className={TEXT.accent_2}>Класс</p>
                        <p className={TEXT.default}>{car.car_class}</p>
                    </div>

                    <div>
                        <p className={TEXT.accent_2}>Статус</p>
                        <p
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
                        </p>
                    </div>

                    <div>
                        <p className={TEXT.accent_2}>Водитель</p>
                        <p className={TEXT.default}>
                            {car.driver_id ?? "Не назначен"}
                        </p>
                    </div>

                    <div>
                        <p className={TEXT.accent_2}>Локация</p>
                        <p className={TEXT.default}>
                            {car.city}, {car.country}
                        </p>
                    </div>

                    <div>
                        <p className={TEXT.accent_2}>Создан</p>
                        <p className={TEXT.default}>
                            {new Date(car.created_at).toLocaleString()}
                        </p>
                    </div>

                    <div>
                        <p className={TEXT.accent_2}>Обновлён</p>
                        <p className={TEXT.default}>
                            {new Date(car.changed_at).toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-4">
                    <Link
                        to={`/admin/cars/${car.id}/edit`}
                        className={BUTTON.default}
                    >
                        Редактировать
                    </Link>

                    <button
                        className={BUTTON.warning}
                        onClick={() => {
                            deleteCar(car.id);
                            navigate("/admin/cars");
                        }}
                    >
                        Удалить
                    </button>
                </div>
            </section>
        </AdminLayout>
    );
}
