import React from "react";
import type { UpdateCarSchema } from "@/types/admin";

import { styleSheet } from "@/styles/Form";
import { useCountriesList, useCitiesList } from "@/hooks/usePublic";
import { useUsersList } from "@/hooks/useAdmin";
import type { CarsView } from "@/types/views";

export default function UpdateCarForm({
                                          submitHandler,
                                          startValues,
                                      }: {
    startValues?: CarsView;
    submitHandler: (form: UpdateCarSchema) => void;
}): React.ReactElement {

    const [form, setForm] = React.useState<UpdateCarSchema>({
        mark: startValues?.mark ?? "",
        model: startValues?.model ?? "",
        number_plate: startValues?.number_plate ?? "",
        country_id: startValues?.city.country.id ?? 1,
        city_id: startValues?.city.id ?? 1,
        color: startValues?.color ?? "black",
        car_class: startValues?.car_class ?? "standard",
        car_status: startValues?.car_status ?? "available",
        driver_id: startValues?.driver?.id ?? null, // ✅ null если нет водителя
    });

    const { data: users, loading: usersLoading } = useUsersList();
    const { data: countries, loading: countriesLoading } = useCountriesList();
    const { data: cities, loading: citiesLoading } = useCitiesList(Number(form.country_id));

    if (usersLoading || countriesLoading || citiesLoading) {
        return <div className={styleSheet.otherStyles.LOADER} />;
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        submitHandler(form);
    }

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]:
                name === "driver_id"
                    ? value === "" ? null : Number(value) // ✅ "" → null
                    : value,
        }));
    }

    function selectCountry(e: React.ChangeEvent<HTMLSelectElement>) {
        setForm(prev => ({
            ...prev,
            country_id: Number(e.target.value),
            city_id: -1,
        }));
    }

    function selectCity(e: React.ChangeEvent<HTMLSelectElement>) {
        setForm(prev => ({
            ...prev,
            city_id: Number(e.target.value),
        }));
    }

    return (
        <div className={styleSheet.containerStyles.CARD}>
            <h1 className={styleSheet.textStyles.H2}>
                Оновлення автомобіля
            </h1>

            <form
                onSubmit={handleSubmit}
                className={styleSheet.containerStyles.SMALL_CONTAINER}
            >

                {/* Марка / модель / номер */}
                <div className={styleSheet.containerStyles.SMALL_CONTAINER}>
                    <label className={styleSheet.textStyles.DEFAULT}>
                        Марка, модель, номер:
                    </label>

                    <div className="flex gap-2">
                        <input
                            type="text"
                            name="mark"
                            value={form.mark}
                            placeholder="BMW"
                            onChange={handleChange}
                            className={styleSheet.inputStyles.INPUT}
                        />
                        <input
                            type="text"
                            name="model"
                            value={form.model}
                            placeholder="X5"
                            onChange={handleChange}
                            className={styleSheet.inputStyles.INPUT}
                        />
                        <input
                            type="text"
                            name="number_plate"
                            value={form.number_plate}
                            placeholder="ВН5667ВТ"
                            onChange={handleChange}
                            className={styleSheet.inputStyles.INPUT}
                        />
                    </div>
                </div>

                {/* Колір */}
                <div className={styleSheet.containerStyles.SMALL_CONTAINER}>
                    <label className={styleSheet.textStyles.DEFAULT}>
                        Колір:
                    </label>

                    <select
                        name="color"
                        value={form.color}
                        onChange={handleChange}
                        className={styleSheet.inputStyles.SELECT}
                    >
                        <option value="red">Червоний</option>
                        <option value="blue">Синій</option>
                        <option value="green">Зелений</option>
                        <option value="black">Чорний</option>
                        <option value="white">Білий</option>
                        <option value="gray">Сірий</option>
                        <option value="silver">Сріблястий</option>
                    </select>
                </div>

                {/* Водій */}
                <div className={styleSheet.containerStyles.SMALL_CONTAINER}>
                    <label className={styleSheet.textStyles.DEFAULT}>
                        Водій:
                    </label>

                    <select
                        name="driver_id"
                        value={form.driver_id ?? ""}
                        onChange={handleChange}
                        className={styleSheet.inputStyles.SELECT}
                    >
                        <option value="">— Без водія —</option> {/* ✅ очистка */}
                        {users?.map(user => (
                            user.role === 'driver' &&
                            (<option key={user.id} value={user.id}>
                                {user.first_name} {user.last_name} ({user.id})
                            </option>)
                        ))}
                    </select>
                </div>

                {/* Локація */}
                <div className={styleSheet.containerStyles.SMALL_CONTAINER}>
                    <label className={styleSheet.textStyles.DEFAULT}>
                        Місцезнаходження:
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

                {/* Клас / статус */}
                <div className={styleSheet.containerStyles.SMALL_CONTAINER}>
                    <label className={styleSheet.textStyles.DEFAULT}>
                        Клас та статус:
                    </label>

                    <div className="flex gap-2">
                        <select
                            name="car_class"
                            value={form.car_class}
                            onChange={handleChange}
                            className={styleSheet.inputStyles.SELECT}
                        >
                            <option value="standard">Стандарт</option>
                            <option value="comfort">Комфорт</option>
                            <option value="business">Бізнес</option>
                        </select>

                        <select
                            name="car_status"
                            value={form.car_status}
                            onChange={handleChange}
                            className={styleSheet.inputStyles.SELECT}
                        >
                            <option value="available">Доступна</option>
                            <option value="on_maintenance">На обслуговуванні</option>
                            <option value="busy">Зайнята</option>
                            <option value="not_working">Не працює</option>
                        </select>
                    </div>
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
