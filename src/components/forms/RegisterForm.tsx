import React from 'react';

import { TextInput } from '@/components/ui/Input/TextInput';
import { PasswordInput } from '@/components/ui/Input/PasswordInput';
import { Button } from '@/components/ui/Button/Button';
import {Link} from "react-router-dom";

type RegisterFormProps = {
    login: string;
    email: string;
    telNumber: string;
    password: string;
    firstName: string;
    lastName: string;
    country: string;
    city: string;
};

export function RegisterForm({
                                 login,
                                 email,
                                 telNumber,
                                 password,
                                 firstName,
                                 lastName,
                                 country,
                                 city
                             }: RegisterFormProps): React.ReactElement {
    return (
        <div className="mx-auto w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900">
                Регистрация
            </h2>

            <div className="grid gap-4 md:grid-cols-2">

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Логин
                    </label>
                    <TextInput
                        placeholder="Введите логин"
                        value={login}
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Почта
                    </label>
                    <TextInput
                        type="email"
                        placeholder="example@mail.com"
                        value={email}
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Номер телефона
                    </label>
                    <TextInput
                        placeholder="+380..."
                        value={telNumber}
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Пароль
                    </label>
                    <PasswordInput
                        placeholder="Введите пароль"
                        value={password}
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Имя
                    </label>
                    <TextInput
                        placeholder="Имя"
                        value={firstName}
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Фамилия
                    </label>
                    <TextInput
                        placeholder="Фамилия"
                        value={lastName}
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Страна
                    </label>
                    <select
                        className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-black focus:outline-none"
                        value={country}
                    >
                        <option value="">Выберите страну</option>
                        <option value="Ukraine">Украина</option>
                    </select>
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Город
                    </label>
                    <select
                        className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:border-black focus:outline-none"
                        value={city}
                    >
                        <option value="">Выберите город</option>
                        <option value="Kyiv">Киев</option>
                        <option value="Lviv">Львов</option>
                        <option value="Odessa">Одесса</option>
                        <option value="Dnipro">Днепр</option>
                        <option value="Kharkiv">Харьков</option>
                    </select>
                </div>
            </div>

            <Button className="mt-6 w-full">
                Зарегистрироваться
            </Button>

            <Link to='/login'>
                <p className='className="flex mt-6 text-center text-sm text-gray-600 hover:underline'>
                    Уже есть аккаунт?
                </p>
            </Link>
        </div>
    );
}