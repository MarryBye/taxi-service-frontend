import React from "react";
import type {CreateTransactionSchema} from "@/types/admin";
import {FormStyles} from "@/styles/Form";
import {useCountriesList} from "@/hooks/usePublic";
import {useCitiesList} from "@/hooks/usePublic";
import {useUsersList} from "@/hooks/useAdmin";


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

    const {data: users, loading: users_loading, error: users_error} = useUsersList();

    if (users_loading) {
        return (
            <div
                className={FormStyles.LOADER}>
            </div>
        )
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

        console.log("Form changed!")
        console.table(form);
    }

    return (
        <div
            className={FormStyles.CARD}
        >
            <h1
                className={FormStyles.H2}
            >
                Створення транзакції
            </h1>

            <form
                onSubmit={handleSubmit}
                className={FormStyles.SMALL_CONTAINER}
            >
                <div
                    className={FormStyles.SMALL_CONTAINER}
                >
                    <label
                        htmlFor='user_id'
                        className={FormStyles.DEFAULT}
                    >
                        Користувач:
                    </label>
                    <select
                        id='user_id'
                        name='user_id'
                        value={form.user_id}
                        onChange={handleChange}
                        className={FormStyles.INPUT}
                    >
                        {
                            users?.map((user) => (
                                <option key={user.id} value={user.id}>{user.first_name} {user.last_name} ({user.id})</option>
                            ))
                        }
                    </select>
                </div>

                <div
                    className={FormStyles.SMALL_CONTAINER}
                >
                    <label
                        htmlFor='balance_type'
                        className={FormStyles.DEFAULT}
                    >
                        Тип балансу:
                    </label>
                    <select
                        id='balance_type'
                        name='balance_type'
                        value={form.balance_type}
                        onChange={handleChange}
                        className={FormStyles.INPUT}
                    >
                        <option value='payment'>Для оплат</option>
                        <option value='earning'>Для виводу</option>
                    </select>
                </div>

                <div
                    className={FormStyles.SMALL_CONTAINER}
                >
                    <label
                        htmlFor='transaction_type'
                        className={FormStyles.DEFAULT}
                    >
                        Тип транзакції:
                    </label>
                    <select
                        id='transaction_type'
                        name='transaction_type'
                        value={form.transaction_type}
                        onChange={handleChange}
                        className={FormStyles.INPUT}
                    >
                        <option value='debit'>Поповнення</option>
                        <option value='credit'>Витрата</option>
                        <option value='refund'>Повернення коштів</option>
                        <option value='penalty'>Штраф</option>
                    </select>
                </div>

                <div
                    className={FormStyles.SMALL_CONTAINER}
                >
                    <label
                        htmlFor='payment_method'
                        className={FormStyles.DEFAULT}
                    >
                        Спосіб отримання:
                    </label>
                    <select
                        id='payment_method'
                        name='payment_method'
                        value={form.payment_method}
                        onChange={handleChange}
                        className={FormStyles.INPUT}
                    >
                        <option value='credit_card'>Банківська картка</option>
                        <option value='cash'>Налічні гроші</option>
                    </select>
                </div>

                <div
                    className={FormStyles.SMALL_CONTAINER}
                >
                    <label
                        htmlFor='amount'
                        className={FormStyles.DEFAULT}
                    >
                        Сума:
                    </label>
                    <input
                        type='number'
                        id='amount'
                        name='amount'
                        min='0'
                        value={form.amount}
                        onChange={handleChange}
                        className={FormStyles.INPUT}
                    />
                </div>

                <button
                    type='submit'
                    className={FormStyles.BUTTON_PRIMARY}
                >
                    Створити
                </button>
            </form>

        </div>
    )
}