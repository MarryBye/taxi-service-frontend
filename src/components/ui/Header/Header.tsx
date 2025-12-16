import React from 'react';
import { HeaderLogo } from './HeaderLogo';
import { HeaderNav } from './HeaderNav';
import { HeaderActions } from './HeaderActions';

export function HeaderElement(): React.ReactElement {
    return (
        <header className="w-full border-b border-gray-200 bg-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <HeaderLogo />
                <HeaderNav />
                <HeaderActions />
            </div>
        </header>
    );
}
