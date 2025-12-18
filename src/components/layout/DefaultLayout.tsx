import React from 'react';

import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";

export function DefaultLayout({
                                  children,
                              }: React.PropsWithChildren): React.ReactElement {
    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Header />

            <main className="flex-1">
                <div className="mx-auto w-full max-w-7xl px-6 py-10">
                    {children}
                </div>
            </main>

            <Footer />
        </div>
    );
}
