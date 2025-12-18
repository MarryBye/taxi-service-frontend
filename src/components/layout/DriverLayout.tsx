import React from "react";

import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";

export function DriverLayout({
                                 left,
                                 right,
                             }: {
    left: React.ReactNode;
    right: React.ReactNode;
}): React.ReactElement {
    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Header />

            <main className="flex-1">
                <div className="mx-auto max-w-7xl px-6 py-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <aside className="lg:col-span-1">
                            <div className="border border-gray-200 rounded p-6 bg-white">
                                {left}
                            </div>
                        </aside>

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
