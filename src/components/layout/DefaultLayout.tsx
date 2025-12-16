import React from 'react';

import { HeaderElement } from '@/components/ui/Header/Header';
import { FooterElement } from '@/components/ui/Footer/Footer';

export function DefaultLayout({
                                  children,
                              }: React.PropsWithChildren): React.ReactElement {
    return (
        <div className="flex min-h-screen flex-col bg-white">
            <HeaderElement />

            <main className="flex-1">
                <div className="mx-auto w-full max-w-7xl px-6 py-10">
                    {children}
                </div>
            </main>

            <FooterElement />
        </div>
    );
}
