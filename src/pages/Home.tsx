import React from "react";
import { Link } from "react-router-dom";

import { DefaultLayout } from "@/components/layout/DefaultLayout";

import { TEXT } from "@/styles/Text";
import { LINK } from "@/styles/Link";
import { BUTTON } from "@/styles/Button";

export default function HomePage(): React.ReactElement {
    return (
        <DefaultLayout>
            <section className="max-w-7xl mx-auto px-8 py-20">
                <h1 className={`${TEXT.title} text-3xl mb-4`}>
                    Удобный сервис заказа такси
                </h1>

                <p className={`${TEXT.accent_1} max-w-xl mb-8`}>
                    Быстрые и комфортные поездки по городу. Прозрачные цены,
                    надёжные водители и простой интерфейс для клиентов и водителей.
                </p>

                <div className="flex items-center gap-4">
                    <Link to="/order" className={BUTTON.default}>
                        Сделать заказ
                    </Link>

                    <Link to="/about" className={LINK.default}>
                        Узнать больше
                    </Link>
                </div>
            </section>

            <section className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-8">
                    <h2 className={`${TEXT.subtitle} mb-10`}>
                        Почему выбирают нас
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="bg-white border border-gray-200 rounded p-6">
                            <h3 className={`${TEXT.default} font-semibold mb-2`}>
                                Быстрая подача
                            </h3>
                            <p className={TEXT.accent_1}>
                                Мы подбираем ближайшего водителя, чтобы вы не тратили
                                время на ожидание.
                            </p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded p-6">
                            <h3 className={`${TEXT.default} font-semibold mb-2`}>
                                Прозрачные цены
                            </h3>
                            <p className={TEXT.accent_1}>
                                Стоимость поездки известна заранее, без скрытых
                                доплат и неприятных сюрпризов.
                            </p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded p-6">
                            <h3 className={`${TEXT.default} font-semibold mb-2`}>
                                Надёжные водители
                            </h3>
                            <p className={TEXT.accent_1}>
                                Все водители проходят проверку и имеют рейтинг,
                                сформированный клиентами.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-8 py-20">
                <div className="border border-gray-200 rounded p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                        <h2 className={`${TEXT.subtitle} mb-2`}>
                            Готовы начать поездку?
                        </h2>
                        <p className={TEXT.accent_1}>
                            Зарегистрируйтесь или войдите в аккаунт и оформите заказ
                            всего за пару кликов.
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
