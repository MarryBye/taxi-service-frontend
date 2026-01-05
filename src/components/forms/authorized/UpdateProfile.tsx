import React from "react";
import type {UpdateProfile} from "@/types/authorized";
import {FormStyles} from "@/styles/Form";
import {useCountriesList} from "@/hooks/usePublic";
import {useCitiesList} from "@/hooks/usePublic";
import {useAuthStore} from "@/store/auth.store";


export default function UpdateProfileForm({
    submitHandler
}: {
    submitHandler: (form: UpdateProfile) => void;
}): React.ReactElement {
    const user = useAuthStore((s) => s.user);
    const [form, setForm] = React.useState<UpdateProfile>({
        password: "",
        first_name: user!.first_name,
        last_name: user!.last_name,
        email: user!.email,
        tel_number: user!.tel_number,
        country_id: user!.city.country.id,
        city_id: user!.city.id
    });

    const {data: countries, loading: countries_loading, error: countries_error} = useCountriesList();
    const {data: cities, loading: cities_loading, error: cities_error} = useCitiesList(Number(form.country_id));

    if (countries_loading || cities_loading || !user) {
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
                Оновлення профілю
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