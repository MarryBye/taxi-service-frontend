import React from "react";
import { Link } from "react-router-dom";

import { DefaultLayout } from "@/components/layout/DefaultLayout";

import { TEXT } from "@/styles/Text";
import { BUTTON } from "@/styles/Button";

import { useProfile, useClientStats } from "@/hooks/useClients";

import type * as enums from "@/types/enums/db";

/* ===== helpers ===== */

const CLIENT_TAGS: enums.ClientTags[] = [
    "accurate",
    "friendly",
    "respectful",
    "communicative",
    "polite",
    "on_time",
    "clear_instructions",
    "calm",
    "helpful",
    "other",
];

const CLIENT_CANCEL_TAGS: enums.ClientCancelTags[] = [
    "driver_too_far",
    "long_wait_time",
    "changed_plans",
    "wrong_pickup_location",
    "found_another_transport",
    "driver_not_responding",
    "price_too_high",
    "emergency",
    "other",
];

function isClientTag(
    tag: enums.ClientTags | enums.ClientCancelTags
): tag is enums.ClientTags {
    return CLIENT_TAGS.includes(tag as enums.ClientTags);
}

function isClientCancelTag(
    tag: enums.ClientTags | enums.ClientCancelTags
): tag is enums.ClientCancelTags {
    return CLIENT_CANCEL_TAGS.includes(tag as enums.ClientCancelTags);
}

/* =================== */

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
                <p className={TEXT.accent_1}>Загрузка профиля…</p>
            </DefaultLayout>
        );
    }

    if (profileError || statsError || !profile) {
        return (
            <DefaultLayout>
                <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded">
                    Не удалось загрузить профиль
                </div>
            </DefaultLayout>
        );
    }

    const positiveTags = stats?.all_tags?.filter(isClientTag) ?? [];
    const cancelTags = stats?.all_tags?.filter(isClientCancelTag) ?? [];

    return (
        <DefaultLayout>
            <section className="max-w-5xl mx-auto px-8 py-16 flex flex-col gap-10">
                <h1 className={`${TEXT.title} text-3xl`}>
                    Профиль
                </h1>

                {/* PROFILE */}
                <div className="border border-gray-200 rounded p-8 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <ProfileField label="Имя" value={profile.first_name} />
                        <ProfileField label="Фамилия" value={profile.last_name} />
                        <ProfileField label="Email" value={profile.email} />
                        <ProfileField label="Телефон" value={profile.tel_number} />
                        <ProfileField label="Роль" value={profile.role} />
                        <ProfileField
                            label="Месторасположение"
                            value={`${profile.city.country.full_name}, ${profile.city.name}`}
                        />
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <span className={BUTTON.transparent}>
                            Баланс: {profile.payment_balance ?? 0} грн
                        </span>

                        <Link to="/profile/edit" className={BUTTON.transparent}>
                            Редактировать профиль
                        </Link>

                        <Link to="/orders/history" className={BUTTON.transparent}>
                            История заказов
                        </Link>

                        <Link to="/order" className={BUTTON.default}>
                            Сделать заказ
                        </Link>
                    </div>
                </div>

                {/* STATS */}
                {stats && (
                    <>
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
                                value={stats.client_rating ?? "—"}
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <TagsBlock
                                title="Теги от водителей"
                                tags={positiveTags}
                                color="bg-green-100"
                            />
                            <TagsBlock
                                title="Причины отмен"
                                tags={cancelTags}
                                color="bg-red-100"
                            />
                        </div>
                    </>
                )}
            </section>
        </DefaultLayout>
    );
}

/* ===== UI helpers ===== */

function ProfileField({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className={TEXT.accent_2}>{label}</p>
            <p className={TEXT.default}>{value}</p>
        </div>
    );
}

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
