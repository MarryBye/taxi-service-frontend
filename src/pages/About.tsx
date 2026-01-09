import React from "react";
import { Link } from "react-router-dom";

import { DefaultLayout } from "@/components/layout/DefaultLayout";
import { styleSheet } from "@/styles/Form";

export default function AboutPage(): React.ReactElement {
    return (
        <DefaultLayout>

            <section className={styleSheet.contentStyles.SECTION}>
                <h1 className={`${styleSheet.textStyles.H1} mb-4`}>
                    Про сервіс Taxi Service
                </h1>

                <div className={styleSheet.contentStyles.TEXT_BLOCK}>
                    <p className={styleSheet.textStyles.LEAD}>
                        Taxi Service — це онлайн-платформа для зручного та безпечного
                        замовлення таксі в місті.
                    </p>

                    <p className={styleSheet.textStyles.PARAGRAPH}>
                        Ми створюємо сервіс, який однаково зручний для клієнтів,
                        водіїв та адміністраторів, обʼєднуючи їх в єдиній
                        цифровій екосистемі.
                    </p>
                </div>
            </section>

            <section className={styleSheet.contentStyles.SECTION_LIGHT}>
                <div className={styleSheet.contentStyles.SECTION_NARROW}>
                    <h2 className={`${styleSheet.textStyles.H2} mb-6`}>
                        Наша місія
                    </h2>

                    <p className={styleSheet.textStyles.PARAGRAPH}>
                        Наша мета — зробити міські поїздки простими, прозорими
                        та доступними. Ми прагнемо прибрати зайві складнощі
                        з процесу замовлення таксі та надати користувачам
                        зрозумілий інтерфейс, чесні ціни й якісний сервіс.
                    </p>
                </div>
            </section>

            <section className={styleSheet.contentStyles.SECTION}>
                <h2 className={`${styleSheet.textStyles.H2} mb-10`}>
                    Що ми пропонуємо
                </h2>

                <div className={styleSheet.layoutStyles.GRID_3}>
                    <div className={styleSheet.emphasisStyles.BOX}>
                        <h3 className={`${styleSheet.textStyles.H3} mb-2`}>
                            Для клієнтів
                        </h3>
                        <p className={styleSheet.textStyles.SMALL}>
                            Швидке замовлення поїздки, вибір класу автомобіля,
                            прозора вартість та історія всіх поїздок.
                        </p>
                    </div>

                    <div className={styleSheet.emphasisStyles.BOX}>
                        <h3 className={`${styleSheet.textStyles.H3} mb-2`}>
                            Для водіїв
                        </h3>
                        <p className={styleSheet.textStyles.SMALL}>
                            Зручний прийом замовлень, зрозуміла система рейтингів
                            та прозорий облік заробітку.
                        </p>
                    </div>

                    <div className={styleSheet.emphasisStyles.BOX}>
                        <h3 className={`${styleSheet.textStyles.H3} mb-2`}>
                            Для адміністраторів
                        </h3>
                        <p className={styleSheet.textStyles.SMALL}>
                            Повний контроль над користувачами, замовленнями,
                            автомобілями та фінансовими операціями.
                        </p>
                    </div>
                </div>
            </section>

            <section className={styleSheet.contentStyles.SECTION}>
                <div
                    className={`${styleSheet.emphasisStyles.BOX} flex flex-col md:flex-row gap-6 items-start md:items-center justify-between`}
                >
                    <div>
                        <h2 className={`${styleSheet.textStyles.H2} mb-2`}>
                            Хочете стати частиною сервісу?
                        </h2>
                        <p className={styleSheet.textStyles.SMALL}>
                            Зареєструйтесь і почніть користуватися Taxi Service
                            вже сьогодні.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <Link
                            to="/register"
                            className={styleSheet.inputStyles.BUTTON_SECONDARY}
                        >
                            Реєстрація
                        </Link>

                        <Link
                            to="/order"
                            className={styleSheet.inputStyles.BUTTON_PRIMARY}
                        >
                            Замовити поїздку
                        </Link>
                    </div>
                </div>
            </section>

        </DefaultLayout>
    );
}
