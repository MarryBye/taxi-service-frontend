import React from "react";
import { Link } from "react-router-dom";

import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";

import { TEXT } from "@/styles/Text";
import { LINK } from "@/styles/Link";

import { AdminNav } from "@/components/ui/AdminNav";

export function AdminLayout({
                                children,
                            }: React.PropsWithChildren): React.ReactElement {
    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Header />

            <main className="flex flex-1">
                <aside className="w-64 border-r border-gray-200 bg-white px-6 py-8">
                    <h2 className={`${TEXT.title} text-lg mb-6`}>
                        Админ панель
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
