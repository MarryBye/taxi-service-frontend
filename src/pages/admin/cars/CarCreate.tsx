import React from "react";
import {Link, useNavigate} from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { styleSheet } from "@/styles/Form";
import { FaBackward } from "react-icons/fa";

import { useCreateCar } from "@/hooks/useAdmin";
import type { CreateCarSchema } from "@/types/admin";
import CreateCarForm from "@/components/forms/admin/CreateCarForm";

export default function AdminCarCreatePage(): React.ReactElement {
    const navigate = useNavigate();
    const { mutate: createCar, loading, error } = useCreateCar();

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
                            Автомобілі
                        </h1>

                        <p className={styleSheet.textStyles.SMALL}>
                            Створення автомобіля
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

                <CreateCarForm
                    submitHandler={(form: CreateCarSchema) => {
                        const {
                            mark,
                            model,
                            number_plate,
                            city_id,
                            color,
                            car_class,
                            car_status,
                            driver_id
                        } = form;

                        createCar({
                            mark,
                            model,
                            number_plate,
                            city_id,
                            color,
                            car_class,
                            car_status,
                            driver_id
                        });

                        navigate("/admin/cars");
                    }}
                />
            </section>
        </AdminLayout>
    );
}
