import React from "react";
import {useParams, useNavigate, Link} from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { styleSheet } from "@/styles/Form";

import {
    useUpdateCar, useCarInfo
} from "@/hooks/useAdmin";

import type { UpdateCarSchema } from "@/types/admin";
import UpdateCarForm from "@/components/forms/admin/UpdateCarForm";
import {FaBackward} from "react-icons/fa";
import {LoaderBlock} from "@/components/ui/Loader";

export default function AdminCarUpdatePage(): React.ReactElement {
    const navigate = useNavigate();
    const { carId } = useParams<{ carId: string }>();
    const id = carId ? Number(carId) : null;

    const {mutate: updateCar,
        loading: updateLoading,
        error: updateError,
    } = useUpdateCar(id!);

    const { data: car, loading: carLoading, error: carError } = useCarInfo(id);

    if (carLoading) {
        return (
            <AdminLayout>
                <LoaderBlock />
            </AdminLayout>
        );
    }

    if (carError) {
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
            {updateError && (
                <p
                    className={styleSheet.emphasisStyles.BOX_WARNING}
                >
                    {updateError.response.data.detail}
                </p>
            )}
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
                            Автомобілі
                        </h1>

                        <p className={styleSheet.textStyles.SMALL}>
                            Оновлення автомобіля
                        </p>
                    </div>

                    <Link
                        to="/admin/cars"
                        className={styleSheet.inputStyles.BUTTON_SECONDARY}
                    >
                        <div className={styleSheet.containerStyles.ROW_SMALL_GAP}>
                            <FaBackward/> Повернутись
                        </div>
                    </Link>
                </div>

                <UpdateCarForm
                    startValues={car!}
                    submitHandler={
                        (form: UpdateCarSchema) => {
                            const {
                                mark, model, number_plate, city_id, color, car_class, car_status, driver_id
                            } = form;
                            updateCar({
                                mark, model, number_plate, city_id, color, car_class, car_status, driver_id
                            }).then((result) => {
                                if (result) {
                                    navigate("/admin/cars");
                                }
                            });
                        }
                    }
                />
            </section>
        </AdminLayout>
    );
}
