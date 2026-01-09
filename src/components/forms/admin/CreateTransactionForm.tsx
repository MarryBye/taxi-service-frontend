import React from "react";
import type { CreateTransactionSchema } from "@/types/admin";

import { styleSheet } from "@/styles/Form";
import { useUsersList } from "@/hooks/useAdmin";

export default function CreateTransactionForm({
                                                  submitHandler
                                              }: {
    submitHandler: (form: CreateTransactionSchema) => void;
}): React.ReactElement {

    const [form, setForm] = React.useState<CreateTransactionSchema>({
        user_id: -1,
        balance_type: "earning",
        transaction_type: "penalty",
        payment_method: "credit_card",
        amount: 100
    });

    const { data: users, loading: users_loading } = useUsersList();

    if (users_loading) {
        return (
            <div className={styleSheet.otherStyles.LOADER} />
        );
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        submitHandler(form);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <div className={styleSheet.containerStyles.CARD}>
            <h1 className={styleSheet.textStyles.H2}>
                Створення транзакції
            </h1>

            <form
                onSubmit={handleSubmit}
                className={styleSheet.containerStyles.SMALL_CONTAINER}
            >

                <div className={styleSheet.containerStyles.SMALL_CONTAINER}>
                    <label className={styleSheet.textStyles.DEFAULT}>
                        Користувач:
                    </label>

                    <select
                        name="user_id"
                        value={form.user_id}
                        onChange={handleChange}
                        className={styleSheet.inputStyles.SELECT}
                    >
                        {users?.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.first_name} {user.last_name} ({user.id})
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styleSheet.containerStyles.SMALL_CONTAINER}>
                    <label className={styleSheet.textStyles.DEFAULT}>
                        Тип балансу:
                    </label>

                    <select
                        name="balance_type"
                        value={form.balance_type}
                        onChange={handleChange}
                        className={styleSheet.inputStyles.SELECT}
                    >
                        <option value="payment">Для оплат</option>
                        <option value="earning">Для виводу</option>
                    </select>
                </div>

                <div className={styleSheet.containerStyles.SMALL_CONTAINER}>
                    <label className={styleSheet.textStyles.DEFAULT}>
                        Тип транзакції:
                    </label>

                    <select
                        name="transaction_type"
                        value={form.transaction_type}
                        onChange={handleChange}
                        className={styleSheet.inputStyles.SELECT}
                    >
                        <option value="debit">Поповнення</option>
                        <option value="credit">Витрата</option>
                        <option value="refund">Повернення коштів</option>
                        <option value="penalty">Штраф</option>
                    </select>
                </div>

                <div className={styleSheet.containerStyles.SMALL_CONTAINER}>
                    <label className={styleSheet.textStyles.DEFAULT}>
                        Спосіб отримання:
                    </label>

                    <select
                        name="payment_method"
                        value={form.payment_method}
                        onChange={handleChange}
                        className={styleSheet.inputStyles.SELECT}
                    >
                        <option value="credit_card">Банківська картка</option>
                        <option value="cash">Готівка</option>
                    </select>
                </div>

                <div className={styleSheet.containerStyles.SMALL_CONTAINER}>
                    <label className={styleSheet.textStyles.DEFAULT}>
                        Сума:
                    </label>

                    <input
                        type="number"
                        name="amount"
                        min="0"
                        value={form.amount}
                        onChange={handleChange}
                        className={styleSheet.inputStyles.INPUT}
                    />
                </div>

                <button
                    type="submit"
                    className={styleSheet.inputStyles.BUTTON_PRIMARY}
                >
                    Створити
                </button>
            </form>
        </div>
    );
}
