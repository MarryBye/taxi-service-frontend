import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { DefaultLayout } from "@/components/layout/DefaultLayout";

import { TEXT } from "@/styles/Text";
import { LINK } from "@/styles/Link";
import { BUTTON } from "@/styles/Button";

import { useAuth } from "@/hooks/useAuth";
import type {AuthUserSchema} from "@/types/auth";

export default function LoginPage(): React.ReactElement {
    const navigate = useNavigate();
    const [form, setForm] = useState<AuthUserSchema>({
        login: "",
        password: "",
    });
    const { login } = useAuth();

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await login(form)
        navigate("/");
    }

    return (
        <DefaultLayout>
            <section className="max-w-md mx-auto px-8 py-20">
                <h1 className={`${TEXT.title} text-3xl mb-6`}>
                    Вход в аккаунт
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                >
                    <div>
                        <input
                            type="text"
                            placeholder='Логин'
                            name='login'
                            value={form.login}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-gray-400"
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder='Пароль'
                            name='password'
                            value={form.password}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-gray-400"
                        />
                    </div>

                    <button type="submit" className={BUTTON.default}>
                        Войти
                    </button>
                </form>

                <div className="mt-6">
                    <p className={TEXT.accent_1}>
                        Нет аккаунта?{" "}
                        <Link to="/register" className={LINK.default}>
                            Зарегистрироваться
                        </Link>
                    </p>
                </div>
            </section>
        </DefaultLayout>
    );
}
