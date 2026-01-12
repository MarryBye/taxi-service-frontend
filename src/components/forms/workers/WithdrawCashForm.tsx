import React from "react";
import type { WithdrawCashSchema } from "@/types/workers";

import { styleSheet } from "@/styles/Form";

export default function WithdrawCashForm({
                                             submitHandler,
                                         }: {
    submitHandler: (form: WithdrawCashSchema) => void;
}): React.ReactElement {

    const [form, setForm] = React.useState<WithdrawCashSchema>({
        amount: 100,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        submitHandler({
            amount: Number(form.amount),
        });
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;

        setForm({
            amount: Number(value),
        });
    }

    return (
        <div className={styleSheet.containerStyles.CARD}>
            <h1 className={styleSheet.textStyles.H2}>
                Вивід коштів
            </h1>

            <form
                onSubmit={handleSubmit}
                className={styleSheet.containerStyles.SMALL_CONTAINER}
            >
                <div className={styleSheet.containerStyles.SMALL_CONTAINER}>
                    <label className={styleSheet.textStyles.DEFAULT}>
                        Сума (грн):
                    </label>

                    <input
                        type="number"
                        min={100}
                        step={1}
                        value={form.amount}
                        onChange={handleChange}
                        className={styleSheet.inputStyles.INPUT}
                        required
                    />

                    <p className={styleSheet.textStyles.MUTED}>
                        Мінімальна сума для виводу — 100 грн
                    </p>
                </div>

                <button
                    type="submit"
                    className={styleSheet.inputStyles.BUTTON_PRIMARY}
                >
                    Вивести
                </button>
            </form>
        </div>
    );
}
