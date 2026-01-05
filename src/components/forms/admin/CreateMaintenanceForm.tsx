import React from "react";
import type {CreateMaintenanceSchema} from "@/types/admin";
import {FormStyles} from "@/styles/Form";
import {useCarsList} from "@/hooks/useAdmin";


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

    const {data: cars, loading: cars_loading, error: cars_error} = useCarsList();

    if (cars_loading) {
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
                Створення обслуговування
            </h1>

            <form
                onSubmit={handleSubmit}
                className={FormStyles.SMALL_CONTAINER}
            >
                <div
                    className={FormStyles.SMALL_CONTAINER}
                >
                    <label
                        htmlFor='car_id'
                        className={FormStyles.DEFAULT}
                    >
                        Автомобіль:
                    </label>
                    <select
                        id='car_id'
                        name='car_id'
                        value={form.car_id}
                        onChange={handleChange}
                        className={FormStyles.INPUT}
                    >
                        {
                            cars?.map((car) => (
                                <option key={car.id} value={car.id}>{car.mark} {car.model} ({car.number_plate})</option>
                            ))
                        }
                    </select>
                </div>

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

                <div
                    className={FormStyles.SMALL_CONTAINER}
                >
                    <label
                        htmlFor='description'
                        className={FormStyles.DEFAULT}
                    >
                        Опис:
                    </label>
                    <textarea
                        id='description'
                        name='description'
                        value={form.description}
                        placeholder='Опис щодо ремонту...'
                        onChange={handleChange}
                        className={FormStyles.TEXTAREA}
                    />
                </div>

                <div
                    className={FormStyles.SMALL_CONTAINER}
                >
                    <label
                        htmlFor='cost'
                        className={FormStyles.DEFAULT}
                    >
                        Вартість ремонту:
                    </label>
                    <input
                        type='number'
                        id='cost'
                        name='cost'
                        min='0'
                        value={form.cost}
                        placeholder='1000'
                        onChange={handleChange}
                        className={FormStyles.INPUT}
                    />
                </div>

                <div
                    className={FormStyles.SMALL_CONTAINER}
                >
                    <label
                        htmlFor='maintenance_start'
                        className={FormStyles.DEFAULT}
                    >
                        Дата початку та кінця:
                    </label>
                    <div className='flex flex-row gap-2 items-center'>
                        <input
                            type='date'
                            id='maintenance_start'
                            name='maintenance_start'
                            value={form.maintenance_start}
                            onChange={handleChange}
                            className={FormStyles.INPUT}
                        />
                        -
                        <input
                            type='date'
                            id='maintenance_end'
                            name='maintenance_end'
                            value={form.maintenance_end}
                            placeholder='1000'
                            onChange={handleChange}
                            className={FormStyles.INPUT}
                        />
                    </div>
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