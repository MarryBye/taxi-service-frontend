import React from "react";
import type { CreateMaintenanceSchema } from "@/types/admin";

import { styleSheet } from "@/styles/Form";
import { useCarsList } from "@/hooks/useAdmin";

export default function CreateMaintenanceForm({
                                                  submitHandler
                                              }: {
    submitHandler: (form: CreateMaintenanceSchema) => void;
}): React.ReactElement {

    const [form, setForm] = React.useState<CreateMaintenanceSchema>({
        car_id: -1,
        description: "",
        cost: 100,
        status: "diagnosis",
        maintenance_start: "",
        maintenance_end: ""
    });

    const { data: cars, loading: cars_loading } = useCarsList();

    if (cars_loading) {
        return (
            <div className={styleSheet.otherStyles.LOADER} />
        );
    }

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
                Створення обслуговування
            </h1>

            <form
                onSubmit={handleSubmit}
                className={styleSheet.containerStyles.SMALL_CONTAINER}
            >

                <div className={styleSheet.containerStyles.SMALL_CONTAINER}>
                    <label className={styleSheet.textStyles.DEFAULT}>
                        Автомобіль:
                    </label>

                    <select
                        name="car_id"
                        value={form.car_id}
                        onChange={handleChange}
                        className={styleSheet.inputStyles.SELECT}
                    >
                        {cars?.map(car => (
                            <option key={car.id} value={car.id}>
                                {car.mark} {car.model} ({car.number_plate})
                            </option>
                        ))}
                    </select>
                </div>

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

                <div className={styleSheet.containerStyles.SMALL_CONTAINER}>
                    <label className={styleSheet.textStyles.DEFAULT}>
                        Опис:
                    </label>

                    <textarea
                        name="description"
                        value={form.description}
                        placeholder="Опис щодо ремонту..."
                        onChange={handleChange}
                        className={styleSheet.inputStyles.TEXTAREA}
                    />
                </div>

                <div className={styleSheet.containerStyles.SMALL_CONTAINER}>
                    <label className={styleSheet.textStyles.DEFAULT}>
                        Вартість ремонту:
                    </label>

                    <input
                        type="number"
                        name="cost"
                        min="0"
                        value={form.cost}
                        placeholder="1000"
                        onChange={handleChange}
                        className={styleSheet.inputStyles.INPUT}
                    />
                </div>

                <div className={styleSheet.containerStyles.SMALL_CONTAINER}>
                    <label className={styleSheet.textStyles.DEFAULT}>
                        Дата початку та кінця:
                    </label>

                    <div className="flex flex-row gap-2 items-center">
                        <input
                            type="date"
                            name="maintenance_start"
                            value={form.maintenance_start}
                            onChange={handleChange}
                            className={styleSheet.inputStyles.INPUT}
                        />
                        -
                        <input
                            type="date"
                            name="maintenance_end"
                            value={form.maintenance_end}
                            onChange={handleChange}
                            className={styleSheet.inputStyles.INPUT}
                        />
                    </div>
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
