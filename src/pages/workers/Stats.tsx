import React from "react";
import { Link } from "react-router-dom";

import { DriverLayout } from "@/components/layout/DriverLayout";

import { TEXT } from "@/styles/Text";
import { BUTTON } from "@/styles/Button";

import { useDriverStats } from "@/hooks/useDrivers";

import type { DriversStatView } from "@/types/views";
import type * as enums from "@/types/enums/db";

/* ===== helpers для тегов ===== */

const DRIVER_TAGS: enums.DriverTags[] = [
    "accurate",
    "fast",
    "friendly",
    "clean",
    "modern_car",
    "polite",
    "communicative",
    "helpful",
    "smooth_driving",
    "safe_driving",
    "good_navigation",
    "other",
];

const DRIVER_CANCEL_TAGS: enums.DriverCancelTags[] = [
    "client_not_responding",
    "client_not_at_pickup_point",
    "vehicle_breakdown",
    "traffic_accident",
    "unsafe_pickup_location",
    "route_unreachable",
    "emergency",
    "other",
];

function isDriverTag(
    tag: enums.DriverTags | enums.DriverCancelTags
): tag is enums.DriverTags {
    return DRIVER_TAGS.includes(tag as enums.DriverTags);
}

function isDriverCancelTag(
    tag: enums.DriverTags | enums.DriverCancelTags
): tag is enums.DriverCancelTags {
    return DRIVER_CANCEL_TAGS.includes(tag as enums.DriverCancelTags);
}

/* ================================= */

export default function DriverStatsPage(): React.ReactElement {
    const { data, loading, error } = useDriverStats();

    if (loading) {
        return (
            <DriverLayout
                left={null}
                right={<p className={TEXT.accent_1}>Загрузка статистики…</p>}
            />
        );
    }

    if (error || !data) {
        return (
            <DriverLayout
                left={null}
                right={
                    <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded">
                        Не удалось загрузить статистику водителя
                    </div>
                }
            />
        );
    }

    const stats: DriversStatView = data;

    const positiveTags = stats.all_tags?.filter(isDriverTag) ?? [];
    const cancelTags = stats.all_tags?.filter(isDriverCancelTag) ?? [];

    return (
        <DriverLayout
            left={null}
            right={
                <section className="max-w-7xl mx-auto px-8 py-16 flex flex-col gap-10">
                    {/* HEADER */}
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                        <div>
                            <h1 className={`${TEXT.title} text-3xl mb-2`}>
                                Статистика водителя
                            </h1>
                            <p className={TEXT.accent_1}>
                                Показатели вашей работы
                            </p>
                        </div>

                        <Link to="/worker" className={BUTTON.transparent}>
                            ← Назад в панель
                        </Link>
                    </div>

                    {/* STATS */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <StatCard title="Поездок всего" value={stats.rides_count} />
                        <StatCard
                            title="Завершено"
                            value={stats.finished_rides_count}
                            color="text-green-600"
                        />
                        <StatCard
                            title="Отменено"
                            value={stats.canceled_rides_count}
                            color="text-red-600"
                        />
                        <StatCard
                            title="Рейтинг"
                            value={stats.driver_rating ?? "—"}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <StatCard
                            title="Средняя дистанция"
                            value={
                                stats.average_distance
                                    ? `${stats.average_distance} км`
                                    : "—"
                            }
                        />
                        <StatCard
                            title="Максимальная дистанция"
                            value={
                                stats.max_distance
                                    ? `${stats.max_distance} км`
                                    : "—"
                            }
                        />
                    </div>

                    {/* TAGS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TagsBlock
                            title="Теги от клиентов"
                            tags={positiveTags}
                            color="bg-green-100"
                        />
                        <TagsBlock
                            title="Причины отмен"
                            tags={cancelTags}
                            color="bg-red-100"
                        />
                    </div>
                </section>
            }
        />
    );
}

/* ===== UI helpers ===== */

function StatCard({
                      title,
                      value,
                      color = "",
                  }: {
    title: string;
    value: number | string;
    color?: string;
}) {
    return (
        <div className="border border-gray-200 rounded p-6 bg-white">
            <p className={TEXT.accent_2}>{title}</p>
            <p className={`text-2xl font-semibold ${color}`}>
                {value}
            </p>
        </div>
    );
}

function TagsBlock({
                       title,
                       tags,
                       color,
                   }: {
    title: string;
    tags: string[];
    color: string;
}) {
    return (
        <div className="border border-gray-200 rounded p-6 bg-white">
            <p className={`${TEXT.accent_2} mb-3`}>{title}</p>

            {tags.length === 0 ? (
                <p className="text-gray-400">—</p>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className={`px-3 py-1 rounded text-sm ${color}`}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
