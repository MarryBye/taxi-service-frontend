import React from "react";

import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";

import { styleSheet } from "@/styles/Form";

export function DefaultLayout({
    children,
}: React.PropsWithChildren): React.ReactElement {
    return (
        <div className={styleSheet.layoutStyles.PAGE}>
            <Header />

            <main className="flex-1">
                <div className={styleSheet.containerStyles.PAGE}>
                    {children}
                </div>
            </main>

            <Footer />
        </div>
    );
}
