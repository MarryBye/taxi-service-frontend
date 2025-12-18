import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";

import { TEXT } from "@/styles/Text";
import { LINK } from "@/styles/Link";
import { BUTTON } from "@/styles/Button";

import { useCreateTransaction } from "@/hooks/admin/useTransactions";
import type { CreateTransaction } from "@/types/transactions";

export default function AdminTransactionCreatePage(): React.ReactElement {
    const navigate = useNavigate();
    const { mutate: createTransaction, loading, error } = useCreateTransaction();

    const [form, setForm] = useState<CreateTransaction>({
        user_id: 0,
        amount: 0,
        transaction_type: "debit",
        balance_type: "payment",
        payment_method: "cash",
    });

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]:
                name === "amount" || name === "user_id"
                    ? Number(value)
                    : value,
        });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await createTransaction(form);
        navigate("/admin/transactions");
    }

    return (
        <AdminLayout>
            <section className="max-w-xl flex flex-col gap-8">
                {/* ===== HEADER ===== */}
                <div>
                    <h1 className={`${TEXT.title} text-3xl mb-2`}>
                        Создание транзакции
                    </h1>
                    <p className={TEXT.accent_1}>
                        Ручное начисление или списание средств
                    </p>
                </div>

                {/* ===== FORM ===== */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5 bg-white border border-gray-200 rounded p-6"
                >
                    <input
                        type="number"
                        name="user_id"
                        placeholder="ID пользователя"
                        value={form.user_id}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-4 py-2"
                    />

                    <input
                        type="number"
                        name="amount"
                        placeholder="Сумма"
                        value={form.amount}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-4 py-2"
                    />

                    <select
                        name="transaction_type"
                        value={form.transaction_type}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-4 py-2"
                    >
                        <option value="debit">Списание</option>
                        <option value="credit">Начисление</option>
                        <option value="refund">Возврат</option>
                        <option value="penalty">Штраф</option>
                    </select>

                    <select
                        name="balance_type"
                        value={form.balance_type}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-4 py-2"
                    >
                        <option value="payment">Платёжный</option>
                        <option value="earning">Заработок</option>
                    </select>

                    <select
                        name="payment_method"
                        value={form.payment_method}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-4 py-2"
                    >
                        <option value="cash">Наличные</option>
                        <option value="credit_card">Карта</option>
                    </select>

                    {error && (
                        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded">
                            Ошибка при создании транзакции
                        </div>
                    )}

                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            className={BUTTON.default}
                            disabled={loading}
                        >
                            Создать
                        </button>

                        <Link
                            to="/admin/transactions"
                            className={BUTTON.transparent}
                        >
                            Отмена
                        </Link>
                    </div>
                </form>
            </section>
        </AdminLayout>
    );
}
