import React from "react";
import type { RateOrderSchema } from "@/types/authorized";

import { styleSheet } from "@/styles/Form";

export default function ClientRateOrderForm({
                                                submitHandler
                                            }: {
    submitHandler: (form: RateOrderSchema) => void;
}): React.ReactElement {

    const [form, setForm] = React.useState<RateOrderSchema>({
        mark: 5,
        comment: "",
        tags: []
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        submitHandler(form);
        console.log(form);
    }

    function handleMarkChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({
            ...form,
            mark: Number(e.target.value)
        });
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
                Оцінка замовлення
            </h1>

            <form
                onSubmit={handleSubmit}
                className={styleSheet.containerStyles.SMALL_CONTAINER}
            >

                <div className={styleSheet.containerStyles.SMALL_CONTAINER}>
                    <label className={styleSheet.textStyles.DEFAULT}>
                        Оцінка:
                    </label>

                    <input
                        type="number"
                        name="mark"
                        min="0"
                        max="5"
                        value={form.mark}
                        placeholder="5"
                        onChange={handleMarkChange}
                        className={styleSheet.inputStyles.INPUT}
                    />
                </div>

                <div className={styleSheet.containerStyles.SMALL_CONTAINER}>
                    <label className={styleSheet.textStyles.DEFAULT}>
                        Коментар:
                    </label>

                    <textarea
                        name="comment"
                        value={form.comment}
                        placeholder="Чудова поїздка, водій був..."
                        onChange={handleCommentChange}
                        className={styleSheet.inputStyles.TEXTAREA}
                    />
                </div>

                <div className={styleSheet.containerStyles.SMALL_CONTAINER}>

                    <p className={styleSheet.containerStyles.ROW}>
                        <input
                            type="checkbox"
                            value="accurate"
                            onChange={handleTagToggle}
                            className={styleSheet.inputStyles.CHECK}
                        />
                        Охайний
                    </p>

                    <p className={styleSheet.containerStyles.ROW}>
                        <input
                            type="checkbox"
                            value="fast"
                            onChange={handleTagToggle}
                            className={styleSheet.inputStyles.CHECK}
                        />
                        Швидкий
                    </p>

                    <p className={styleSheet.containerStyles.ROW}>
                        <input
                            type="checkbox"
                            value="friendly"
                            onChange={handleTagToggle}
                            className={styleSheet.inputStyles.CHECK}
                        />
                        Дружній
                    </p>

                    <p className={styleSheet.containerStyles.ROW}>
                        <input
                            type="checkbox"
                            value="clean"
                            onChange={handleTagToggle}
                            className={styleSheet.inputStyles.CHECK}
                        />
                        Чистота
                    </p>

                    <p className={styleSheet.containerStyles.ROW}>
                        <input
                            type="checkbox"
                            value="modern_car"
                            onChange={handleTagToggle}
                            className={styleSheet.inputStyles.CHECK}
                        />
                        Сучасна машина
                    </p>

                    <p className={styleSheet.containerStyles.ROW}>
                        <input
                            type="checkbox"
                            value="polite"
                            onChange={handleTagToggle}
                            className={styleSheet.inputStyles.CHECK}
                        />
                        Ввічливий
                    </p>

                    <p className={styleSheet.containerStyles.ROW}>
                        <input
                            type="checkbox"
                            value="communicative"
                            onChange={handleTagToggle}
                            className={styleSheet.inputStyles.CHECK}
                        />
                        Комунікативний
                    </p>

                    <p className={styleSheet.containerStyles.ROW}>
                        <input
                            type="checkbox"
                            value="helpful"
                            onChange={handleTagToggle}
                            className={styleSheet.inputStyles.CHECK}
                        />
                        Допомагає
                    </p>

                    <p className={styleSheet.containerStyles.ROW}>
                        <input
                            type="checkbox"
                            value="smooth_driving"
                            onChange={handleTagToggle}
                            className={styleSheet.inputStyles.CHECK}
                        />
                        Охайна їзда
                    </p>

                    <p className={styleSheet.containerStyles.ROW}>
                        <input
                            type="checkbox"
                            value="safe_driving"
                            onChange={handleTagToggle}
                            className={styleSheet.inputStyles.CHECK}
                        />
                        Не порушує ПДР
                    </p>

                    <p className={styleSheet.containerStyles.ROW}>
                        <input
                            type="checkbox"
                            value="good_navigation"
                            onChange={handleTagToggle}
                            className={styleSheet.inputStyles.CHECK}
                        />
                        Гарно орієнтується
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
                    Оцінити
                </button>
            </form>
        </div>
    );
}
