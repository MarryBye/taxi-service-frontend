import React from "react";

import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";

import { styleSheet } from "@/styles/Form";

export function DriverLayout({
    left,
    right,
}: {
    left: React.ReactNode;
    right: React.ReactNode;
}): React.ReactElement {
    return (
        <div className={styleSheet.layoutStyles.PAGE}>
            <Header />

            <main className="flex-1">
                <div className={styleSheet.containerStyles.PAGE}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Ліва панель */}
                        <aside className="lg:col-span-1">
                            <div className={styleSheet.emphasisStyles.BOX}>
                                {left}
                            </div>
                        </aside>

                        {/* Основний контент */}
                        <section className="lg:col-span-2">
                            {right}
                        </section>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
