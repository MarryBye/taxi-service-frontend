import React from "react";
import {useParams, useNavigate, Link} from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { styleSheet } from "@/styles/Form";

import {
    useUpdateMaintenance, useMaintenanceInfo
} from "@/hooks/useAdmin";

import type { UpdateMaintenanceSchema } from "@/types/admin";
import UpdateMaintenanceForm from "@/components/forms/admin/UpdateMaintenanceForm";
import {FaBackward} from "react-icons/fa";
import {LoaderBlock} from "@/components/ui/Loader";

export default function AdminMaintenanceUpdatePage(): React.ReactElement {
    const navigate = useNavigate();
    const { maintenanceId } = useParams<{ maintenanceId: string }>();
    const id = maintenanceId ? Number(maintenanceId) : null;

    const {mutate: updateMaintenance,
        loading: updateLoading,
        error: updateError,
    } = useUpdateMaintenance(id!);

    const { data: maintenance, loading: maintenanceLoading, error: maintenanceError } = useMaintenanceInfo(id);

    if (maintenanceLoading) {
        return (
            <AdminLayout>
                <LoaderBlock />
            </AdminLayout>
        );
    }

    if (maintenanceError) {
        return (
            <AdminLayout>
                <div className={styleSheet.emphasisStyles.BOX_DANGER}>
                    Помилка завантаження обслуговування
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
                            Обслуговування
                        </h1>

                        <p className={styleSheet.textStyles.SMALL}>
                            Оновлення обслуговування
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

                <UpdateMaintenanceForm
                    startValues={maintenance!}
                    submitHandler={
                        (form: UpdateMaintenanceSchema) => {
                            updateMaintenance(form).then((result) => {
                                if (result) {
                                    navigate("/admin/maintenances");
                                }
                            });
                        }
                    }
                />
            </section>
        </AdminLayout>
    );
}
