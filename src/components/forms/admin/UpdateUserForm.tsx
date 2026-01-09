import React from "react";
import type { UpdateUserSchema } from "@/types/admin";

import { styleSheet } from "@/styles/Form";
import { useCountriesList } from "@/hooks/usePublic";
import { useCitiesList } from "@/hooks/usePublic";

export default function UpdateUserForm({
    startValues,
    submitHandler
}: {
    startValues?: UpdateUserSchema;
    submitHandler: (form: UpdateUserSchema) => void;
}): React.ReactElement {

    const [form, setForm] = React.useState<UpdateUserSchema>({
        password: "",
        first_name: startValues ? startValues.first_name : "",
        last_name: startValues ? startValues.last_name : "",
        email: startValues ? startValues.email : "",
        tel_number: startValues ? startValues.tel_number : "",
        country_id: 1,
        city_id: 1,
        role: startValues ? startValues.role : "client"
    });

    const { data: countries, loading: countries_loading } = useCountriesList();
    const { data: cities, loading: cities_loading } = useCitiesList(Number(form.country_id));

    if (countries_loading || cities_loading) {
        return (
            <div className={styleSheet.otherStyles.LOADER} />
        );
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        submitHandler(form);
    }

    function handleRoleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    function selectCountry(e: React.ChangeEvent<HTMLSelectElement>) {
        setForm(prev => ({
            ...prev,
            country_id: Number(e.target.value),
            city_id: -1
        }));
    }

    function selectCity(e: React.ChangeEvent<HTMLSelectElement>) {
        setForm(prev => ({
            ...prev,
            city_id: Number(e.target.value)
        }));
    }

    return (
        <div className={styleSheet.containerStyles.CARD}>
            <h1 className={styleSheet.textStyles.H2}>
                Оновлення користувача
            </h1>

            <form
                onSubmit={handleSubmit}
                className={styleSheet.containerStyles.SMALL_CONTAINER}
            >

                <div className={styleSheet.containerStyles.SMALL_CONTAINER}>
                    <label className={styleSheet.textStyles.DEFAULT}>
                        Електронна пошта:
                    </label>

                    <input
                        type="text"
                        name="email"
                        value={form.email}
                        placeholder="email@mail.com"
                        onChange={handleChange}
                        className={styleSheet.inputStyles.INPUT}
                    />
                </div>

                <div className={styleSheet.containerStyles.SMALL_CONTAINER}>
                    <label className={styleSheet.textStyles.DEFAULT}>
                        Номер телефону:
                    </label>

                    <input
                        type="text"
                        name="tel_number"
                        value={form.tel_number}
                        placeholder="+38ХХХХХХХХХХ"
                        onChange={handleChange}
                        className={styleSheet.inputStyles.INPUT}
                    />
                </div>

                <div className={styleSheet.containerStyles.SMALL_CONTAINER}>
                    <label className={styleSheet.textStyles.DEFAULT}>
                        Імʼя та прізвище:
                    </label>

                    <div className="flex gap-2">
                        <input
                            type="text"
                            name="first_name"
                            value={form.first_name}
                            placeholder="Ivan"
                            onChange={handleChange}
                            className={styleSheet.inputStyles.INPUT}
                        />
                        <input
                            type="text"
                            name="last_name"
                            value={form.last_name}
                            placeholder="Durov"
                            onChange={handleChange}
                            className={styleSheet.inputStyles.INPUT}
                        />
                    </div>
                </div>

                <div className={styleSheet.containerStyles.SMALL_CONTAINER}>
                    <label className={styleSheet.textStyles.DEFAULT}>
                        Місце проживання:
                    </label>

                    <div className="flex gap-2">
                        <select
                            value={form.country_id}
                            onChange={selectCountry}
                            className={styleSheet.inputStyles.SELECT}
                        >
                            {countries!.map(country => (
                                <option key={country.id} value={country.id}>
                                    {country.full_name}
                                </option>
                            ))}
                        </select>

                        <select
                            value={form.city_id}
                            onChange={selectCity}
                            className={styleSheet.inputStyles.SELECT}
                        >
                            {cities!.map(city => (
                                <option key={city.id} value={city.id}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className={styleSheet.containerStyles.SMALL_CONTAINER}>
                    <label className={styleSheet.textStyles.DEFAULT}>
                        Пароль:
                    </label>

                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        placeholder="Password"
                        onChange={handleChange}
                        className={styleSheet.inputStyles.INPUT}
                    />
                </div>

                <div className={styleSheet.containerStyles.SMALL_CONTAINER}>
                    <label className={styleSheet.textStyles.DEFAULT}>
                        Роль:
                    </label>

                    <select
                        name="role"
                        value={form.role}
                        onChange={handleRoleChange}
                        className={styleSheet.inputStyles.SELECT}
                    >
                        <option value="admin">Адміністратор</option>
                        <option value="driver">Водій</option>
                        <option value="client">Клієнт</option>
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
