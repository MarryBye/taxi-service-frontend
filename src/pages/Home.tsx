import React from "react";
import { Link } from "react-router-dom";

import { DefaultLayout } from "@/components/layout/DefaultLayout";
import { styleSheet } from "@/styles/Form";

export default function HomePage(): React.ReactElement {
    return (
        <DefaultLayout>

            <section className={styleSheet.contentStyles.SECTION}>
                <h1 className={`${styleSheet.textStyles.H1} mb-4`}>
                    Зручний сервіс замовлення таксі
                </h1>

                <div className={styleSheet.contentStyles.TEXT_BLOCK}>
                    <p className={styleSheet.textStyles.LEAD}>
                        Швидкі та комфортні поїздки містом з прозорими цінами
                        та перевіреними водіями.
                    </p>

                    <p className={styleSheet.textStyles.PARAGRAPH}>
                        Taxi Service — це сучасна платформа, яка поєднує клієнтів,
                        водіїв та адміністраторів у єдиній системі для зручних
                        і безпечних поїздок.
                    </p>
                </div>

                <div className="mt-8 flex gap-4">
                    <Link
                        to="/order"
                        className={styleSheet.inputStyles.BUTTON_PRIMARY}
                    >
                        Замовити поїздку
                    </Link>

                    <Link
                        to="/about"
                        className={styleSheet.inputStyles.BUTTON_SECONDARY}
                    >
                        Дізнатися більше
                    </Link>
                </div>
            </section>

            <section className={styleSheet.contentStyles.SECTION_LIGHT}>
                <div className={styleSheet.contentStyles.SECTION}>
                    <h2 className={`${styleSheet.textStyles.H2} mb-10`}>
                        Чому обирають нас
                    </h2>

                    <div className={styleSheet.layoutStyles.GRID_3}>
                        <div className={styleSheet.emphasisStyles.BOX}>
                            <h3 className={`${styleSheet.textStyles.H3} mb-2`}>
                                Швидка подача авто
                            </h3>
                            <p className={styleSheet.textStyles.SMALL}>
                                Ми підбираємо найближчого водія, щоб ви не витрачали
                                час на очікування.
                            </p>
                        </div>

                        <div className={styleSheet.emphasisStyles.BOX}>
                            <h3 className={`${styleSheet.textStyles.H3} mb-2`}>
                                Прозорі ціни
                            </h3>
                            <p className={styleSheet.textStyles.SMALL}>
                                Вартість поїздки відома заздалегідь —
                                без прихованих доплат та несподіванок.
                            </p>
                        </div>

                        <div className={styleSheet.emphasisStyles.BOX}>
                            <h3 className={`${styleSheet.textStyles.H3} mb-2`}>
                                Надійні водії
                            </h3>
                            <p className={styleSheet.textStyles.SMALL}>
                                Усі водії проходять перевірку та мають рейтинг,
                                сформований клієнтами.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styleSheet.contentStyles.SECTION}>
                <div
                    className={`${styleSheet.emphasisStyles.BOX} flex flex-col md:flex-row gap-6 items-start md:items-center justify-between`}
                >
                    <div>
                        <h2 className={`${styleSheet.textStyles.H2} mb-2`}>
                            Готові розпочати поїздку?
                        </h2>
                        <p className={styleSheet.textStyles.SMALL}>
                            Зареєструйтесь або увійдіть в акаунт
                            та замовте поїздку всього за кілька кліків.
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
