import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";

import { TEXT } from "@/styles/Text";
import { BUTTON } from "@/styles/Button";

import { useCreateCar } from "@/hooks/useAdmin";
import CreateCarForm from "@/components/forms/admin/CreateCarForm";
import type {CreateCarSchema} from "@/types/admin";

export default function AdminCarCreatePage(): React.ReactElement {
    const navigate = useNavigate();
    const { mutate: createCar, loading, error } = useCreateCar();

    return (
        <AdminLayout>
            <section className="max-w-2xl flex flex-col gap-8">
                <CreateCarForm
                    submitHandler={
                        (form: CreateCarSchema): void => {
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
                        }
                    }
                />
            </section>
        </AdminLayout>
    );
}
