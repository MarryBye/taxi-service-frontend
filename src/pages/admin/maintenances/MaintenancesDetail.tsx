import React from "react";
import { Link, useParams } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { styleSheet } from "@/styles/Form";

import { useMaintenanceInfo } from "@/hooks/useAdmin";
import type { MaintenancesView } from "@/types/views";

import { FaBackward } from "react-icons/fa";
import { LoaderBlock } from "@/components/ui/Loader";

export default function AdminMaintenanceDetailPage(): React.ReactElement {
    const { maintenanceId } = useParams<{ maintenanceId: string }>();
    const id = maintenanceId ? Number(maintenanceId) : null;

    const {
        data: maintenance,
        loading: maintenanceLoading,
        error: maintenanceError,
    } = useMaintenanceInfo(id);

    if (maintenanceLoading) {
        return (
            <AdminLayout>
                <LoaderBlock />
            </AdminLayout>
        );
    }

    if (maintenanceError || !maintenance) {
        return (
            <AdminLayout>
                <div className={styleSheet.emphasisStyles.BOX_DANGER}>
                    Помилка завантаження обслуговування
                </div>
            </AdminLayout>
        );
    }

    const { car } = maintenance;

    return (
        <AdminLayout>
            <section
                className={`${styleSheet.contentStyles.SECTION_NARROW} flex flex-col gap-8`}
            >
                <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div>
                        <h1 className={`${styleSheet.textStyles.H1} mb-2`}>
                            Обслуговування
                        </h1>

                        <p className={styleSheet.textStyles.SMALL}>
                            Інформація про обслуговування
                        </p>
                    </div>

                    <Link
                        to="/admin/maintenances"
                        className={styleSheet.inputStyles.BUTTON_SECONDARY}
                    >
                        <div className={styleSheet.containerStyles.ROW_SMALL_GAP}>
                            <FaBackward /> Повернутись
                        </div>
                    </Link>
                </div>

                <div className={styleSheet.containerStyles.CARD}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>Автомобіль</p>
                            <p className={styleSheet.textStyles.BOLD}>
                                <Link
                                    to={`/admin/cars/${maintenance.car.id}`}
                                    className={`${styleSheet.textStyles.LINK_NO_DECORATION}`}
                                >
                                    {`${maintenance.car.mark} ${maintenance.car.model}`},
                                </Link>
                            </p>
                        </div>

                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>
                                Номерний знак
                            </p>
                            <p className={styleSheet.textStyles.DEFAULT}>
                                {car.number_plate}
                            </p>
                        </div>

                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>Колір</p>
                            <p className={styleSheet.textStyles.DEFAULT}>
                                {car.color}
                            </p>
                        </div>

                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>
                                Клас авто
                            </p>
                            <p className={styleSheet.textStyles.DEFAULT}>
                                {car.car_class}
                            </p>
                        </div>

                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>Статус</p>
                            <p className={styleSheet.textStyles.DEFAULT}>
                                {car.car_status}
                            </p>
                        </div>

                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>
                                Місцезнаходження
                            </p>
                            <p className={styleSheet.textStyles.DEFAULT}>
                                {car.city.country.full_name}, {car.city.name}
                            </p>
                        </div>

                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>
                                Дата створення
                            </p>
                            <p className={styleSheet.textStyles.SMALL}>
                                {new Date(
                                    maintenance.created_at
                                ).toLocaleString()}
                            </p>
                        </div>

                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>
                                Останнє оновлення
                            </p>
                            <p className={styleSheet.textStyles.SMALL}>
                                {new Date(
                                    maintenance.changed_at
                                ).toLocaleString()}
                            </p>
                        </div>
                    </div>

                    <hr className={styleSheet.otherStyles.DIVIDER} />

                    <div>
                        <p className={styleSheet.textStyles.SUBTLE}>Опис</p>
                        <p className={styleSheet.textStyles.DEFAULT}>
                            {maintenance.description}
                        </p>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>
                                Вартість
                            </p>
                            <p className={styleSheet.textStyles.EMPHASIS}>
                                {maintenance.cost} грн
                            </p>
                        </div>

                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>Статус</p>
                            <p className={styleSheet.textStyles.DEFAULT}>
                                {maintenance.status}
                            </p>
                        </div>

                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>
                                Початок обслуговування
                            </p>
                            <p className={styleSheet.textStyles.SMALL}>
                                {new Date(
                                    maintenance.maintenance_start
                                ).toLocaleString()}
                            </p>
                        </div>

                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>
                                Завершення обслуговування
                            </p>
                            <p className={styleSheet.textStyles.SMALL}>
                                {new Date(
                                    maintenance.maintenance_end
                                ).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styleSheet.containerStyles.ROW}>
                    <Link
                        to={`/admin/maintenances/${maintenance.id}/edit`}
                        className={styleSheet.inputStyles.BUTTON_WARNING}
                    >
                        Редагувати
                    </Link>

                    <Link
                        to={`/admin/maintenances/${maintenance.id}/delete`}
                        className={styleSheet.inputStyles.BUTTON_DANGER}
                    >
                        Видалити
                    </Link>
                </div>
            </section>
        </AdminLayout>
    );
}
