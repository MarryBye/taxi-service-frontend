import React from "react";
import type {AddFunds} from "@/types/authorized";

import {styleSheet} from "@/styles/Form";

export default function AddFundsForm({
                                         submitHandler,
                                     }: {
    submitHandler: (form: AddFunds) => void;
}): React.ReactElement {

    const [form, setForm] = React.useState<AddFunds>({
        amount: 100,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        submitHandler({
            amount: Number(form.amount),
        });
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const {value} = e.target;

        setForm({
            amount: Number(value),
        });
    }

    return (
        <div className={styleSheet.containerStyles.CARD}>
            <h1 className={styleSheet.textStyles.H2}>
                Поповнення рахунку
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
                        min={1}
                        step={1}
                        value={form.amount}
                        onChange={handleChange}
                        className={styleSheet.inputStyles.INPUT}
                    />
                </div>

                <button
                    type="submit"
                    className={styleSheet.inputStyles.BUTTON_PRIMARY}
                >
                    Поповнити
                </button>
            </form>
        </div>
    );
}
