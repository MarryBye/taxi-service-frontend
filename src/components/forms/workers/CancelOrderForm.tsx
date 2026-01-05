import React from "react";
import type {CancelOrderSchema} from "@/types/workers";
import {FormStyles} from "@/styles/Form";


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
                        placeholder='Клієнта не було на точці, хоча...'
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
                        value='client_not_responding'
                        onChange={handleTagToggle}
                        className={FormStyles.CHECK}
                    />
                        Клієнт не відповідає
                    </p>

                    <p className='flex flex-row gap-2 items-center'>
                        <input
                            type='checkbox'
                            id='tag'
                            name='tag'
                            value='client_not_at_pickup_point'
                            onChange={handleTagToggle}
                            className={FormStyles.CHECK}
                        />
                        Клієнт не на точці підбору
                    </p>

                    <p className='flex flex-row gap-2 items-center'>
                        <input
                            type='checkbox'
                            id='tag'
                            name='tag'
                            value='vehicle_breakdown'
                            onChange={handleTagToggle}
                            className={FormStyles.CHECK}
                        />
                        Поломка автомобіля
                    </p>

                    <p className='flex flex-row gap-2 items-center'>
                        <input
                            type='checkbox'
                            id='tag'
                            name='tag'
                            value='traffic_accident'
                            onChange={handleTagToggle}
                            className={FormStyles.CHECK}
                        />
                        ДТП
                    </p>

                    <p className='flex flex-row gap-2 items-center'>
                        <input
                            type='checkbox'
                            id='tag'
                            name='tag'
                            value='unsafe_pickup_location'
                            onChange={handleTagToggle}
                            className={FormStyles.CHECK}
                        />
                        Небезпечна точка
                    </p>

                    <p className='flex flex-row gap-2 items-center'>
                        <input
                            type='checkbox'
                            id='tag'
                            name='tag'
                            value='route_unreachable'
                            onChange={handleTagToggle}
                            className={FormStyles.CHECK}
                        />
                        Неможливо дістатися
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