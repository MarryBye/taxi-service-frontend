import React from "react";

import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { AdminNav } from "@/components/ui/AdminNav";

import { styleSheet } from "@/styles/Form";

export function AdminLayout({
                                children,
                            }: React.PropsWithChildren): React.ReactElement {
    return (
        <div className={styleSheet.layoutStyles.PAGE}>
            <Header />

            <main className="flex flex-1">
                <aside className="w-64 border-r border-gray-200 bg-white px-6 py-8">
                    <h2 className={`${styleSheet.textStyles.H3} mb-6`}>
                        Адмін-панель
                    </h2>

                    <AdminNav />
                </aside>

                <section className="flex-1 px-8 py-10">
                    {children}
                </section>
            </main>

            <Footer />
        </div>
    );
}
