import React from "react";
import {Link, useNavigate} from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { styleSheet } from "@/styles/Form";
import { FaBackward } from "react-icons/fa";

import { useCreateMaintenance } from "@/hooks/useAdmin";
import type { CreateMaintenanceSchema } from "@/types/admin";
import CreateMaintenanceForm from "@/components/forms/admin/CreateMaintenanceForm";

export default function AdminMaintenanceCreatePage(): React.ReactElement {
    const navigate = useNavigate();
    const { mutate: createMaintenance, loading, error } = useCreateMaintenance();

    return (
        <AdminLayout>
            {error && (
                <p
                    className={styleSheet.emphasisStyles.BOX_WARNING}
                >
                    {error.response.data.detail}
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
                            Обслуговування
                        </h1>

                        <p className={styleSheet.textStyles.SMALL}>
                            Створення обслуговування
                        </p>
                    </div>

                    <Link
                        to="/admin/maintenances"
                        className={styleSheet.inputStyles.BUTTON_SECONDARY}
                    >
                        <div className={styleSheet.containerStyles.ROW_SMALL_GAP}>
                            <FaBackward/> Повернутись
                        </div>
                    </Link>
                </div>

                <CreateMaintenanceForm
                    submitHandler={(form: CreateMaintenanceSchema) => {
                        createMaintenance(form).then((result) => {
                            if (result) {
                                navigate("/admin/maintenances");
                            }
                        });
                    }}
                />
            </section>
        </AdminLayout>
    );
}
