import React from "react";
import { Link } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { ContentTable } from "@/components/ui/ContentTable";
import { LoaderBlock } from "@/components/ui/Loader";

import { styleSheet } from "@/styles/Form";
import {FaPlus, FaInfo, FaMinus, FaEdit} from "react-icons/fa";

import { useUsersList } from "@/hooks/useAdmin";
import type { UsersView } from "@/types/views";

export default function AdminUsersListPage(): React.ReactElement {
    const { data, loading, error } = useUsersList();

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
                            Користувачі
                        </h1>

                        <p className={styleSheet.textStyles.SMALL}>
                            Керування користувачами системи
                        </p>
                    </div>

                    <Link
                        to="/admin/users/create"
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
                        "ID": (row: UsersView): React.ReactNode =>
                            String(row.id),

                        "Повне імʼя": (row: UsersView): React.ReactNode =>
                            `${row.first_name} ${row.last_name}`,

                        "Електронна пошта": (row: UsersView): React.ReactNode =>
                            row.email,

                        "Номер телефону": (row: UsersView): React.ReactNode =>
                            row.tel_number,

                        "Місцезнаходження": (row: UsersView): React.ReactNode =>
                            `${row.city.country.full_name}, ${row.city.name}`,

                        "Дії": (row: UsersView): React.ReactNode => (
                            <div
                                className={styleSheet.containerStyles.SMALL_CONTAINER}
                            >
                                <div className={styleSheet.containerStyles.ROW_SMALL_GAP}>
                                    <Link
                                        to={`/admin/users/${row.id}`}
                                        className={`${styleSheet.textStyles.LINK_NO_DECORATION}`}
                                    >
                                        <FaInfo/>
                                    </Link>

                                    <Link
                                        to={`/admin/users/${row.id}/edit`}
                                        className={`${styleSheet.textStyles.LINK_NO_DECORATION}`}
                                    >
                                        <FaEdit/>
                                    </Link>

                                    <Link
                                        to={`/admin/users/${row.id}/delete`}
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
