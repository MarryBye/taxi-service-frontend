import React from "react";
import type { UpdateProfile } from "@/types/authorized";

import { styleSheet } from "@/styles/Form";
import { useCountriesList } from "@/hooks/usePublic";
import { useCitiesList } from "@/hooks/usePublic";
import { useAuthStore } from "@/store/auth.store";

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

    const { data: countries, loading: countries_loading } = useCountriesList();
    const { data: cities, loading: cities_loading } = useCitiesList(Number(form.country_id));

    if (countries_loading || cities_loading || !user) {
        return (
            <div className={styleSheet.otherStyles.LOADER}></div>
        );
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
    }

    function selectCountry(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault();
        setForm(prev => ({
            ...prev,
            country_id: Number(e.target.value),
            city_id: -1
        }));
    }

    function selectCity(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault();
        setForm(prev => ({
            ...prev,
            city_id: Number(e.target.value)
        }));
    }

    return (
        <div className={styleSheet.containerStyles.CARD}>
            <h1 className={styleSheet.textStyles.H2}>
                Оновлення профілю
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
