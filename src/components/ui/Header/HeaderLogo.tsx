import React from 'react';

import { Link } from 'react-router-dom';

export function HeaderLogo(): React.ReactElement {
    return (
        <Link to='/'>
            <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-400 font-bold text-black">
                    🚕
                </div>
                <span className="text-lg font-semibold tracking-wide text-gray-900">
                    TaxiService
                </span>
            </div>
        </Link>
    );
}
