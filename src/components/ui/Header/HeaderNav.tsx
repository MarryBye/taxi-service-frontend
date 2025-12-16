import React from 'react';
import {Link} from "react-router-dom";

const navItemClass =
    'text-sm font-medium text-gray-600 hover:text-black transition-colors';

export function HeaderNav(): React.ReactElement {
    return (
        <nav className="hidden md:flex items-center gap-8">
            <Link to='/' className={navItemClass}>
                Главная
            </Link>
            <Link to='/about' className={navItemClass}>
                Про нас
            </Link>
            <Link to='/careers' className={navItemClass}>
                Карьера
            </Link>
        </nav>
    );
}
