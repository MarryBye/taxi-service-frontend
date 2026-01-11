import React from "react";
import { Link } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { ContentTable } from "@/components/ui/ContentTable";
import { LoaderBlock } from "@/components/ui/Loader";

import { styleSheet } from "@/styles/Form";
import { FaPlus, FaInfo, FaMinus, FaEdit } from "react-icons/fa";

import { useMaintenancesList } from "@/hooks/useAdmin";
import type { MaintenancesView } from "@/types/views";

export default function AdminMaintenancesListPage(): React.ReactElement {
    const { data, loading, error } = useMaintenancesList();

    if (loading) {
        return (
            <AdminLayout>
                <LoaderBlock />
            </AdminLayout>
        );
    }

    if (error) {
        return (
            <AdminLayout>
                <div className={styleSheet.containerStyles.CARD}>
                    {error}
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <section
                className={`${styleSheet.contentStyles.SECTION} flex flex-col gap-8`}
            >
                <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div>
                        <h1 className={`${styleSheet.textStyles.H1} mb-2`}>
                            Обслуговування
                        </h1>

                        <p className={styleSheet.textStyles.SMALL}>
                            Керування технічним обслуговуванням
                        </p>
                    </div>

                    <Link
                        to="/admin/maintenances/create"
                        className={styleSheet.inputStyles.BUTTON_SECONDARY}
                    >
                        <div className={styleSheet.containerStyles.ROW_SMALL_GAP}>
                            <FaPlus /> Створити
                        </div>
                    </Link>
                </div>

                <ContentTable
                    content={data!}
                    table_map={{
                        "ID": (row: MaintenancesView): React.ReactNode =>
                            String(row.id),

                        "Автомобіль": (row: MaintenancesView): React.ReactNode =>
                            (<Link
                                to={`/admin/cars/${row.car?.id}`}
                                className={`${styleSheet.textStyles.LINK_NO_DECORATION}`}
                            >
                                {`${row.car?.mark} ${row.car?.model}`},
                            </Link>),

                        "Вартість": (row: MaintenancesView): React.ReactNode =>
                            `${row.cost} грн`,

                        "Статус": (row: MaintenancesView): React.ReactNode =>
                            `${row.status}`,

                        "Початок": (row: MaintenancesView): React.ReactNode =>
                            new Date(row.maintenance_start).toLocaleDateString(),

                        "Завершення": (row: MaintenancesView): React.ReactNode =>
                            new Date(row.maintenance_end).toLocaleDateString(),

                        "Дії": (row: MaintenancesView): React.ReactNode => (
                            <div className={styleSheet.containerStyles.SMALL_CONTAINER}>
                                <div className={styleSheet.containerStyles.ROW_SMALL_GAP}>
                                    <Link
                                        to={`/admin/maintenances/${row.id}`}
                                        className={styleSheet.textStyles.LINK_NO_DECORATION}
                                    >
                                        <FaInfo />
                                    </Link>

                                    <Link
                                        to={`/admin/maintenances/${row.id}/edit`}
                                        className={styleSheet.textStyles.LINK_NO_DECORATION}
                                    >
                                        <FaEdit />
                                    </Link>

                                    <Link
                                        to={`/admin/maintenances/${row.id}/delete`}
                                        className={styleSheet.textStyles.LINK_NO_DECORATION}
                                    >
                                        <FaMinus />
                                    </Link>
                                </div>
                            </div>
                        ),
                    }}
                />
            </section>
        </AdminLayout>
    );
}
