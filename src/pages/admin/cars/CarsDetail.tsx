import React from "react";
import { Link, useParams } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { styleSheet } from "@/styles/Form";

import { useCarInfo } from "@/hooks/useAdmin";
import type { CarsView } from "@/types/views";

import { FaBackward } from "react-icons/fa";
import { LoaderBlock } from "@/components/ui/Loader";

export default function AdminCarDetailPage(): React.ReactElement {
    const { carId } = useParams<{ carId: string }>();
    const id = carId ? Number(carId) : null;

    const { data: car, loading: carLoading, error: carError } = useCarInfo(id);

    if (carLoading) {
        return (
            <AdminLayout>
                <LoaderBlock />
            </AdminLayout>
        );
    }

    if (carError || !car) {
        return (
            <AdminLayout>
                <div className={styleSheet.emphasisStyles.BOX_DANGER}>
                    Помилка завантаження автомобіля
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <section
                className={`${styleSheet.contentStyles.SECTION_NARROW} flex flex-col gap-8`}
            >
                <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div>
                        <h1 className={`${styleSheet.textStyles.H1} mb-2`}>
                            Автомобілі
                        </h1>

                        <p className={styleSheet.textStyles.SMALL}>
                            Інформація про автомобіль
                        </p>
                    </div>

                    <Link
                        to="/admin/cars"
                        className={styleSheet.inputStyles.BUTTON_SECONDARY}
                    >
                        <div className={styleSheet.containerStyles.ROW_SMALL_GAP}>
                            <FaBackward /> Повернутись
                        </div>
                    </Link>
                </div>

                <div className={styleSheet.containerStyles.CARD}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>Марка</p>
                            <p className={styleSheet.textStyles.BOLD}>
                                {car.mark}
                            </p>
                        </div>

                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>Модель</p>
                            <p className={styleSheet.textStyles.DEFAULT}>
                                {car.model}
                            </p>
                        </div>

                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>Номерний знак</p>
                            <p className={styleSheet.textStyles.DEFAULT}>
                                {car.number_plate}
                            </p>
                        </div>

                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>Колір</p>
                            <p className={styleSheet.textStyles.DEFAULT}>
                                {car.color}
                            </p>
                        </div>

                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>Клас авто</p>
                            <p className={styleSheet.textStyles.DEFAULT}>
                                {car.car_class}
                            </p>
                        </div>

                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>Статус</p>
                            <p className={styleSheet.textStyles.DEFAULT}>
                                {car.car_status}
                            </p>
                        </div>

                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>Місцезнаходження</p>
                            <p className={styleSheet.textStyles.DEFAULT}>
                                {car.city.country.full_name}, {car.city.name}
                            </p>
                        </div>

                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>Дата створення</p>
                            <p className={styleSheet.textStyles.SMALL}>
                                {new Date(car.created_at).toLocaleString()}
                            </p>
                        </div>

                        <div>
                            <p className={styleSheet.textStyles.SUBTLE}>Останнє оновлення</p>
                            <p className={styleSheet.textStyles.SMALL}>
                                {new Date(car.changed_at).toLocaleString()}
                            </p>
                        </div>
                    </div>

                    <hr className={styleSheet.otherStyles.DIVIDER} />

                    <div>
                        <p className={styleSheet.textStyles.SUBTLE}>Водій</p>
                        <p className={styleSheet.textStyles.DEFAULT}>
                            {car.driver
                                ?   (
                                        <Link
                                            to={`/admin/users/${car.driver?.id}`}
                                            className={`${styleSheet.textStyles.LINK_NO_DECORATION}`}
                                        >
                                            {`${car.driver?.first_name} ${car.driver?.last_name}`},
                                        </Link>
                                    )
                                : "Не призначено"}
                        </p>
                    </div>
                </div>

                <div className={styleSheet.containerStyles.ROW}>
                    <Link
                        to={`/admin/cars/${car.id}/edit`}
                        className={styleSheet.inputStyles.BUTTON_WARNING}
                    >
                        Редагувати
                    </Link>

                    <Link
                        to={`/admin/cars/${car.id}/delete`}
                        className={styleSheet.inputStyles.BUTTON_DANGER}
                    >
                        Видалити
                    </Link>
                </div>
            </section>
        </AdminLayout>
    );
}
