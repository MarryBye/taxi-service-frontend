import React from "react";
import { Link } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";

import { TEXT } from "@/styles/Text";
import { BUTTON } from "@/styles/Button";

export default function AdminDashboard(): React.ReactElement {
    return (
        <AdminLayout>
            <section className="flex flex-col gap-10">
                <div>
                    <h1 className={`${TEXT.title} text-3xl mb-2`}>
                        Админ панель
                    </h1>
                    <p className={TEXT.accent_1}>
                        Управление системой такси
                    </p>
                </div>
            </section>
        </AdminLayout>
    );
}
