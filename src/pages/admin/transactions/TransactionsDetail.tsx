import React from "react";
import { Link, useParams } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { styleSheet } from "@/styles/Form";

import { useTransactionInfo } from "@/hooks/useAdmin";
import type { TransactionsView } from "@/types/views";

import { FaBackward } from "react-icons/fa";
import { LoaderBlock } from "@/components/ui/Loader";

export default function AdminTransactionDetailPage(): React.ReactElement {
    const { transactionId } = useParams<{ transactionId: string }>();
    const id = transactionId ? Number(transactionId) : null;

    const {
        data: transaction,
        loading: transactionLoading,
        error: transactionError,
    } = useTransactionInfo(id);

    if (transactionLoading) {
        return (
            <AdminLayout>
                <LoaderBlock />
            </AdminLayout>
        );
    }

    if (transactionError || !transaction) {
        return (
            <AdminLayout>
                <div className={styleSheet.emphasisStyles.BOX_DANGER}>
                    Помилка завантаження транзакції
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <section
                className={`${styleSheet.contentStyles.SECTION_NARROW} flex flex-col gap-8`}
            >
                <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div>
                        <h1 className={`${styleSheet.textStyles.H1} mb-2`}>
                            Транзакція
                        </h1>

                        <p className={styleSheet.textStyles.SMALL}>
                            Інформація про транзакцію
                        </p>
                    </div>

                    <Link
                        to="/admin/transactions"
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
                            <p className={styleSheet.textStyles.SUBTLE}>ID</p>
                            <p className={styleSheet.textStyles.BOLD}>
                                {transaction.id}
                            </p>
                        </div>

                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>Користувач</p>
                            <p className={styleSheet.textStyles.DEFAULT}>
                                <Link
                                    to={`/admin/users/${transaction.user.id}`}
                                    className={`${styleSheet.textStyles.LINK_NO_DECORATION}`}
                                >
                                    {transaction.user.first_name} {transaction.user.last_name}
                                </Link>
                            </p>
                        </div>

                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>Тип балансу</p>
                            <p className={styleSheet.textStyles.DEFAULT}>
                                {transaction.balance_type}
                            </p>
                        </div>

                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>
                                Тип транзакції
                            </p>
                            <p className={styleSheet.textStyles.DEFAULT}>
                                {transaction.transaction_type}
                            </p>
                        </div>

                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>
                                Метод оплати
                            </p>
                            <p className={styleSheet.textStyles.DEFAULT}>
                                {transaction.payment_method}
                            </p>
                        </div>

                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>Сума</p>
                            <p className={styleSheet.textStyles.DEFAULT}>
                                {transaction.amount} грн
                            </p>
                        </div>

                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>
                                Дата створення
                            </p>
                            <p className={styleSheet.textStyles.SMALL}>
                                {new Date(
                                    transaction.created_at
                                ).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </AdminLayout>
    );
}
