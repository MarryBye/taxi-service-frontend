import React from "react";
import type {UpdateMaintenanceSchema} from "@/types/admin";
import {FormStyles} from "@/styles/Form";


export default function UpdateMaintenanceForm({
    submitHandler
}: {
    submitHandler: (form: UpdateMaintenanceSchema) => void;
}): React.ReactElement {

    const [form, setForm] = React.useState<UpdateMaintenanceSchema>({
        status: "completed"
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        submitHandler(form);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
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
                Оновлення обслуговування
            </h1>

            <form
                onSubmit={handleSubmit}
                className={FormStyles.SMALL_CONTAINER}
            >

                <div
                    className={FormStyles.SMALL_CONTAINER}
                >
                    <label
                        htmlFor='status'
                        className={FormStyles.DEFAULT}
                    >
                        Статус:
                    </label>
                    <select
                        id='status'
                        name='status'
                        value={form.status}
                        onChange={handleChange}
                        className={FormStyles.INPUT}
                    >
                        <option value='diagnosis'>Діагностика</option>
                        <option value='in_progress'>Ремонт</option>
                        <option value='completed'>Завершено</option>
                    </select>
                </div>

                <button
                    type='submit'
                    className={FormStyles.BUTTON_PRIMARY}
                >
                    Оновити
                </button>
            </form>

        </div>
    )
}