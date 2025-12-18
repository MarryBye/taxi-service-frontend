import React from "react";
import { Link } from "react-router-dom";

import { DefaultLayout } from "@/components/layout/DefaultLayout";

import { TEXT } from "@/styles/Text";
import { LINK } from "@/styles/Link";
import { BUTTON } from "@/styles/Button";

import { useProfile } from "@/hooks/useClients";

export default function ProfilePage(): React.ReactElement {
    const { data, loading, error } = useProfile();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    console.log(data);
    return (
        <DefaultLayout>
            <section className="max-w-4xl mx-auto px-8 py-16">
                <h1 className={`${TEXT.title} text-3xl mb-8`}>
                    Профиль
                </h1>

                <div className="border border-gray-200 rounded p-8 bg-white mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                            <p className={TEXT.accent_2}>Имя</p>
                            <p className={TEXT.default}>
                                {data.first_name}
                            </p>
                        </div>

                        <div>
                            <p className={TEXT.accent_2}>Фамилия</p>
                            <p className={TEXT.default}>
                                {data.last_name}
                            </p>
                        </div>

                        <div>
                            <p className={TEXT.accent_2}>Email</p>
                            <p className={TEXT.default}>
                                {data.email}
                            </p>
                        </div>

                        <div>
                            <p className={TEXT.accent_2}>Телефон</p>
                            <p className={TEXT.default}>
                                {data.tel_number}
                            </p>
                        </div>

                        <div>
                            <p className={TEXT.accent_2}>Роль</p>
                            <p className={TEXT.default}>
                                {data.role}
                            </p>
                        </div>

                        <div>
                            <p className={TEXT.accent_2}>Месторасположение</p>
                            <p className={TEXT.default}>
                                {data.country}, {data.city}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 items-center">
                        <p className={BUTTON.transparent}>
                            Баланс: {data.payment_balance ? data.payment_balance : 0} грн.
                        </p>

                        <Link to="/profile/edit" className={BUTTON.transparent}>
                            Редактировать профиль
                        </Link>

                        <Link to="/orders/history" className={BUTTON.transparent}>
                            История заказов
                        </Link>

                        <Link to="/order" className={BUTTON.default}>
                            Сделать заказ
                        </Link>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
                    <div className="border border-gray-200 rounded p-8 bg-white">
                        <h1 className={`${TEXT.title} text-3xl mb-8`}>
                            Рейтинг
                        </h1>
                        <p className={TEXT.default}>
                            {data.client_rating ? data.client_rating : "N/A"}
                        </p>
                    </div>
                    <div className="border border-gray-200 rounded p-8 bg-white">
                        <h1 className={`${TEXT.title} text-3xl mb-8`}>
                            Самый частый тег
                        </h1>
                        <p className={TEXT.default}>
                            {data.most_popular_tag ? data.most_popular_tag : "N/A"}
                        </p>
                    </div>
                    <div className="border border-gray-200 rounded p-8 bg-white">
                        <h1 className={`${TEXT.title} text-3xl mb-8`}>
                            Количество поездок
                        </h1>
                        <p className={TEXT.default}>
                            Общее: {data.rides_count ? data.rides_count : "N/A"}
                        </p>
                        <p className={TEXT.default}>
                            Завершенных: {data.finished_rides_count ? data.finished_rides_count : "N/A"}
                        </p>
                        <p className={TEXT.default}>
                            Отмененных: {data.canceled_rides_count ? data.canceled_rides_count : "N/A"}
                        </p>
                    </div>
                    <div className="border border-gray-200 rounded p-8 bg-white">
                        <h1 className={`${TEXT.title} text-3xl mb-8`}>
                            Дистанция поездок
                        </h1>
                        <p className={TEXT.default}>
                            Средняя: {data.average_distance ? data.average_distance : "N/A"}
                        </p>
                        <p className={TEXT.default}>
                            Максимальная: {data.max_distance ? data.max_distance : "N/A"}
                        </p>
                    </div>

                </div>

            </section>
        </DefaultLayout>
    );
}
