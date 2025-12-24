import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { DefaultLayout } from "@/components/layout/DefaultLayout";

import { TEXT } from "@/styles/Text";
import { LINK } from "@/styles/Link";
import { BUTTON } from "@/styles/Button";

import { useAuth } from "@/hooks/useAuth";
import type { LoginSchema } from "@/types/auth";

export default function LoginPage(): React.ReactElement {
    const navigate = useNavigate();

    const {
        login,
        loginLoading,
        loginError,
    } = useAuth();

    const [form, setForm] = useState<LoginSchema>({
        login: "",
        password: "",
    });

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

        const res = await login(form);
        if (res) {
            navigate("/");
        }
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
                    <input
                        type="text"
                        name="login"
                        placeholder="Логин"
                        value={form.login}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-4 py-2"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-4 py-2"
                    />

                    {loginError && (
                        <p className="text-red-600 text-sm">
                            Ошибка входа. Проверьте логин и пароль.
                        </p>
                    )}

                    <button
                        type="submit"
                        className={BUTTON.default}
                        disabled={loginLoading}
                    >
                        {loginLoading ? "Вход..." : "Войти"}
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
