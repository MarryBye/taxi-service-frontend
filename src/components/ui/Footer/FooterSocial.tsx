import React from 'react';

const iconClass =
    'flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition';

export function FooterSocial(): React.ReactElement {
    return (
        <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-gray-900">
                Мы в соцсетях
            </h4>

            <div className="flex gap-3">
                <a href="#" className={iconClass}>📘</a>
                <a href="#" className={iconClass}>📸</a>
                <a href="#" className={iconClass}>🐦</a>
            </div>
        </div>
    );
}
