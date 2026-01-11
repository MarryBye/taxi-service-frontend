import React from "react";
import {Link, useNavigate} from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { styleSheet } from "@/styles/Form";
import { FaBackward } from "react-icons/fa";

import {useCreateTransaction} from "@/hooks/useAdmin";
import type { CreateTransactionSchema } from "@/types/admin";
import CreateTransactionForm from "@/components/forms/admin/CreateTransactionForm";

export default function AdminTransactionCreatePage(): React.ReactElement {
    const navigate = useNavigate();
    const { mutate: createTransaction, loading, error } = useCreateTransaction();

    return (
        <AdminLayout>
            <section
                className={`${styleSheet.contentStyles.SECTION_NARROW} flex flex-col gap-8`}
            >

                <div
                    className="flex flex-col md:flex-row justify-between gap-6"
                >
                    <div>
                        <h1
                            className={`${styleSheet.textStyles.H1} mb-2`}
                        >
                            Транзакції
                        </h1>

                        <p className={styleSheet.textStyles.SMALL}>
                            Створення транзакції
                        </p>
                    </div>

                    <Link
                        to="/admin/transactions"
                        className={styleSheet.inputStyles.BUTTON_SECONDARY}
                    >
                        <div className={styleSheet.containerStyles.ROW_SMALL_GAP}>
                            <FaBackward/> Повернутись
                        </div>
                    </Link>
                </div>

                <CreateTransactionForm
                    submitHandler={(form: CreateTransactionSchema) => {
                        createTransaction(form);
                        navigate("/admin/transactions");
                    }}
                />
            </section>
        </AdminLayout>
    );
}
