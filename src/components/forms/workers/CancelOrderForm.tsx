import React from "react";
import type { CancelOrderSchema } from "@/types/workers";

import { styleSheet } from "@/styles/Form";

export default function WorkerCancelOrderForm({
                                                  submitHandler
                                              }: {
    submitHandler: (form: CancelOrderSchema) => void;
}): React.ReactElement {

    const [form, setForm] = React.useState<CancelOrderSchema>({
        comment: "",
        tags: []
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        submitHandler(form);
    }

    function handleCommentChange(
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) {
        setForm(prev => ({
            ...prev,
            comment: e.target.value,
        }));
    }

    function handleTagToggle(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const tag = e.target.value;
        const checked = e.target.checked;

        // @ts-ignore
        setForm(prev => ({
            ...prev,
            tags: checked
                ? [...prev.tags, tag]
                : prev.tags.filter(t => t !== tag),
        }));
    }

    return (
        <div className={styleSheet.containerStyles.CARD}>
            <h1 className={styleSheet.textStyles.H2}>
                Скасування замовлення
            </h1>

            <form
                onSubmit={handleSubmit}
                className={styleSheet.containerStyles.SMALL_CONTAINER}
            >
                <div className={styleSheet.containerStyles.SMALL_CONTAINER}>
                    <label
                        htmlFor="comment"
                        className={styleSheet.textStyles.DEFAULT}
                    >
                        Коментар:
                    </label>

                    <textarea
                        id="comment"
                        name="comment"
                        value={form.comment}
                        placeholder="Клієнта не було на точці, хоча..."
                        onChange={handleCommentChange}
                        className={styleSheet.inputStyles.TEXTAREA}
                    />
                </div>

                <div className={styleSheet.containerStyles.SMALL_CONTAINER}>
                    <p className="flex flex-row gap-2 items-center">
                        <input
                            type="checkbox"
                            value="client_not_responding"
                            onChange={handleTagToggle}
                            className={styleSheet.inputStyles.CHECK}
                        />
                        Клієнт не відповідає
                    </p>

                    <p className="flex flex-row gap-2 items-center">
                        <input
                            type="checkbox"
                            value="client_not_at_pickup_point"
                            onChange={handleTagToggle}
                            className={styleSheet.inputStyles.CHECK}
                        />
                        Клієнт не на точці підбору
                    </p>

                    <p className="flex flex-row gap-2 items-center">
                        <input
                            type="checkbox"
                            value="vehicle_breakdown"
                            onChange={handleTagToggle}
                            className={styleSheet.inputStyles.CHECK}
                        />
                        Поломка автомобіля
                    </p>

                    <p className="flex flex-row gap-2 items-center">
                        <input
                            type="checkbox"
                            value="traffic_accident"
                            onChange={handleTagToggle}
                            className={styleSheet.inputStyles.CHECK}
                        />
                        ДТП
                    </p>

                    <p className="flex flex-row gap-2 items-center">
                        <input
                            type="checkbox"
                            value="unsafe_pickup_location"
                            onChange={handleTagToggle}
                            className={styleSheet.inputStyles.CHECK}
                        />
                        Небезпечна точка
                    </p>

                    <p className="flex flex-row gap-2 items-center">
                        <input
                            type="checkbox"
                            value="route_unreachable"
                            onChange={handleTagToggle}
                            className={styleSheet.inputStyles.CHECK}
                        />
                        Неможливо дістатися
                    </p>

                    <p className="flex flex-row gap-2 items-center">
                        <input
                            type="checkbox"
                            value="emergency"
                            onChange={handleTagToggle}
                            className={styleSheet.inputStyles.CHECK}
                        />
                        Надзвичайна ситуація
                    </p>

                    <p className="flex flex-row gap-2 items-center">
                        <input
                            type="checkbox"
                            value="other"
                            onChange={handleTagToggle}
                            className={styleSheet.inputStyles.CHECK}
                        />
                        Інше
                    </p>
                </div>

                <button
                    type="submit"
                    className={styleSheet.inputStyles.BUTTON_PRIMARY}
                >
                    Скасувати
                </button>
            </form>
        </div>
    );
}
