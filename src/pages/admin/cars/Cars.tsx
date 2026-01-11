import React from "react";
import { Link } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { ContentTable } from "@/components/ui/ContentTable";
import { LoaderBlock } from "@/components/ui/Loader";

import { styleSheet } from "@/styles/Form";
import {FaPlus, FaInfo, FaMinus, FaEdit} from "react-icons/fa";

import { useCarsList } from "@/hooks/useAdmin";
import type { CarsView } from "@/types/views";

export default function AdminCarsListPage(): React.ReactElement {
    const { data, loading, error } = useCarsList();

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
        )
    }

    return (
        <AdminLayout>
            <section
                className={`${styleSheet.contentStyles.SECTION} flex flex-col gap-8`}
            >
                <div
                    className="flex flex-col md:flex-row justify-between gap-6"
                >
                    <div>
                        <h1
                            className={`${styleSheet.textStyles.H1} mb-2`}
                        >
                            Автомобілі
                        </h1>

                        <p className={styleSheet.textStyles.SMALL}>
                            Керування автомобілями системи
                        </p>
                    </div>

                    <Link
                        to="/admin/cars/create"
                        className={styleSheet.inputStyles.BUTTON_SECONDARY}
                    >
                        <div className={styleSheet.containerStyles.ROW_SMALL_GAP}>
                            <FaPlus/> Створити
                        </div>
                    </Link>
                </div>

                <ContentTable
                    content={data!}
                    table_map={{
                        "ID": (row: CarsView): React.ReactNode =>
                            String(row.id),

                        "Модель та марка": (row: CarsView): React.ReactNode =>
                            `${row.mark} ${row.model}`,

                        "Номер": (row: CarsView): React.ReactNode =>
                            row.number_plate,

                        "Водій": (row: CarsView): React.ReactNode =>
                            <span>
                                {
                                    row.driver ?
                                        (<Link
                                            to={`/admin/users/${row.driver.id}`}
                                            className={`${styleSheet.textStyles.LINK_NO_DECORATION}`}
                                        >
                                            {row.driver?.first_name} {row.driver?.last_name}
                                        </Link>)
                                        :
                                        `Не призначено`
                                },
                            </span>,

                        "Місцезнаходження": (row: CarsView): React.ReactNode =>
                            `${row.city.country.full_name} ${row.city.name}`,

                        "Дії": (row: CarsView): React.ReactNode => (
                            <div
                                className={styleSheet.containerStyles.SMALL_CONTAINER}
                            >
                                <div className={styleSheet.containerStyles.ROW_SMALL_GAP}>
                                    <Link
                                        to={`/admin/cars/${row.id}`}
                                        className={`${styleSheet.textStyles.LINK_NO_DECORATION}`}
                                    >
                                        <FaInfo/>
                                    </Link>

                                    <Link
                                        to={`/admin/cars/${row.id}/edit`}
                                        className={`${styleSheet.textStyles.LINK_NO_DECORATION}`}
                                    >
                                        <FaEdit/>
                                    </Link>

                                    <Link
                                        to={`/admin/cars/${row.id}/delete`}
                                        className={`${styleSheet.textStyles.LINK_NO_DECORATION}`}
                                    >
                                        <FaMinus/>
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
