import React from "react";
import { Link } from "react-router-dom";

import { DefaultLayout } from "@/components/layout/DefaultLayout";

import { TEXT } from "@/styles/Text";
import { BUTTON } from "@/styles/Button";

import { useDriverStats } from "@/hooks/useDrivers";

export default function DriverStatsPage(): React.ReactElement {
    const { data, loading, error } = useDriverStats();

    if (loading) {
        return (
            <DefaultLayout>
                <p className={TEXT.accent_1}>Загрузка статистики…</p>
            </DefaultLayout>
        );
    }

    if (error || !data) {
        return (
            <DefaultLayout>
                <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded">
                    Не удалось загрузить статистику водителя
                </div>
            </DefaultLayout>
        );
    }

    return (
        <DefaultLayout>
            <section className="max-w-7xl mx-auto px-8 py-16 flex flex-col gap-10">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div>
                        <h1 className={`${TEXT.title} text-3xl mb-2`}>
                            Статистика водителя
                        </h1>
                        <p className={TEXT.accent_1}>
                            Ваша эффективность и показатели работы
                        </p>
                    </div>

                    <Link to="/worker" className={BUTTON.transparent}>
                        ← Назад в панель
                    </Link>
                </div>

                <div className="border border-gray-200 rounded p-6 bg-white">
                    <h2 className={`${TEXT.subtitle} text-lg mb-4`}>
                        Профиль
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className={TEXT.accent_2}>Имя</p>
                            <p className={TEXT.default}>
                                {data.first_name} {data.last_name}
                            </p>
                        </div>

                        <div>
                            <p className={TEXT.accent_2}>Email</p>
                            <p className={TEXT.default}>{data.email}</p>
                        </div>

                        <div>
                            <p className={TEXT.accent_2}>Телефон</p>
                            <p className={TEXT.default}>{data.tel_number}</p>
                        </div>

                        <div>
                            <p className={TEXT.accent_2}>Город</p>
                            <p className={TEXT.default}>
                                {data.city}, {data.country}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="border border-gray-200 rounded p-6 bg-white">
                        <p className={TEXT.accent_2}>Поездок всего</p>
                        <p className="text-2xl font-semibold">
                            {data.rides_count}
                        </p>
                    </div>

                    <div className="border border-gray-200 rounded p-6 bg-white">
                        <p className={TEXT.accent_2}>Завершено</p>
                        <p className="text-2xl font-semibold text-green-600">
                            {data.finished_rides_count}
                        </p>
                    </div>

                    <div className="border border-gray-200 rounded p-6 bg-white">
                        <p className={TEXT.accent_2}>Отменено</p>
                        <p className="text-2xl font-semibold text-red-600">
                            {data.canceled_rides_count}
                        </p>
                    </div>

                    <div className="border border-gray-200 rounded p-6 bg-white">
                        <p className={TEXT.accent_2}>Рейтинг</p>
                        <p className="text-2xl font-semibold">
                            {data.driver_rating ?? "—"}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded p-6 bg-white">
                        <p className={TEXT.accent_2}>Средняя дистанция</p>
                        <p className="text-xl font-semibold">
                            {data.average_distance ?? 0} км
                        </p>
                    </div>

                    <div className="border border-gray-200 rounded p-6 bg-white">
                        <p className={TEXT.accent_2}>Максимальная дистанция</p>
                        <p className="text-xl font-semibold">
                            {data.max_distance ?? 0} км
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded p-6 bg-white">
                        <p className={TEXT.accent_2}>Заработано</p>
                        <p className="text-xl font-semibold text-green-700">
                            {data.earning_balance ?? 0} грн
                        </p>
                    </div>

                    <div className="border border-gray-200 rounded p-6 bg-white">
                        <p className={TEXT.accent_2}>Платежный баланс</p>
                        <p className="text-xl font-semibold">
                            {data.payment_balance ?? 0} грн
                        </p>
                    </div>
                </div>

                <div className="border border-gray-200 rounded p-6 bg-white">
                    <p className={TEXT.accent_2}>Самый частый тег</p>
                    <p className={TEXT.default}>
                        {data.most_popular_tag ?? "—"}
                    </p>
                </div>
            </section>
        </DefaultLayout>
    );
}
