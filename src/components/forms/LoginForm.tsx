import React from 'react';

import { TextInput } from '@/components/ui/Input/TextInput';
import { PasswordInput } from '@/components/ui/Input/PasswordInput';
import { Button } from '@/components/ui/Button/Button';
import {Link} from "react-router-dom";

type LoginFormProps = {
    onSubmit: (login: string, password: string) => void;
};

export function LoginForm({
    onSubmit
}: LoginFormProps): React.ReactElement {
    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = () => {
        onSubmit(login, password);
    }

    return (
        <div className="mx-auto w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900">
                Вход
            </h2>

            <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Логин
                </label>
                <TextInput
                    placeholder="Введите логин"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
            </div>

            <div className="mb-6">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                    Пароль
                </label>
                <PasswordInput
                    placeholder="Введите пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <Button className="w-full" onClick={handleSubmit}>
                Войти
            </Button>

            <Link to='/register'>
                <p className="mt-6 text-center text-sm text-gray-600 hover:underline">
                    Нет аккаунта?
                </p>
            </Link>
        </div>
    );
}
