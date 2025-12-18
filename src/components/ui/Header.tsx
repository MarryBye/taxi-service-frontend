import React from "react";
import { Link } from "react-router-dom";

import { TEXT } from "@/styles/Text"
import { LINK } from "@/styles/Link";
import { BUTTON } from "@/styles/Button";
import { RequireRole } from "@/components/restrictors/RoleRequire";
import { useAuth } from "@/hooks/useAuth";

export function Header(): React.ReactElement {
    const { logout } = useAuth();
    return (
        <header className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
                <div className="flex items-center gap-10">
                    <Link to="/" className="text-xl font-semibold text-black hover:underline cursor-pointer">
                        Taxi Service
                    </Link>

                    <nav className="flex items-center gap-6">
                        <Link to="/" className={LINK.navbar}>
                            Главная
                        </Link>
                        <Link to="/about" className={LINK.navbar}>
                            Про нас
                        </Link>
                        <Link to="/career" className={LINK.navbar}>
                            Карьера
                        </Link>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <RequireRole needRoles={['guest']}>
                        <Link to="/login" className={LINK.navbar}>
                            Войти
                        </Link>
                    </RequireRole>

                    <RequireRole needRoles={['guest']}>
                        <Link to="/register" className={LINK.navbar}>
                            Регистрация
                        </Link>
                    </RequireRole>

                    <RequireRole needRoles={['guest']} invert={true}>
                        <Link to="/profile" className={LINK.navbar}>
                            Профиль
                        </Link>
                    </RequireRole>
                    <RequireRole needRoles={['guest']} invert={true}>
                        <Link to="/order" className={BUTTON.default}>
                            Сделать заказ
                        </Link>
                    </RequireRole>

                    
                    <RequireRole needRoles={['admin']}>
                        <Link to="/admin" className={BUTTON.transparent}>
                            Админ панель
                        </Link>
                    </RequireRole>

                    <RequireRole needRoles={['driver']}>
                        <Link to="/worker" className={BUTTON.transparent}>
                            Панель водителя
                        </Link>
                    </RequireRole>

                    <RequireRole needRoles={['guest']} invert={true}>
                        <button onClick={logout} className={BUTTON.transparent}>
                            Выйти
                        </button>
                    </RequireRole>
                </div>
            </div>
        </header>
    );
}
