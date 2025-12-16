import React from 'react';

const linkClass =
    'text-sm text-gray-600 hover:text-black transition-colors';

export function FooterNav(): React.ReactElement {
    return (
        <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-gray-900">
                Навигация
            </h4>

            <a href="#" className={linkClass}>
                Главная
            </a>
            <a href="#" className={linkClass}>
                Про нас
            </a>
            <a href="#" className={linkClass}>
                Карьера
            </a>
            <a href="#" className={linkClass}>
                Контакты
            </a>
        </div>
    );
}
