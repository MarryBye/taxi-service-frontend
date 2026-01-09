import React from "react";
import type { UpdateMaintenanceSchema } from "@/types/admin";

import { styleSheet } from "@/styles/Form";

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

    function handleChange(
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) {
        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <div className={styleSheet.containerStyles.CARD}>
            <h1 className={styleSheet.textStyles.H2}>
                Оновлення обслуговування
            </h1>

            <form
                onSubmit={handleSubmit}
                className={styleSheet.containerStyles.SMALL_CONTAINER}
            >

                <div className={styleSheet.containerStyles.SMALL_CONTAINER}>
                    <label className={styleSheet.textStyles.DEFAULT}>
                        Статус:
                    </label>

                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className={styleSheet.inputStyles.SELECT}
                    >
                        <option value="diagnosis">Діагностика</option>
                        <option value="in_progress">Ремонт</option>
                        <option value="completed">Завершено</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className={styleSheet.inputStyles.BUTTON_PRIMARY}
                >
                    Оновити
                </button>
            </form>
        </div>
    );
}
