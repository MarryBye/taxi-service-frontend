import React from "react";
import { Link } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { ContentTable } from "@/components/ui/ContentTable";
import { LoaderBlock } from "@/components/ui/Loader";

import { styleSheet } from "@/styles/Form";
import {FaPlus, FaInfo, FaMinus, FaEdit} from "react-icons/fa";

import { useAdminOrdersList } from "@/hooks/useAdmin";
import type { OrdersView } from "@/types/views";

export default function AdminOrdersListPage(): React.ReactElement {
    const { data, loading, error } = useAdminOrdersList();

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
                            Замовлення
                        </h1>

                        <p className={styleSheet.textStyles.SMALL}>
                            Керування замовленнями системи
                        </p>
                    </div>
                </div>

                <ContentTable
                    content={data!}
                    table_map={{
                        "ID": (row: OrdersView): React.ReactNode =>
                            String(row.id),

                        "Клієнт": (row: OrdersView): React.ReactNode =>
(                            <Link
                                to={`/admin/users/${row.client.id}`}
                                className={`${styleSheet.textStyles.LINK_NO_DECORATION}`}
                            >
                                {row.client?.first_name} {row.client?.last_name}
                            </Link>),

                        "Водій": (row: OrdersView): React.ReactNode =>
                            <span>
                                {
                                    row.driver ?
                                        (<Link
                                            to={`/admin/users/${row.driver.id}`}
                                            className={`${styleSheet.textStyles.LINK_NO_DECORATION}`}
                                        >
                                            `${row.driver?.first_name} ${row.driver?.last_name}`
                                        </Link>)
                                        :
                                        `Не призначено`
                                },
                            </span>,

                        "Статус": (row: OrdersView): React.ReactNode =>
                            `${row.status}`,

                        "Клас": (row: OrdersView): React.ReactNode =>
                            `${row.order_class}`,

                        "Дії": (row: OrdersView): React.ReactNode => (
                            <div
                                className={styleSheet.containerStyles.SMALL_CONTAINER}
                            >
                                <div className={styleSheet.containerStyles.ROW_SMALL_GAP}>
                                    <Link
                                        to={`/admin/orders/${row.id}`}
                                        className={`${styleSheet.textStyles.LINK_NO_DECORATION}`}
                                    >
                                        <FaInfo/>
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
