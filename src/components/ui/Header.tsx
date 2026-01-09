import React from "react";
import { Link } from "react-router-dom";

import { RequireRole } from "@/components/restrictors/RoleRequire";
import { useAuth } from "@/hooks/useAuth";

import { styleSheet } from "@/styles/Form";

export function Header(): React.ReactElement {
    const { logout } = useAuth();

    return (
        <header className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">

                <div className="flex items-center gap-10">
                    <Link
                        to="/"
                        className={`${styleSheet.textStyles.H3} ${styleSheet.textStyles.LINK_NO_DECORATION}`}
                    >
                        Taxi Service
                    </Link>

                    <nav className="flex items-center gap-6">
                        <Link
                            to="/"
                            className={styleSheet.textStyles.LINK_NO_DECORATION}
                        >
                            Головна
                        </Link>

                        <Link
                            to="/about"
                            className={styleSheet.textStyles.LINK_NO_DECORATION}
                        >
                            Про нас
                        </Link>

                        <Link
                            to="/career"
                            className={styleSheet.textStyles.LINK_NO_DECORATION}
                        >
                            Карʼєра
                        </Link>
                    </nav>
                </div>

                <div className="flex items-center gap-4">

                    <RequireRole needRoles={["guest"]}>
                        <Link
                            to="/login"
                            className={styleSheet.textStyles.LINK_NO_DECORATION}
                        >
                            Увійти
                        </Link>
                    </RequireRole>

                    <RequireRole needRoles={["guest"]}>
                        <Link
                            to="/register"
                            className={styleSheet.textStyles.LINK_NO_DECORATION}
                        >
                            Реєстрація
                        </Link>
                    </RequireRole>

                    <RequireRole needRoles={["guest"]} invert>
                        <Link
                            to="/profile"
                            className={styleSheet.textStyles.LINK_NO_DECORATION}
                        >
                            Профіль
                        </Link>
                    </RequireRole>

                    <RequireRole needRoles={["guest"]} invert>
                        <Link
                            to="/order"
                            className={styleSheet.textStyles.LINK_NO_DECORATION}
                        >
                            Замовити поїздку
                        </Link>
                    </RequireRole>

                    <RequireRole needRoles={["admin"]}>
                        <Link
                            to="/admin"
                            className={styleSheet.textStyles.LINK_NO_DECORATION}
                        >
                            Адмін-панель
                        </Link>
                    </RequireRole>

                    <RequireRole needRoles={["driver"]}>
                        <Link
                            to="/driver"
                            className={styleSheet.textStyles.LINK_NO_DECORATION}
                        >
                            Панель водія
                        </Link>
                    </RequireRole>

                    <RequireRole needRoles={["guest"]} invert>
                        <button
                            onClick={logout}
                            className={styleSheet.textStyles.LINK_NO_DECORATION}
                        >
                            Вийти
                        </button>
                    </RequireRole>

                </div>
            </div>
        </header>
    );
}
