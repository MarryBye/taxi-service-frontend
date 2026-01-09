import React from "react";
import type { CancelOrderSchema } from "@/types/authorized";

import { styleSheet } from "@/styles/Form";

export default function ClientCancelOrderForm({
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
                    <label className={styleSheet.textStyles.DEFAULT}>
                        Коментар:
                    </label>

                    <textarea
                        name="comment"
                        value={form.comment}
                        placeholder="Водій не приїхав на точку, хоча..."
                        onChange={handleCommentChange}
                        className={styleSheet.inputStyles.TEXTAREA}
                    />
                </div>

                <div className={styleSheet.containerStyles.SMALL_CONTAINER}>

                    <p className={styleSheet.containerStyles.ROW}>
                        <input
                            type="checkbox"
                            value="driver_too_far"
                            onChange={handleTagToggle}
                            className={styleSheet.inputStyles.CHECK}
                        />
                        Водій далеко
                    </p>

                    <p className={styleSheet.containerStyles.ROW}>
                        <input
                            type="checkbox"
                            value="long_wait_time"
                            onChange={handleTagToggle}
                            className={styleSheet.inputStyles.CHECK}
                        />
                        Довге очікування
                    </p>

                    <p className={styleSheet.containerStyles.ROW}>
                        <input
                            type="checkbox"
                            value="changed_plans"
                            onChange={handleTagToggle}
                            className={styleSheet.inputStyles.CHECK}
                        />
                        Змінились плани
                    </p>

                    <p className={styleSheet.containerStyles.ROW}>
                        <input
                            type="checkbox"
                            value="wrong_pickup_location"
                            onChange={handleTagToggle}
                            className={styleSheet.inputStyles.CHECK}
                        />
                        Неправильна початкова точка
                    </p>

                    <p className={styleSheet.containerStyles.ROW}>
                        <input
                            type="checkbox"
                            value="found_another_transport"
                            onChange={handleTagToggle}
                            className={styleSheet.inputStyles.CHECK}
                        />
                        Знайдено інший транспорт
                    </p>

                    <p className={styleSheet.containerStyles.ROW}>
                        <input
                            type="checkbox"
                            value="driver_not_responding"
                            onChange={handleTagToggle}
                            className={styleSheet.inputStyles.CHECK}
                        />
                        Водій не відповідає
                    </p>

                    <p className={styleSheet.containerStyles.ROW}>
                        <input
                            type="checkbox"
                            value="price_too_high"
                            onChange={handleTagToggle}
                            className={styleSheet.inputStyles.CHECK}
                        />
                        Занадто висока ціна
                    </p>

                    <p className={styleSheet.containerStyles.ROW}>
                        <input
                            type="checkbox"
                            value="emergency"
                            onChange={handleTagToggle}
                            className={styleSheet.inputStyles.CHECK}
                        />
                        Надзвичайна ситуація
                    </p>

                    <p className={styleSheet.containerStyles.ROW}>
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
