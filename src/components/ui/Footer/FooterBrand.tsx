import React from 'react';

export function FooterBrand(): React.ReactElement {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-400 font-bold text-black">
                    🚕
                </div>
                <span className="text-lg font-semibold text-gray-900">
                    TaxiService
                </span>
            </div>

            <p className="text-sm text-gray-600">
                Надёжный сервис такси для города и поездок между городами.
                Быстро, безопасно и удобно.
            </p>
        </div>
    );
}
