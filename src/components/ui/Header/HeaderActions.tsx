import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useProfile } from "@/api/authorized";

const actionButton =
    'rounded-lg px-4 py-2 text-sm font-medium transition-colors';

export function HeaderActions(): React.ReactElement {
    const { data, loading, error } = useProfile();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    return (
        <div className="flex items-center gap-3">
            {data?.email}

            <Link to='/login'>
                <button className={`${actionButton} text-gray-600 hover:bg-gray-100`}>
                    Вход
                </button>
            </Link>

            <Link to='/register'>
                <button
                    className={`${actionButton} bg-black text-white hover:bg-gray-800`}
                >
                    Регистрация
                </button>
            </Link>

            <Link to='/admin'>
                <button
                    className={`${actionButton} border border-gray-300 text-gray-700 hover:bg-gray-100`}
                >
                    Админ панель
                </button>
            </Link>

            <Link to='/worker'>
                <button
                    className={`${actionButton} border border-gray-300 text-gray-700 hover:bg-gray-100`}
                >
                    Панель водителя
                </button>
            </Link>
        </div>
    );
}
