import React from "react";
import type {UpdateUserSchema} from "@/types/admin";
import {FormStyles} from "@/styles/Form";
import {useCountriesList} from "@/hooks/usePublic";
import {useCitiesList} from "@/hooks/usePublic";


export default function UpdateUserForm({
    submitHandler
}: {
    submitHandler: (form: UpdateUserSchema) => void;
}): React.ReactElement {
    const [form, setForm] = React.useState<UpdateUserSchema>({
        password: "",
        first_name: "",
        last_name: "",
        email: "",
        tel_number: "",
        country_id: 1,
        city_id: -1,
        role: "client",
    });

    const {data: countries, loading: countries_loading, error: countries_error} = useCountriesList();
    const {data: cities, loading: cities_loading, error: cities_error} = useCitiesList(Number(form.country_id));

    if (countries_loading || cities_loading) {
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

    function handleRoleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setForm((prev) => (
            { ...prev, [e.target.name]: e.target.value }
        ));
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
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
                Оновлення користувача
            </h1>

            <form
                onSubmit={handleSubmit}
                className={FormStyles.SMALL_CONTAINER}
            >

                <div
                    className={FormStyles.SMALL_CONTAINER}
                >
                    <label
                        htmlFor='email'
                        className={FormStyles.DEFAULT}
                    >
                        Електронна пошта:
                    </label>
                    <input
                        type='text'
                        id='email'
                        name='email'
                        value={form.email}
                        placeholder='email@mail.com'
                        onChange={handleChange}
                        className={FormStyles.INPUT}
                    />
                </div>

                <div
                    className={FormStyles.SMALL_CONTAINER}
                >
                    <label
                        htmlFor='tel_number'
                        className={FormStyles.DEFAULT}
                    >
                        Номер телефону:
                    </label>
                    <input
                        type='text'
                        id='tel_number'
                        name='tel_number'
                        value={form.tel_number}
                        placeholder='+38ХХХХХХХХХХ'
                        onChange={handleChange}
                        className={FormStyles.INPUT}
                    />
                </div>

                <div
                    className={FormStyles.SMALL_CONTAINER}
                >
                    <label
                        htmlFor='first_name'
                        className={FormStyles.DEFAULT}
                    >
                        Ім'я та прізвище:
                    </label>
                    <div className='flex gap-2'>
                        <input
                            type='text'
                            id='first_name'
                            name='first_name'
                            value={form.first_name}
                            placeholder='Ivan'
                            onChange={handleChange}
                            className={FormStyles.INPUT}
                        />
                        <input
                            type='text'
                            id='last_name'
                            name='last_name'
                            value={form.last_name}
                            placeholder='Durov'
                            onChange={handleChange}
                            className={FormStyles.INPUT}
                        />
                    </div>
                </div>

                <div
                    className={FormStyles.SMALL_CONTAINER}
                >
                    <label
                        htmlFor='country'
                        className={FormStyles.DEFAULT}
                    >
                        Місце проживання:
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
                        htmlFor='password'
                        className={FormStyles.DEFAULT}
                    >
                        Пароль:
                    </label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        value={form.password}
                        placeholder='Password'
                        onChange={handleChange}
                        className={FormStyles.INPUT}
                    />
                </div>

                <div
                    className={FormStyles.SMALL_CONTAINER}
                >
                    <label
                        htmlFor='role'
                        className={FormStyles.DEFAULT}
                    >
                        Роль:
                    </label>
                    <select
                        id='role'
                        name='role'
                        value={form.role}
                        onChange={handleRoleChange}
                        className={FormStyles.INPUT}
                    >
                        <option value='admin'>Адміністратор</option>
                        <option value='driver'>Водій</option>
                        <option value='client'>Клієнт</option>
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