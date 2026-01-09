import React from "react";
import { Link } from "react-router-dom";

import { DefaultLayout } from "@/components/layout/DefaultLayout";
import { styleSheet } from "@/styles/Form";

export default function CareerPage(): React.ReactElement {
    return (
        <DefaultLayout>

            <section className={styleSheet.contentStyles.SECTION}>
                <h1 className={`${styleSheet.textStyles.H1} mb-4`}>
                    Карʼєра в Taxi Service
                </h1>

                <div className={styleSheet.contentStyles.TEXT_BLOCK_WIDE}>
                    <p className={styleSheet.textStyles.LEAD}>
                        Ми будуємо сучасний сервіс міських поїздок і шукаємо людей,
                        які хочуть розвиватися разом з нами.
                    </p>

                    <p className={styleSheet.textStyles.PARAGRAPH}>
                        Taxi Service — це команда, орієнтована на якість,
                        надійність і прості, зрозумілі рішення для реальних користувачів.
                    </p>
                </div>
            </section>

            <section className={styleSheet.contentStyles.SECTION_LIGHT}>
                <div className={styleSheet.contentStyles.SECTION}>
                    <h2 className={`${styleSheet.textStyles.H2} mb-10`}>
                        Чому варто працювати з нами
                    </h2>

                    <div className={styleSheet.layoutStyles.GRID_3}>
                        <div className={styleSheet.emphasisStyles.BOX}>
                            <h3 className={`${styleSheet.textStyles.H3} mb-2`}>
                                Реальні завдання
                            </h3>
                            <p className={styleSheet.textStyles.SMALL}>
                                Ви працюватимете над продуктом, яким щодня
                                користуються тисячі людей.
                            </p>
                        </div>

                        <div className={styleSheet.emphasisStyles.BOX}>
                            <h3 className={`${styleSheet.textStyles.H3} mb-2`}>
                                Професійний розвиток
                            </h3>
                            <p className={styleSheet.textStyles.SMALL}>
                                Ми підтримуємо розвиток навичок, навчання
                                та заохочуємо ініціативу в команді.
                            </p>
                        </div>

                        <div className={styleSheet.emphasisStyles.BOX}>
                            <h3 className={`${styleSheet.textStyles.H3} mb-2`}>
                                Прозорість
                            </h3>
                            <p className={styleSheet.textStyles.SMALL}>
                                Зрозумілі процеси, відкрита комунікація
                                та чесний підхід до роботи.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styleSheet.contentStyles.SECTION}>
                <h2 className={`${styleSheet.textStyles.H2} mb-10`}>
                    Відкриті позиції
                </h2>

                <div className="flex flex-col gap-6">
                    <div className={styleSheet.emphasisStyles.BOX}>
                        <h3 className={`${styleSheet.textStyles.H3} mb-1`}>
                            Backend-розробник
                        </h3>
                        <p className={`${styleSheet.textStyles.SMALL} mb-3`}>
                            Розробка та підтримка серверної частини сервісу,
                            робота з базами даних і API.
                        </p>
                        <Link
                            to="#"
                            className={styleSheet.textStyles.LINK}
                        >
                            Детальніше
                        </Link>
                    </div>

                    <div className={styleSheet.emphasisStyles.BOX}>
                        <h3 className={`${styleSheet.textStyles.H3} mb-1`}>
                            Frontend-розробник
                        </h3>
                        <p className={`${styleSheet.textStyles.SMALL} mb-3`}>
                            Розробка користувацького інтерфейсу,
                            робота з React та взаємодія з API.
                        </p>
                        <Link
                            to="#"
                            className={styleSheet.textStyles.LINK}
                        >
                            Детальніше
                        </Link>
                    </div>

                    <div className={styleSheet.emphasisStyles.BOX}>
                        <h3 className={`${styleSheet.textStyles.H3} mb-1`}>
                            Водій
                        </h3>
                        <p className={`${styleSheet.textStyles.SMALL} mb-3`}>
                            Виконання замовлень, робота з клієнтами
                            та підтримка високого рівня сервісу.
                        </p>
                        <Link
                            to="#"
                            className={styleSheet.textStyles.LINK}
                        >
                            Детальніше
                        </Link>
                    </div>
                </div>
            </section>

            <section className={styleSheet.contentStyles.SECTION}>
                <div
                    className={`${styleSheet.emphasisStyles.BOX} flex flex-col md:flex-row gap-6 items-start md:items-center justify-between`}
                >
                    <div>
                        <h2 className={`${styleSheet.textStyles.H2} mb-2`}>
                            Не знайшли відповідну вакансію?
                        </h2>
                        <p className={styleSheet.textStyles.SMALL}>
                            Надішліть нам своє резюме, і ми звʼяжемося з вами,
                            коли зʼявиться відповідна позиція.
                        </p>
                    </div>

                    <Link
                        to="/contact"
                        className={styleSheet.inputStyles.BUTTON_PRIMARY}
                    >
                        Звʼязатися з нами
                    </Link>
                </div>
            </section>

        </DefaultLayout>
    );
}
