import React from "react";
import type {CancelOrderSchema} from "@/types/authorized";
import {FormStyles} from "@/styles/Form";


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
        <div
            className={FormStyles.CARD}
        >
            <h1
                className={FormStyles.H2}
            >
                Скасування замовлення
            </h1>

            <form
                onSubmit={handleSubmit}
                className={FormStyles.SMALL_CONTAINER}
            >
                <div
                    className={FormStyles.SMALL_CONTAINER}
                >
                    <label
                        htmlFor='comment'
                        className={FormStyles.DEFAULT}
                    >
                        Коментар:
                    </label>
                    <textarea
                        id='comment'
                        name='comment'
                        value={form.comment}
                        placeholder='Водій не приїхав на точку, хоча...'
                        onChange={handleCommentChange}
                        className={FormStyles.TEXTAREA}
                    />
                </div>

                <div
                    className={FormStyles.SMALL_CONTAINER}
                >
                    <p className='flex flex-row gap-2 items-center'>
                        <input
                        type='checkbox'
                        id='tag'
                        name='tag'
                        value='driver_too_far'
                        onChange={handleTagToggle}
                        className={FormStyles.CHECK}
                    />
                        Водій далеко
                    </p>

                    <p className='flex flex-row gap-2 items-center'>
                        <input
                            type='checkbox'
                            id='tag'
                            name='tag'
                            value='long_wait_time'
                            onChange={handleTagToggle}
                            className={FormStyles.CHECK}
                        />
                        Довге очікування
                    </p>

                    <p className='flex flex-row gap-2 items-center'>
                        <input
                            type='checkbox'
                            id='tag'
                            name='tag'
                            value='changed_plans'
                            onChange={handleTagToggle}
                            className={FormStyles.CHECK}
                        />
                        Змінились плани
                    </p>

                    <p className='flex flex-row gap-2 items-center'>
                        <input
                            type='checkbox'
                            id='tag'
                            name='tag'
                            value='wrong_pickup_location'
                            onChange={handleTagToggle}
                            className={FormStyles.CHECK}
                        />
                        Неправильна початкова точка
                    </p>

                    <p className='flex flex-row gap-2 items-center'>
                        <input
                            type='checkbox'
                            id='tag'
                            name='tag'
                            value='found_another_transport'
                            onChange={handleTagToggle}
                            className={FormStyles.CHECK}
                        />
                        Знайдено інший транспорт
                    </p>

                    <p className='flex flex-row gap-2 items-center'>
                        <input
                            type='checkbox'
                            id='tag'
                            name='tag'
                            value='driver_not_responding'
                            onChange={handleTagToggle}
                            className={FormStyles.CHECK}
                        />
                        Водій не відповідає
                    </p>

                    <p className='flex flex-row gap-2 items-center'>
                        <input
                            type='checkbox'
                            id='tag'
                            name='tag'
                            value='price_too_high'
                            onChange={handleTagToggle}
                            className={FormStyles.CHECK}
                        />
                        Занадто висока ціна
                    </p>

                    <p className='flex flex-row gap-2 items-center'>
                        <input
                            type='checkbox'
                            id='tag'
                            name='tag'
                            value='emergency'
                            onChange={handleTagToggle}
                            className={FormStyles.CHECK}
                        />
                        Надзвичайна ситуація
                    </p>

                    <p className='flex flex-row gap-2 items-center'>
                        <input
                            type='checkbox'
                            id='tag'
                            name='tag'
                            value='other'
                            onChange={handleTagToggle}
                            className={FormStyles.CHECK}
                        />
                        Інше
                    </p>

                </div>

                <button
                    type='submit'
                    className={FormStyles.BUTTON_PRIMARY}
                >
                    Скасувати
                </button>
            </form>

        </div>
    )
}