import React from "react";
import type { LoginSchema } from "@/types/auth";

import { styleSheet } from "@/styles/Form";

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
    }

    return (
        <div className={styleSheet.containerStyles.CARD}>
            <h1 className={styleSheet.textStyles.H2}>
                Вхід до акаунту
            </h1>

            <form
                onSubmit={handleSubmit}
                className={styleSheet.containerStyles.SMALL_CONTAINER}
            >

                <div className={styleSheet.containerStyles.SMALL_CONTAINER}>
                    <label className={styleSheet.textStyles.DEFAULT}>
                        Логін:
                    </label>

                    <input
                        type="text"
                        name="login"
                        value={form.login}
                        placeholder="Username"
                        onChange={handleChange}
                        className={styleSheet.inputStyles.INPUT}
                    />
                </div>

                <div className={styleSheet.containerStyles.SMALL_CONTAINER}>
                    <label className={styleSheet.textStyles.DEFAULT}>
                        Пароль:
                    </label>

                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        placeholder="Password"
                        onChange={handleChange}
                        className={styleSheet.inputStyles.INPUT}
                    />
                </div>

                <button
                    type="submit"
                    className={styleSheet.inputStyles.BUTTON_PRIMARY}
                >
                    Увійти
                </button>
            </form>
        </div>
    );
}
