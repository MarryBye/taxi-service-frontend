import React from "react";
import { Link } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { ContentTable } from "@/components/ui/ContentTable";
import { LoaderBlock } from "@/components/ui/Loader";

import { styleSheet } from "@/styles/Form";
import { FaPlus, FaInfo } from "react-icons/fa";

import { useTransactionsList } from "@/hooks/useAdmin";
import type { TransactionsView } from "@/types/views";

export default function AdminTransactionsListPage(): React.ReactElement {
    const { data, loading, error } = useTransactionsList();

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
                            Транзакції
                        </h1>

                        <p className={styleSheet.textStyles.SMALL}>
                            Керування транзакціями системи
                        </p>
                    </div>

                    <Link
                        to="/admin/transactions/create"
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
                        "ID": (row: TransactionsView): React.ReactNode =>
                            String(row.id),

                        "Тип балансу": (row: TransactionsView): React.ReactNode =>
                            row.balance_type,

                        "Тип транзакції": (row: TransactionsView): React.ReactNode =>
                            row.transaction_type,

                        "Метод оплати": (row: TransactionsView): React.ReactNode =>
                            row.payment_method,

                        "Сума": (row: TransactionsView): React.ReactNode =>
                            `${row.amount} грн`,

                        "Дата створення": (row: TransactionsView): React.ReactNode =>
                            new Date(row.created_at).toLocaleString(),

                        "Дії": (row: TransactionsView): React.ReactNode => (
                            <div className={styleSheet.containerStyles.SMALL_CONTAINER}>
                                <div className={styleSheet.containerStyles.ROW_SMALL_GAP}>
                                    <Link
                                        to={`/admin/transactions/${row.id}`}
                                        className={styleSheet.textStyles.LINK_NO_DECORATION}
                                    >
                                        <FaInfo />
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
