import React from "react";
import type {LoginSchema} from "@/types/auth";
import {FormStyles} from "@/styles/Form";


export default function LoginForm({
    submitHandler
}: {
    submitHandler: (form: LoginSchema) => void;
}): React.ReactElement {

    const [form, setForm] = React.useState<LoginSchema>({
        login: "",
        password: "",
    });

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

        console.log("Form changed!")
        console.table(form);
    }

    return (
        <div
            className={FormStyles.CARD}
        >
            <h1
                className={FormStyles.H2}
            >
                Вхід до акаунту
            </h1>

            <form
                onSubmit={handleSubmit}
                className={FormStyles.SMALL_CONTAINER}
            >
                <div
                    className={FormStyles.SMALL_CONTAINER}
                >
                    <label
                        htmlFor='login'
                        className={FormStyles.DEFAULT}
                    >
                        Логін:
                    </label>
                    <input
                        type='text'
                        id='login'
                        name='login'
                        value={form.login}
                        placeholder='Username'
                        onChange={handleChange}
                        className={FormStyles.INPUT}
                    />
                </div>

                <div
                    className={FormStyles.SMALL_CONTAINER}
                >
                    <label
                        htmlFor='password'
                        className={FormStyles.DEFAULT}
                    >
                        Пароль:
                    </label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        value={form.password}
                        placeholder='Password'
                        onChange={handleChange}
                        className={FormStyles.INPUT}
                    />
                </div>

                <button
                    type='submit'
                    className={FormStyles.BUTTON_PRIMARY}
                >
                    Увійти
                </button>
            </form>

        </div>
    )
}