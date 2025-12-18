import React from "react";
import { Link } from "react-router-dom";

import { DefaultLayout } from "@/components/layout/DefaultLayout";

import { TEXT } from "@/styles/Text";
import { LINK } from "@/styles/Link";
import { BUTTON } from "@/styles/Button";

export default function AboutPage(): React.ReactElement {
    return (
        <DefaultLayout>
            <section className="max-w-7xl mx-auto px-8 py-16">
                <h1 className={`${TEXT.title} text-3xl mb-4`}>
                    О сервисе Taxi Service
                </h1>

                <p className={`${TEXT.accent_1} max-w-3xl`}>
                    Taxi Service — это онлайн-платформа для удобного и безопасного
                    заказа такси. Мы создаём сервис, который одинаково удобен
                    для клиентов, водителей и администраторов.
                </p>
            </section>

            <section className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-8">
                    <h2 className={`${TEXT.subtitle} mb-6`}>
                        Наша миссия
                    </h2>

                    <p className={`${TEXT.accent_1} max-w-4xl`}>
                        Наша цель — сделать городские поездки простыми, прозрачными
                        и доступными. Мы стремимся убрать лишние сложности из процесса
                        заказа такси и предоставить пользователям понятный интерфейс,
                        честные цены и качественный сервис.
                    </p>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-8 py-16">
                <h2 className={`${TEXT.subtitle} mb-10`}>
                    Что мы предлагаем
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="border border-gray-200 rounded p-6 bg-white">
                        <h3 className={`${TEXT.default} font-semibold mb-2`}>
                            Для клиентов
                        </h3>
                        <p className={TEXT.accent_1}>
                            Быстрый заказ поездки, выбор класса автомобиля,
                            прозрачная стоимость и история всех поездок.
                        </p>
                    </div>

                    <div className="border border-gray-200 rounded p-6 bg-white">
                        <h3 className={`${TEXT.default} font-semibold mb-2`}>
                            Для водителей
                        </h3>
                        <p className={TEXT.accent_1}>
                            Удобный приём заказов, понятная система рейтингов
                            и прозрачный учёт заработка.
                        </p>
                    </div>

                    <div className="border border-gray-200 rounded p-6 bg-white">
                        <h3 className={`${TEXT.default} font-semibold mb-2`}>
                            Для администраторов
                        </h3>
                        <p className={TEXT.accent_1}>
                            Полный контроль над пользователями, заказами,
                            автомобилями и финансовыми операциями.
                        </p>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-8 py-20">
                <div className="border border-gray-200 rounded p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                        <h2 className={`${TEXT.subtitle} mb-2`}>
                            Хотите стать частью сервиса?
                        </h2>
                        <p className={TEXT.accent_1}>
                            Зарегистрируйтесь и начните пользоваться Taxi Service
                            уже сегодня.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link to="/register" className={BUTTON.transparent}>
                            Регистрация
                        </Link>

                        <Link to="/order" className={BUTTON.default}>
                            Сделать заказ
                        </Link>
                    </div>
                </div>
            </section>
        </DefaultLayout>
    );
}
