import React from "react";
import { Link } from "react-router-dom";

import { DefaultLayout } from "@/components/layout/DefaultLayout";
import { styleSheet } from "@/styles/Form";

import { useDriverStats } from "@/hooks/useDrivers";
import type { DriversStatView } from "@/types/views";

type TagStat = {
    tag: string;
    count: number;
};

export default function DriverStatsPage(): React.ReactElement {
    const { data, loading, error } = useDriverStats();

    if (loading) {
        return (
            <DefaultLayout>
                <p className={styleSheet.textStyles.MUTED}>
                    Завантаження статистики…
                </p>
            </DefaultLayout>
        );
    }

    if (error || !data) {
        return (
            <DefaultLayout>
                <div className={styleSheet.emphasisStyles.BOX_DANGER}>
                    Не вдалося завантажити статистику водія
                </div>
            </DefaultLayout>
        );
    }

    const stats: DriversStatView = data;
    const tags: TagStat[] = stats.all_tags ?? [];

    return (
        <DefaultLayout>
            <section className={styleSheet.contentStyles.SECTION}>
                <div className={styleSheet.layoutStyles.STACK}>
                    <h1 className={styleSheet.textStyles.H1}>
                        Статистика водія
                    </h1>

                    <div className="flex flex-wrap gap-4">
                        <Link
                            to="/driver"
                            className={styleSheet.inputStyles.BUTTON_SECONDARY}
                        >
                            Назад до панелі
                        </Link>
                    </div>

                    {/* MAIN STATS */}
                    <div className={styleSheet.layoutStyles.GRID_3}>
                        <StatCard title="Усього поїздок" value={stats.rides_count} />
                        <StatCard title="Завершено" value={stats.finished_rides_count} />
                        <StatCard title="Скасовано" value={stats.canceled_rides_count} />
                    </div>

                    {/* EXTRA STATS */}
                    <div className={styleSheet.layoutStyles.GRID_3}>
                        <StatCard title="Рейтинг" value={stats.driver_rating ?? "—"} />
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

/* ===== helpers ===== */

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
