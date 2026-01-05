import React from "react";
import type { MakeOrderSchema } from "@/types/authorized";
import { FormStyles } from "@/styles/Form";
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
            <div className={FormStyles.LOADER}></div>
        )
    }

    /* -------------------- handlers -------------------- */

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        submitHandler(form);
    }

    function handleRootChange(
        e: React.ChangeEvent<HTMLSelectElement>
    ) {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleAddressChange(
        index: number,
        field: "street" | "house",
        value: string
    ) {
        setForm((prev) => ({
            ...prev,
            addresses: prev.addresses.map((addr, i) =>
                i === index ? { ...addr, [field]: value } : addr
            ),
        }));
    }

    function addAddress() {
        setForm((prev) => ({
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
        setForm((prev) => ({
            ...prev,
            addresses: prev.addresses.filter((_, i) => i !== index),
        }));
    }

    /* -------------------- UI -------------------- */

    return (
        <div className={FormStyles.CARD}>
            <h1 className={FormStyles.H2}>Зробити замовлення</h1>

            <form
                onSubmit={handleSubmit}
                className={FormStyles.SMALL_CONTAINER}
            >
                {/* Order class */}
                <div className={FormStyles.SMALL_CONTAINER}>
                    <label className={FormStyles.DEFAULT}>
                        Бажаний клас автомобіля:
                    </label>
                    <select
                        name="order_class"
                        value={form.order_class}
                        onChange={handleRootChange}
                        className={FormStyles.INPUT}
                    >
                        <option value="standard">Standard</option>
                        <option value="comfort">Comfort</option>
                        <option value="business">Business</option>
                    </select>
                </div>

                {/* Payment method */}
                <div className={FormStyles.SMALL_CONTAINER}>
                    <label className={FormStyles.DEFAULT}>
                        Метод оплати:
                    </label>
                    <select
                        name="payment_method"
                        value={form.payment_method}
                        onChange={handleRootChange}
                        className={FormStyles.INPUT}
                    >
                        <option value="credit_card">Картка</option>
                        <option value="cash">Готівка</option>
                    </select>
                </div>

                {/* Addresses */}
                <div className={FormStyles.SMALL_CONTAINER}>
                    <label className={FormStyles.DEFAULT}>
                        Список адрес:
                    </label>

                    <div className="flex flex-col gap-4">
                        {form.addresses.map((address, index) => (
                            <div
                                key={index}
                                className="rounded-lg border border-gray-200 p-3 flex flex-col gap-2"
                            >
                                <div className="text-sm text-gray-600">
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
                                    className={FormStyles.INPUT}
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
                                    className={FormStyles.INPUT}
                                />

                                {form.addresses.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeAddress(index)
                                        }
                                        className={FormStyles.BUTTON_SECONDARY}
                                    >
                                        Видалити адресу
                                    </button>
                                )}
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addAddress}
                            className={FormStyles.BUTTON_SECONDARY}
                        >
                            + Додати адресу
                        </button>
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className={FormStyles.BUTTON_PRIMARY}
                >
                    Зробити замовлення
                </button>
            </form>
        </div>
    );
}
