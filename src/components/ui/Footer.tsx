import React from "react";
import { Link } from "react-router-dom";

import { TEXT } from "@/styles/Text"
import { LINK } from "@/styles/Link";

export function Footer(): React.ReactElement {
    return (
        <footer className="bg-white border-t border-gray-200 mt-16">
            <div className="max-w-7xl mx-auto px-8 py-10">
                <div className="flex flex-col md:flex-row justify-between gap-10">
                    <div className="max-w-sm">
                        <h3 className={TEXT.default + TEXT.title}>
                            Taxi Service
                        </h3>
                        <p className={TEXT.accent_1 + ' mb-3'}>
                            Онлайн-сервис заказа такси для быстрых и комфортных поездок
                            по городу. Простота, безопасность и прозрачные цены.
                        </p>
                        <p className={TEXT.accent_2}>
                            © {new Date().getFullYear()} Taxi Service. Все права защищены.
                        </p>
                    </div>

                    <div>
                        <h4 className={TEXT.default + TEXT.subtitle}>
                            Навигация
                        </h4>
                        <ul className="flex flex-col gap-2">
                            <li>
                                <Link to="/" className={LINK.navbar}>
                                    Главная
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className={LINK.navbar}>
                                    Про нас
                                </Link>
                            </li>
                            <li>
                                <Link to="/career" className={LINK.navbar}>
                                    Карьера
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className={TEXT.default + TEXT.subtitle}>
                            Мы в соцсетях
                        </h4>
                        <ul className="flex flex-col gap-2">
                            <li>
                                <a href="#" className={LINK.navbar}>
                                    Facebook
                                </a>
                            </li>
                            <li>
                                <a href="#" className={LINK.navbar}>
                                    Instagram
                                </a>
                            </li>
                            <li>
                                <a href="#" className={LINK.navbar}>
                                    Twitter
                                </a>
                            </li>
                            <li>
                                <a href="#" className={LINK.navbar}>
                                    LinkedIn
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
