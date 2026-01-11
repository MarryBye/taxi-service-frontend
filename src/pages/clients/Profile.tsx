import React from "react";
import { Link } from "react-router-dom";

import { DefaultLayout } from "@/components/layout/DefaultLayout";
import { styleSheet } from "@/styles/Form";

import { useProfile, useClientStats } from "@/hooks/useClients";
import type { ClientStatView } from "@/types/views";

type TagStat = {
    tag: string;
    count: number;
};

export default function ProfilePage(): React.ReactElement {
    const {
        data: profile,
        loading: profileLoading,
        error: profileError,
    } = useProfile();

    const {
        data: stats,
        loading: statsLoading,
        error: statsError,
    } = useClientStats();

    if (profileLoading || statsLoading) {
        return (
            <DefaultLayout>
                <p className={styleSheet.textStyles.MUTED}>
                    Завантаження профілю…
                </p>
            </DefaultLayout>
        );
    }

    if (profileError || statsError || !profile || !stats) {
        return (
            <DefaultLayout>
                <div className={styleSheet.emphasisStyles.BOX_DANGER}>
                    Не вдалося завантажити профіль
                </div>
            </DefaultLayout>
        );
    }

    const tags: TagStat[] = stats.all_tags ?? [];

    return (
        <DefaultLayout>
            <section className={styleSheet.contentStyles.SECTION}>
                <div className={styleSheet.layoutStyles.STACK}>
                    <h1 className={styleSheet.textStyles.H1}>
                        Профіль
                    </h1>

                    {/* PROFILE */}
                    <div className={styleSheet.emphasisStyles.BOX}>
                        <div className={`${styleSheet.layoutStyles.GRID_2} mb-8`}>
                            <ProfileField label="Імʼя" value={profile.first_name} />
                            <ProfileField label="Прізвище" value={profile.last_name} />
                            <ProfileField label="Email" value={profile.email} />
                            <ProfileField label="Телефон" value={profile.tel_number} />
                            <ProfileField label="Роль" value={profile.role} />
                            <ProfileField
                                label="Місцезнаходження"
                                value={`${profile.city.country.full_name}, ${profile.city.name}`}
                            />
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <span className={styleSheet.inputStyles.BUTTON_SECONDARY}>
                                Баланс: {profile.payment_balance ?? 0} грн
                            </span>

                            <Link
                                to="/profile/edit"
                                className={styleSheet.inputStyles.BUTTON_SECONDARY}
                            >
                                Редагувати профіль
                            </Link>

                            <Link
                                to="/orders/history"
                                className={styleSheet.inputStyles.BUTTON_SECONDARY}
                            >
                                Історія замовлень
                            </Link>

                            <Link
                                to="/order"
                                className={styleSheet.inputStyles.BUTTON_PRIMARY}
                            >
                                Зробити замовлення
                            </Link>
                        </div>
                    </div>

                    {/* STATS */}
                    <div className={styleSheet.layoutStyles.GRID_3}>
                        <StatCard title="Усього поїздок" value={stats.rides_count} />
                        <StatCard title="Завершено" value={stats.finished_rides_count} />
                        <StatCard title="Скасовано" value={stats.canceled_rides_count} />
                    </div>

                    <div className={styleSheet.layoutStyles.GRID_2}>
                        <StatCard
                            title="Середня дистанція"
                            value={stats.average_distance ? `${stats.average_distance} км` : "—"}
                        />
                        <StatCard
                            title="Максимальна дистанція"
                            value={stats.max_distance ? `${stats.max_distance} км` : "—"}
                        />
                    </div>

                    {/* TAGS */}
                    <div className={styleSheet.emphasisStyles.BOX}>
                        <p className={`${styleSheet.textStyles.MUTED} mb-3`}>
                            Теги
                        </p>

                        {tags.length === 0 ? (
                            <p className={styleSheet.textStyles.SUBTLE}>—</p>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {tags.map(({ tag, count }) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 rounded text-sm bg-gray-100"
                                    >
                                        {tag} — {count}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </DefaultLayout>
    );
}

/* ===== UI helpers ===== */

function ProfileField({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className={styleSheet.textStyles.MUTED}>{label}</p>
            <p className={styleSheet.textStyles.DEFAULT}>{value}</p>
        </div>
    );
}

function StatCard({
                      title,
                      value,
                  }: {
    title: string;
    value: number | string;
}) {
    return (
        <div className={styleSheet.emphasisStyles.BOX}>
            <p className={styleSheet.textStyles.MUTED}>{title}</p>
            <p className={styleSheet.textStyles.H2}>{value}</p>
        </div>
    );
}
