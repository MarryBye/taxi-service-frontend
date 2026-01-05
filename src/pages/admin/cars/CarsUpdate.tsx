import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";

import { TEXT } from "@/styles/Text";
import { BUTTON } from "@/styles/Button";

import { useUpdateCar } from "@/hooks/useAdmin";
import UpdateCarForm from "@/components/forms/admin/UpdateCarForm";
import type {UpdateCarSchema} from "@/types/admin";

export default function AdminCarUpdatePage(): React.ReactElement {
    const navigate = useNavigate();
    const { carId } = useParams<{ carId: string }>();
    const id = carId ? Number(carId) : null;

    const { mutate: updateCar, loading, error } = useUpdateCar(id);



    return (
        <AdminLayout>
            <section className="max-w-xl flex flex-col gap-8">
                <UpdateCarForm
                    submitHandler={
                        (form: UpdateCarSchema): void => {
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
                            updateCar({
                                mark,
                                model,
                                number_plate,
                                city_id,
                                color,
                                car_class,
                                car_status,
                                driver_id,
                            });
                        }
                    }
                />
            </section>
        </AdminLayout>
    );
}
