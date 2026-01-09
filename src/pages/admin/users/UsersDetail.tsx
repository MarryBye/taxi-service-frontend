import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { styleSheet } from "@/styles/Form";

import {
    useUserInfo,
    useDeleteUser, useClientStats, useDriverStats,
} from "@/hooks/useAdmin";

import type { UsersView } from "@/types/views";
import {FaBackward, FaPlus} from "react-icons/fa";
import {LoaderBlock} from "@/components/ui/Loader";

export default function AdminUserDetailPage(): React.ReactElement {
    const navigate = useNavigate();
    const { userId } = useParams<{ userId: string }>();
    const id = userId ? Number(userId) : null;

    const { data: user, loading: userLoading, error: userError } = useUserInfo(id);
    const { data: clientInfo, loading: clientInfoLoading, error: clientInfoError } = useClientStats(id);
    const { data: driverInfo, loading: driverInfoLoading, error: driverInfoError } = useDriverStats(id);

    if (userLoading || clientInfoLoading || driverInfoLoading) {
        return (
            <AdminLayout>
                <LoaderBlock />
            </AdminLayout>
        );
    }

    if (userError) {
        return (
            <AdminLayout>
                <div className={styleSheet.emphasisStyles.BOX_DANGER}>
                    Помилка завантаження користувача
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <section
                className={`${styleSheet.contentStyles.SECTION_NARROW} flex flex-col gap-8`}
            >
                <div
                    className="flex flex-col md:flex-row justify-between gap-6"
                >
                    <div>
                        <h1
                            className={`${styleSheet.textStyles.H1} mb-2`}
                        >
                            Користувачі
                        </h1>

                        <p className={styleSheet.textStyles.SMALL}>
                            Інформація про користувача
                        </p>
                    </div>

                    <Link
                        to="/admin/users"
                        className={styleSheet.inputStyles.BUTTON_SECONDARY}
                    >
                        <div className={styleSheet.containerStyles.ROW_SMALL_GAP}>
                            <FaBackward/> Повернутись
                        </div>
                    </Link>
                </div>

                <div className={styleSheet.containerStyles.CARD}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>Повне імʼя</p>
                            <p className={styleSheet.textStyles.BOLD}>
                                {user!.first_name} {user!.last_name}
                            </p>
                        </div>

                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>Роль</p>
                            <p className={styleSheet.textStyles.DEFAULT}>
                                {user!.role}
                            </p>
                        </div>

                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>Електронна пошта</p>
                            <p className={styleSheet.textStyles.DEFAULT}>
                                {user!.email}
                            </p>
                        </div>

                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>Номер телефону</p>
                            <p className={styleSheet.textStyles.DEFAULT}>
                                {user!.tel_number}
                            </p>
                        </div>

                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>Місцезнаходження</p>
                            <p className={styleSheet.textStyles.DEFAULT}>
                                {user!.city.country.full_name}, {user!.city.name}
                            </p>
                        </div>

                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>Дата створення</p>
                            <p className={styleSheet.textStyles.SMALL}>
                                {new Date(user!.created_at).toLocaleString()}
                            </p>
                        </div>

                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>Останнє оновлення</p>
                            <p className={styleSheet.textStyles.SMALL}>
                                {new Date(user!.changed_at).toLocaleString()}
                            </p>
                        </div>
                    </div>

                    <hr className={styleSheet.otherStyles.DIVIDER} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>Платіжний баланс</p>
                            <p className={styleSheet.textStyles.EMPHASIS}>
                                {user!.payment_balance} грн
                            </p>
                        </div>

                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>Заробіток</p>
                            <p className={styleSheet.textStyles.EMPHASIS}>
                                {user!.earning_balance} грн
                            </p>
                        </div>
                    </div>

                    {clientInfo && (
                        <>
                            <hr className={styleSheet.otherStyles.DIVIDER} />

                            <div>
                                <h3 className={styleSheet.textStyles.H3}>
                                    Статистика клієнта
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                                    <Stat label="Поїздок всього" value={clientInfo.rides_count} />
                                    <Stat label="Завершено" value={clientInfo.finished_rides_count} />
                                    <Stat label="Скасовано" value={clientInfo.canceled_rides_count} />
                                    <Stat
                                        label="Рейтинг"
                                        value={clientInfo.client_rating ?? "—"}
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {driverInfo && (
                        <>
                            <hr className={styleSheet.otherStyles.DIVIDER} />

                            <div>
                                <h3 className={styleSheet.textStyles.H3}>
                                    Статистика водія
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                                    <Stat label="Поїздок всього" value={driverInfo.rides_count} />
                                    <Stat label="Завершено" value={driverInfo.finished_rides_count} />
                                    <Stat label="Скасовано" value={driverInfo.canceled_rides_count} />
                                    <Stat
                                        label="Рейтинг"
                                        value={driverInfo.driver_rating ?? "—"}
                                    />
                                </div>

                                <div className="mt-4">
                                    <p className={styleSheet.textStyles.SUBTLE}>Автомобіль</p>
                                    <p className={styleSheet.textStyles.DEFAULT}>
                                        {driverInfo.car
                                            ? `${driverInfo.car.mark} ${driverInfo.car.model}`
                                            : "Не призначено"}
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className={styleSheet.containerStyles.ROW}>
                    <Link
                        to={`/admin/users/${user!.id}/edit`}
                        className={styleSheet.inputStyles.BUTTON_WARNING}
                    >
                        Редагувати
                    </Link>

                    <Link
                        to={`/admin/users/${user!.id}/delete`}
                        className={styleSheet.inputStyles.BUTTON_DANGER}
                    >
                        Видалити
                    </Link>
                </div>
            </section>
        </AdminLayout>
    );
}

function Stat({
    label,
    value,
}: {
    label: string;
    value: number | string;
}) {
    return (
        <div className={styleSheet.emphasisStyles.BOX}>
            <p className={styleSheet.textStyles.SUBTLE}>{label}</p>
            <p className={styleSheet.textStyles.STRONG}>{value}</p>
        </div>
    );
}
