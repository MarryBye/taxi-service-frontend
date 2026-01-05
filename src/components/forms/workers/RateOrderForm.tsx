import React from "react";
import type {RateOrderSchema} from "@/types/workers";
import {FormStyles} from "@/styles/Form";


export default function WorkerRateOrderForm({
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
    }

    function handleMarkChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({
            ...form,
            mark: Number(e.target.value)
        })
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
                Оцінка замовлення
            </h1>

            <form
                onSubmit={handleSubmit}
                className={FormStyles.SMALL_CONTAINER}
            >
                <div
                    className={FormStyles.SMALL_CONTAINER}
                >
                    <label
                        htmlFor='mark'
                        className={FormStyles.DEFAULT}
                    >
                        Коментар:
                    </label>
                    <input
                        type='number'
                        id='mark'
                        name='mark'
                        min='0'
                        max='5'
                        value={form.mark}
                        placeholder='5'
                        onChange={handleMarkChange}
                        className={FormStyles.TEXTAREA}
                    />
                </div>

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
                        placeholder='Чудова поїздка, клієнт був...'
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
                            value='accurate'
                            onChange={handleTagToggle}
                            className={FormStyles.CHECK}
                        />
                        Охайний
                    </p>

                    <p className='flex flex-row gap-2 items-center'>
                        <input
                            type='checkbox'
                            id='tag'
                            name='tag'
                            value='friendly'
                            onChange={handleTagToggle}
                            className={FormStyles.CHECK}
                        />
                        Дружній
                    </p>

                    <p className='flex flex-row gap-2 items-center'>
                        <input
                            type='checkbox'
                            id='tag'
                            name='tag'
                            value='respectful'
                            onChange={handleTagToggle}
                            className={FormStyles.CHECK}
                        />
                        Поважний
                    </p>

                    <p className='flex flex-row gap-2 items-center'>
                        <input
                            type='checkbox'
                            id='tag'
                            name='tag'
                            value='communicative'
                            onChange={handleTagToggle}
                            className={FormStyles.CHECK}
                        />
                        Комунікативний
                    </p>

                    <p className='flex flex-row gap-2 items-center'>
                        <input
                            type='checkbox'
                            id='tag'
                            name='tag'
                            value='polite'
                            onChange={handleTagToggle}
                            className={FormStyles.CHECK}
                        />
                        Ввічливий
                    </p>

                    <p className='flex flex-row gap-2 items-center'>
                        <input
                            type='checkbox'
                            id='tag'
                            name='tag'
                            value='on_time'
                            onChange={handleTagToggle}
                            className={FormStyles.CHECK}
                        />
                        Вчасний
                    </p>

                    <p className='flex flex-row gap-2 items-center'>
                        <input
                            type='checkbox'
                            id='tag'
                            name='tag'
                            value='clear_instructions'
                            onChange={handleTagToggle}
                            className={FormStyles.CHECK}
                        />
                        Зрозуміло пояснює
                    </p>

                    <p className='flex flex-row gap-2 items-center'>
                        <input
                            type='checkbox'
                            id='tag'
                            name='tag'
                            value='calm'
                            onChange={handleTagToggle}
                            className={FormStyles.CHECK}
                        />
                        Спокійний
                    </p>

                    <p className='flex flex-row gap-2 items-center'>
                        <input
                            type='checkbox'
                            id='tag'
                            name='tag'
                            value='helpful'
                            onChange={handleTagToggle}
                            className={FormStyles.CHECK}
                        />
                        Допомагає
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
                    Оцінити
                </button>
            </form>

        </div>
    )
}