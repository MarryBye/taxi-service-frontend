import React from "react";
import type {CreateCarSchema} from "@/types/admin";
import {FormStyles} from "@/styles/Form";
import {useCountriesList} from "@/hooks/usePublic";
import {useCitiesList} from "@/hooks/usePublic";
import {useUsersList} from "@/hooks/useAdmin";


export default function CreateCarForm({
    submitHandler
}: {
    submitHandler: (form: CreateCarSchema) => void;
}): React.ReactElement {

    const [form, setForm] = React.useState<CreateCarSchema>({
        mark: "",
        model: "",
        number_plate: "",
        country_id: 1,
        city_id: -1,
        color: "black",
        car_class: "standard",
        car_status: "available",
        driver_id: -1
    });

    const {data: users, loading: users_loading, error: users_error} = useUsersList();
    const {data: countries, loading: countries_loading, error: countries_error} = useCountriesList();
    const {data: cities, loading: cities_loading, error: cities_error} = useCitiesList(Number(form.country_id));

    if (countries_loading || cities_loading || users_loading) {
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

    function selectCountry(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault();
        setForm((prev) => ({
            ...prev,
            country_id: Number(e.target.value),
            city_id: -1
        }))

        console.log("Form changed!")
        console.table(form);
    }

    function selectCity(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault();
        setForm((prev) => ({
            ...prev,
            city_id: Number(e.target.value)
        }))

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
                Створення автомобіля
            </h1>

            <form
                onSubmit={handleSubmit}
                className={FormStyles.SMALL_CONTAINER}
            >
                <div
                    className={FormStyles.SMALL_CONTAINER}
                >
                    <label
                        htmlFor='mark'
                        className={FormStyles.DEFAULT}
                    >
                        Марка, модель, номер:
                    </label>
                    <div className='flex gap-2'>
                        <input
                            type='text'
                            id='mark'
                            name='mark'
                            value={form.mark}
                            placeholder='BMW'
                            onChange={handleChange}
                            className={FormStyles.INPUT}
                        />
                        <input
                            type='text'
                            id='model'
                            name='model'
                            value={form.model}
                            placeholder='X5'
                            onChange={handleChange}
                            className={FormStyles.INPUT}
                        />
                        <input
                            type='text'
                            id='number_plate'
                            name='number_plate'
                            value={form.number_plate}
                            placeholder='ВН5667ВТ'
                            onChange={handleChange}
                            className={FormStyles.INPUT}
                        />
                    </div>
                </div>

                <div
                    className={FormStyles.SMALL_CONTAINER}
                >
                    <label
                        htmlFor='color'
                        className={FormStyles.DEFAULT}
                    >
                        Колір:
                    </label>
                    <select
                        id='color'
                        name='color'
                        value={form.color}
                        onChange={handleChange}
                        className={FormStyles.INPUT}
                    >
                        <option value='red'>Червоний</option>
                        <option value='blue'>Синій</option>
                        <option value='green'>Зелений</option>
                        <option value='black'>Блакитний</option>
                        <option value='white'>Білий</option>
                        <option value='yellow'>Жовтий</option>
                        <option value='orange'>Помаранчевий</option>
                        <option value='purple'>Фіолетовий</option>
                        <option value='brown'>Коричневий</option>
                        <option value='pink'>Рожевий</option>
                        <option value='gray'>Сірий</option>
                        <option value='silver'>Серебристий</option>
                        <option value='gold'>Золотий</option>
                    </select>
                </div>

                <div
                    className={FormStyles.SMALL_CONTAINER}
                >
                    <label
                        htmlFor='driver_id'
                        className={FormStyles.DEFAULT}
                    >
                        Водій:
                    </label>
                    <select
                        id='driver_id'
                        name='driver_id'
                        value={form.driver_id}
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
                        htmlFor='country'
                        className={FormStyles.DEFAULT}
                    >
                        Місцезнаходження:
                    </label>
                    <div className='flex gap-2'>
                        <select
                            id='country'
                            name='country'
                            value={form.country_id}
                            onChange={selectCountry}
                            className={FormStyles.INPUT}
                        >
                            {
                                countries!.map((country) => (
                                    <option
                                        key={country.id}
                                        value={country.id}
                                    >
                                        {country.full_name}
                                    </option>
                                ))
                            }
                        </select>
                        <select
                            id='city'
                            name='city'
                            value={form.city_id}
                            onChange={selectCity}
                            className={FormStyles.INPUT}
                        >
                            {
                                cities!.map((city) => (
                                    <option
                                        key={city.id}
                                        value={city.id}
                                    >
                                        {city.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                <div
                    className={FormStyles.SMALL_CONTAINER}
                >
                    <label
                        htmlFor='car_class'
                        className={FormStyles.DEFAULT}
                    >
                        Клас та статус:
                    </label>
                    <div className='flex gap-2'>
                        <select
                            id='car_class'
                            name='car_class'
                            value={form.car_class}
                            onChange={handleChange}
                            className={FormStyles.INPUT}
                        >
                            <option value='standard'>Стандарт</option>
                            <option value='comfort'>Комфорт</option>
                            <option value='business'>Бізнес</option>
                        </select>
                        <select
                            id='car_status'
                            name='car_status'
                            value={form.car_status}
                            onChange={handleChange}
                            className={FormStyles.INPUT}
                        >
                            <option value='available'>Доступна</option>
                            <option value='on_maintenance'>На обслуговуванні</option>
                            <option value='busy'>Зайнята</option>
                            <option value='not_working'>Не працює</option>
                        </select>
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