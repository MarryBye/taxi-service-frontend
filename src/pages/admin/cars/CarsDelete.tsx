import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { styleSheet } from "@/styles/Form";

import {
    useCarInfo, useDeleteCar
} from "@/hooks/useAdmin";

import { FaBackward } from "react-icons/fa";
import { LoaderBlock } from "@/components/ui/Loader";

export default function AdminCarDeletePage(): React.ReactElement {
    const navigate = useNavigate();
    const { carId } = useParams<{ carId: string }>();
    const id = carId ? Number(carId) : null;

    const { data: car, loading: carLoading, error: carError } = useCarInfo(id);
    const { mutate: deleteCar, loading: deleteLoading, error: deleteError } = useDeleteCar(id!);

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

    async function handleDelete() {
        await deleteCar().then((result) => {
            if (result) {
                navigate("/admin/cars");
            }
        });
    }

    return (
        <AdminLayout>
            {deleteError && (
                <p
                    className={styleSheet.emphasisStyles.BOX_WARNING}
                >
                    {deleteError.response.data.detail}
                </p>
            )}
            <section
                className={`${styleSheet.contentStyles.SECTION_NARROW} flex flex-col gap-10`}
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
                            Видалення автомобіля
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

                <div className={styleSheet.emphasisStyles.BOX_DANGER}>
                    <p className={styleSheet.textStyles.DEFAULT}>
                        Ви дійсно хочете видалити автомобіль <span className={styleSheet.textStyles.BOLD}>{car!.mark} {car!.model} (ID: {car!.id})</span>?
                    </p>
                    <p className={styleSheet.textStyles.SMALL}>
                        Усі повʼязані дані буде втрачено. Скасувати дію
                        неможливо.
                    </p>
                </div>

                <div className={styleSheet.containerStyles.ROW}>
                    <Link
                        to={`/admin/cars/${car!.id}`}
                        className={styleSheet.inputStyles.BUTTON_SECONDARY}
                    >
                        Скасувати
                    </Link>

                    <button
                        onClick={handleDelete}
                        disabled={deleteLoading}
                        className={deleteLoading ? (`${styleSheet.inputStyles.BUTTON_PRIMARY}`) : (`${styleSheet.inputStyles.BUTTON_DANGER}`)}
                    >
                        {
                            deleteLoading ? ("Будь ласка, почекайте...") : ("Видалити")
                        }
                    </button>
                </div>
            </section>
        </AdminLayout>
    );
}
