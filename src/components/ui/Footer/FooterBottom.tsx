import React from 'react';

export function FooterBottom(): React.ReactElement {
    return (
        <div className="border-t border-gray-200 bg-white">
            <div className="mx-auto max-w-7xl px-6 py-4 text-center">
                <p className="text-xs text-gray-500">
                    © {new Date().getFullYear()} TaxiService. Все права защищены.
                </p>
            </div>
        </div>
    );
}
