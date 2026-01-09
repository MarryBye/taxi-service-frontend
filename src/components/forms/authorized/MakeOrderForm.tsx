import React from "react";
import type { MakeOrderSchema } from "@/types/authorized";

import { styleSheet } from "@/styles/Form";
import { useAuthStore } from "@/store/auth.store";

type Props = {
    submitHandler: (form: MakeOrderSchema) => void;
};

export default function MakeOrderForm({
                                          submitHandler,
                                      }: Props): React.ReactElement {

    const user = useAuthStore((s) => s.user);

    const [form, setForm] = React.useState<MakeOrderSchema>({
        order_class: "standard",
        payment_method: "credit_card",
        addresses: [
            {
                country: user!.city.country.full_name,
                city: user!.city.name,
                street: "",
                house: "",
            },
            {
                country: user!.city.country.full_name,
                city: user!.city.name,
                street: "",
                house: "",
            },
        ],
    });

    if (!user) {
        return (
            <div className={styleSheet.otherStyles.LOADER} />
        );
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        submitHandler(form);
    }

    function handleRootChange(
        e: React.ChangeEvent<HTMLSelectElement>
    ) {
        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleAddressChange(
        index: number,
        field: "street" | "house",
        value: string
    ) {
        setForm(prev => ({
            ...prev,
            addresses: prev.addresses.map((addr, i) =>
                i === index ? { ...addr, [field]: value } : addr
            ),
        }));
    }

    function addAddress() {
        setForm(prev => ({
            ...prev,
            addresses: [
                ...prev.addresses,
                {
                    country: user!.city.country.full_name,
                    city: user!.city.name,
                    street: "",
                    house: "",
                },
            ],
        }));
    }

    function removeAddress(index: number) {
        setForm(prev => ({
            ...prev,
            addresses: prev.addresses.filter((_, i) => i !== index),
        }));
    }

    return (
        <div className={styleSheet.containerStyles.CARD}>
            <h1 className={styleSheet.textStyles.H2}>
                Зробити замовлення
            </h1>

            <form
                onSubmit={handleSubmit}
                className={styleSheet.containerStyles.SMALL_CONTAINER}
            >

                <div className={styleSheet.containerStyles.SMALL_CONTAINER}>
                    <label className={styleSheet.textStyles.DEFAULT}>
                        Бажаний клас автомобіля:
                    </label>

                    <select
                        name="order_class"
                        value={form.order_class}
                        onChange={handleRootChange}
                        className={styleSheet.inputStyles.SELECT}
                    >
                        <option value="standard">Standard</option>
                        <option value="comfort">Comfort</option>
                        <option value="business">Business</option>
                    </select>
                </div>

                <div className={styleSheet.containerStyles.SMALL_CONTAINER}>
                    <label className={styleSheet.textStyles.DEFAULT}>
                        Метод оплати:
                    </label>

                    <select
                        name="payment_method"
                        value={form.payment_method}
                        onChange={handleRootChange}
                        className={styleSheet.inputStyles.SELECT}
                    >
                        <option value="credit_card">Картка</option>
                        <option value="cash">Готівка</option>
                    </select>
                </div>

                <div className={styleSheet.containerStyles.SMALL_CONTAINER}>
                    <label className={styleSheet.textStyles.DEFAULT}>
                        Список адрес:
                    </label>

                    <div className={styleSheet.containerStyles.SMALL_CONTAINER}>
                        {form.addresses.map((address, index) => (
                            <div
                                key={index}
                                className={styleSheet.emphasisStyles.BOX}
                            >
                                <div className={styleSheet.textStyles.SMALL}>
                                    {address.country}, {address.city}
                                </div>

                                <input
                                    type="text"
                                    placeholder="Вулиця"
                                    value={address.street}
                                    onChange={(e) =>
                                        handleAddressChange(
                                            index,
                                            "street",
                                            e.target.value
                                        )
                                    }
                                    className={styleSheet.inputStyles.INPUT}
                                />

                                <input
                                    type="text"
                                    placeholder="Будинок"
                                    value={address.house}
                                    onChange={(e) =>
                                        handleAddressChange(
                                            index,
                                            "house",
                                            e.target.value
                                        )
                                    }
                                    className={styleSheet.inputStyles.INPUT}
                                />

                                {form.addresses.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeAddress(index)}
                                        className={styleSheet.inputStyles.BUTTON_SECONDARY}
                                    >
                                        Видалити адресу
                                    </button>
                                )}
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addAddress}
                            className={styleSheet.inputStyles.BUTTON_SECONDARY}
                        >
                            + Додати адресу
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className={styleSheet.inputStyles.BUTTON_PRIMARY}
                >
                    Зробити замовлення
                </button>
            </form>
        </div>
    );
}
