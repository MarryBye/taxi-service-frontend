import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";

import { TEXT } from "@/styles/Text";
import { LINK } from "@/styles/Link";
import { BUTTON } from "@/styles/Button";

import { useMaintenance, useDeleteMaintenance } from "@/hooks/admin/useMaintenances";

export default function AdminMaintenanceDetailPage(): React.ReactElement {
    const navigate = useNavigate();
    const { maintenanceId } = useParams<{ maintenanceId: string }>();
    const id = maintenanceId ? Number(maintenanceId) : null;

    const { data: maintenance, loading, error } = useMaintenance(id);
    const { mutate: deleteMaintenance } = useDeleteMaintenance();

    if (loading) {
        return (
            <AdminLayout>
                <p className={TEXT.accent_1}>Загрузка обслуживания…</p>
            </AdminLayout>
        );
    }

    if (error || !maintenance) {
        return (
            <AdminLayout>
                <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded">
                    Запись обслуживания не найдена
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <section className="flex flex-col gap-10 max-w-4xl">
                {/* ===== HEADER ===== */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className={`${TEXT.title} text-3xl mb-2`}>
                            Обслуживание #{maintenance.id}
                        </h1>
                        <p className={TEXT.accent_1}>
                            Автомобиль ID: {maintenance.car_id}
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <Link
                            to={`/admin/maintenances/${maintenance.id}/edit`}
                            className={BUTTON.transparent}
                        >
                            Редактировать
                        </Link>

                        <button
                            className={BUTTON.warning}
                            onClick={() =>
                                deleteMaintenance(maintenance.id, {
                                    onSuccess: () =>
                                        navigate("/admin/maintenances"),
                                })
                            }
                        >
                            Удалить
                        </button>
                    </div>
                </div>

                {/* ===== MAIN INFO ===== */}
                <div className="border border-gray-200 rounded p-6 bg-white grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p className={TEXT.accent_2}>Статус</p>
                        <p
                            className={
                                maintenance.status === "completed"
                                    ? "text-green-600 font-medium"
                                    : maintenance.status === "in_progress"
                                        ? "text-yellow-600 font-medium"
                                        : "text-gray-700 font-medium"
                            }
                        >
                            {maintenance.status}
                        </p>
                    </div>

                    <div>
                        <p className={TEXT.accent_2}>Стоимость</p>
                        <p className={TEXT.default}>
                            {maintenance.cost} грн
                        </p>
                    </div>

                    <div>
                        <p className={TEXT.accent_2}>Начало обслуживания</p>
                        <p className={TEXT.default}>
                            {maintenance.maintenance_start
                                ? new Date(
                                    maintenance.maintenance_start
                                ).toLocaleString()
                                : "—"}
                        </p>
                    </div>

                    <div>
                        <p className={TEXT.accent_2}>Окончание обслуживания</p>
                        <p className={TEXT.default}>
                            {maintenance.maintenance_end
                                ? new Date(
                                    maintenance.maintenance_end
                                ).toLocaleString()
                                : "—"}
                        </p>
                    </div>
                </div>

                {/* ===== DESCRIPTION ===== */}
                <div className="border border-gray-200 rounded p-6 bg-white">
                    <p className={TEXT.accent_2 + " mb-2"}>
                        Описание работ
                    </p>
                    <p className={TEXT.default}>
                        {maintenance.description}
                    </p>
                </div>

                {/* ===== META ===== */}
                <div className="border border-gray-200 rounded p-6 bg-white grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p className={TEXT.accent_2}>Создано</p>
                        <p className={TEXT.default}>
                            {new Date(
                                maintenance.created_at
                            ).toLocaleString()}
                        </p>
                    </div>

                    <div>
                        <p className={TEXT.accent_2}>Изменено</p>
                        <p className={TEXT.default}>
                            {new Date(
                                maintenance.changed_at
                            ).toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* ===== BACK ===== */}
                <Link
                    to="/admin/maintenances"
                    className={LINK.default}
                >
                    ← Назад к списку обслуживаний
                </Link>
            </section>
        </AdminLayout>
    );
}
