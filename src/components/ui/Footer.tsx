import React from "react";
import { Link } from "react-router-dom";

import { styleSheet } from "@/styles/Form";

export function Footer(): React.ReactElement {
    return (
        <footer className="bg-white border-t border-gray-200 mt-16">
            <div className="max-w-7xl mx-auto px-8 py-10">
                <div className="flex flex-col md:flex-row justify-between gap-10">

                    <div className="max-w-sm">
                        <h3 className={`${styleSheet.textStyles.H3} mb-2`}>
                            Taxi Service
                        </h3>

                        <p className={`${styleSheet.textStyles.SMALL} mb-3`}>
                            Онлайн-сервіс замовлення таксі для швидких і комфортних
                            поїздок містом. Простота, безпека та прозорі ціни.
                        </p>

                        <p className={styleSheet.textStyles.MUTED}>
                            © {new Date().getFullYear()} Taxi Service.
                            Усі права захищені.
                        </p>
                    </div>

                    <div>
                        <h4 className={`${styleSheet.textStyles.H4} mb-3`}>
                            Навігація
                        </h4>

                        <ul className="flex flex-col gap-2">
                            <li>
                                <Link
                                    to="/"
                                    className={styleSheet.textStyles.LINK}
                                >
                                    Головна
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className={styleSheet.textStyles.LINK}
                                >
                                    Про нас
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/career"
                                    className={styleSheet.textStyles.LINK}
                                >
                                    Карʼєра
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className={`${styleSheet.textStyles.H4} mb-3`}>
                            Ми в соцмережах
                        </h4>

                        <ul className="flex flex-col gap-2">
                            <li>
                                <a href="#" className={styleSheet.textStyles.LINK}>
                                    Facebook
                                </a>
                            </li>
                            <li>
                                <a href="#" className={styleSheet.textStyles.LINK}>
                                    Instagram
                                </a>
                            </li>
                            <li>
                                <a href="#" className={styleSheet.textStyles.LINK}>
                                    Twitter
                                </a>
                            </li>
                            <li>
                                <a href="#" className={styleSheet.textStyles.LINK}>
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
