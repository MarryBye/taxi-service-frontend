import React from "react";
import { Link } from "react-router-dom";

import { DefaultLayout } from "@/components/layout/DefaultLayout";

import { TEXT } from "@/styles/Text";
import { LINK } from "@/styles/Link";
import { BUTTON } from "@/styles/Button";

export default function CareerPage(): React.ReactElement {
    return (
        <DefaultLayout>
            <section className="max-w-7xl mx-auto px-8 py-16">
                <h1 className={`${TEXT.title} text-3xl mb-4`}>
                    Карьера в Taxi Service
                </h1>

                <p className={`${TEXT.accent_1} max-w-3xl`}>
                    Мы строим сервис городских поездок и ищем людей, которые
                    хотят развиваться вместе с нами. Taxi Service — это команда,
                    ориентированная на качество, надёжность и простые решения.
                </p>
            </section>

            <section className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-8">
                    <h2 className={`${TEXT.subtitle} mb-10`}>
                        Почему стоит работать с нами
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="bg-white border border-gray-200 rounded p-6">
                            <h3 className={`${TEXT.default} font-semibold mb-2`}>
                                Реальные задачи
                            </h3>
                            <p className={TEXT.accent_1}>
                                Вы будете работать над продуктом, который используют
                                реальные пользователи каждый день.
                            </p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded p-6">
                            <h3 className={`${TEXT.default} font-semibold mb-2`}>
                                Профессиональный рост
                            </h3>
                            <p className={TEXT.accent_1}>
                                Мы поддерживаем развитие навыков и поощряем инициативу
                                внутри команды.
                            </p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded p-6">
                            <h3 className={`${TEXT.default} font-semibold mb-2`}>
                                Прозрачность
                            </h3>
                            <p className={TEXT.accent_1}>
                                Понятные процессы, открытая коммуникация и честный
                                подход к работе.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-8 py-16">
                <h2 className={`${TEXT.subtitle} mb-10`}>
                    Открытые позиции
                </h2>

                <div className="flex flex-col gap-6">
                    <div className="border border-gray-200 rounded p-6 bg-white">
                        <h3 className={`${TEXT.default} font-semibold mb-1`}>
                            Backend-разработчик
                        </h3>
                        <p className={`${TEXT.accent_1} mb-3`}>
                            Разработка и поддержка серверной части сервиса,
                            работа с базами данных и API.
                        </p>
                        <Link to="#" className={LINK.default}>
                            Подробнее
                        </Link>
                    </div>

                    <div className="border border-gray-200 rounded p-6 bg-white">
                        <h3 className={`${TEXT.default} font-semibold mb-1`}>
                            Frontend-разработчик
                        </h3>
                        <p className={`${TEXT.accent_1} mb-3`}>
                            Разработка пользовательского интерфейса, работа с
                            React и взаимодействие с API.
                        </p>
                        <Link to="#" className={LINK.default}>
                            Подробнее
                        </Link>
                    </div>

                    <div className="border border-gray-200 rounded p-6 bg-white">
                        <h3 className={`${TEXT.default} font-semibold mb-1`}>
                            Водитель
                        </h3>
                        <p className={`${TEXT.accent_1} mb-3`}>
                            Выполнение заказов, работа с клиентами и поддержание
                            высокого уровня сервиса.
                        </p>
                        <Link to="#" className={LINK.default}>
                            Подробнее
                        </Link>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-8 py-20">
                <div className="border border-gray-200 rounded p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                        <h2 className={`${TEXT.subtitle} mb-2`}>
                            Не нашли подходящую вакансию?
                        </h2>
                        <p className={TEXT.accent_1}>
                            Отправьте нам своё резюме, и мы свяжемся с вами при
                            появлении подходящей позиции.
                        </p>
                    </div>

                    <Link to="/contact" className={BUTTON.default}>
                        Связаться с нами
                    </Link>
                </div>
            </section>
        </DefaultLayout>
    );
}
