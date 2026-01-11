import React from "react";
import { Link } from "react-router-dom";

import { DriverLayout } from "@/components/layout/DriverLayout";
import { styleSheet } from "@/styles/Form";

import { useDriverStats } from "@/hooks/useDrivers";

import type { DriversStatView } from "@/types/views";
import type * as enums from "@/types/enums/db";
import {DefaultLayout} from "@/components/layout/DefaultLayout";

/* ===== helpers для тегів ===== */

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
                right={
                    <p className={styleSheet.textStyles.SUBTLE}>
                        Завантаження статистики…
                    </p>
                }
            />
        );
    }

    if (error || !data) {
        return (
            <DriverLayout
                left={null}
                right={
                    <div
                        className={`${styleSheet.otherStyles.BADGE_ERROR} px-4 py-3 rounded`}
                    >
                        Не вдалося завантажити статистику водія
                    </div>
                }
            />
        );
    }

    const stats: DriversStatView = data;

    const positiveTags = stats.all_tags?.filter(isDriverTag) ?? [];
    const cancelTags = stats.all_tags?.filter(isDriverCancelTag) ?? [];

    return (
        <DefaultLayout>
            <section
                className={`${styleSheet.contentStyles.SECTION} flex flex-col gap-10`}
            >
                {/* HEADER */}
                <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div>
                        <h1
                            className={`${styleSheet.textStyles.H1} mb-2`}
                        >
                            Статистика водія
                        </h1>

                        <p className={styleSheet.textStyles.PARAGRAPH}>
                            Показники вашої роботи
                        </p>
                    </div>

                    <Link
                        to="/driver"
                        className={styleSheet.inputStyles.BUTTON_SECONDARY}
                    >
                        ← Назад до панелі
                    </Link>
                </div>

                {/* STATS */}
                <div
                    className="grid grid-cols-1 md:grid-cols-4 gap-6"
                >
                    <StatCard
                        title="Поїздок усього"
                        value={stats.rides_count}
                    />
                    <StatCard
                        title="Завершено"
                        value={stats.finished_rides_count}
                        color={styleSheet.textStyles.SUCCESS}
                    />
                    <StatCard
                        title="Скасовано"
                        value={stats.canceled_rides_count}
                        color={styleSheet.textStyles.ERROR}
                    />
                    <StatCard
                        title="Рейтинг"
                        value={stats.driver_rating ?? "—"}
                    />
                </div>

                <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    <StatCard
                        title="Середня дистанція"
                        value={
                            stats.average_distance
                                ? `${stats.average_distance} км`
                                : "—"
                        }
                    />
                    <StatCard
                        title="Максимальна дистанція"
                        value={
                            stats.max_distance
                                ? `${stats.max_distance} км`
                                : "—"
                        }
                    />
                </div>

                {/* TAGS */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    <TagsBlock
                        title="Теги від клієнтів"
                        tags={positiveTags}
                        color={styleSheet.otherStyles.BADGE_SUCCESS}
                    />
                    <TagsBlock
                        title="Причини скасувань"
                        tags={cancelTags}
                        color={styleSheet.otherStyles.BADGE_ERROR}
                    />
                </div>
            </section>
        </DefaultLayout>
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
        <div className={styleSheet.containerStyles.CARD}>
            <p className={styleSheet.textStyles.MUTED}>
                {title}
            </p>

            <p
                className={`${styleSheet.textStyles.STRONG} text-2xl ${color}`}
            >
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
        <div className={styleSheet.containerStyles.CARD}>
            <p
                className={`${styleSheet.textStyles.MUTED} mb-3`}
            >
                {title}
            </p>

            {tags.length === 0 ? (
                <p className={styleSheet.textStyles.MUTED}>
                    —
                </p>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className={`${styleSheet.otherStyles.BADGE} ${color}`}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
