import React from "react";
import { Link } from "react-router-dom";

import { DefaultLayout } from "@/components/layout/DefaultLayout";

import { TEXT } from "@/styles/Text";
import { LINK } from "@/styles/Link";
import { BUTTON } from "@/styles/Button";

type ErrorPageProps = {
    title?: string;
    description?: string;
};

export default function ErrorPage({
    title = "Что-то пошло не так",
    description = "Страница, которую вы ищете, не существует или произошла ошибка.",
}: ErrorPageProps): React.ReactElement {
    return (
        <DefaultLayout>
            <section className="min-h-[70vh] flex items-center justify-center px-8">
                <div className="max-w-xl text-center">
                    <h1 className={`${TEXT.title} text-4xl mb-4`}>
                        {title}
                    </h1>

                    <p className={`${TEXT.accent_1} mb-8`}>
                        {description}
                    </p>

                    <div className="flex items-center justify-center gap-4">
                        <Link to="/" className={BUTTON.default}>
                            На главную
                        </Link>

                        <Link to="/order" className={BUTTON.transparent}>
                            Сделать заказ
                        </Link>
                    </div>

                    <div className="mt-6">
                        <Link to="/about" className={LINK.default}>
                            Узнать больше о сервисе
                        </Link>
                    </div>
                </div>
            </section>
        </DefaultLayout>
    );
}