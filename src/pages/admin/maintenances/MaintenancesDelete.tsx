import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { styleSheet } from "@/styles/Form";

import {
    useMaintenanceInfo, useDeleteMaintenance,
} from "@/hooks/useAdmin";

import { FaBackward } from "react-icons/fa";
import { LoaderBlock } from "@/components/ui/Loader";

export default function AdminMaintenanceDeletePage(): React.ReactElement {
    const navigate = useNavigate();
    const { maintenanceId } = useParams<{ maintenanceId: string }>();
    const id = maintenanceId ? Number(maintenanceId) : null;

    const { data: maintenance, loading: maintenanceLoading, error: maintenanceError } = useMaintenanceInfo(id);
    const { mutate: deleteMaintenance, loading: deleteLoading, error: deleteError } = useDeleteMaintenance(id!);

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

    async function handleDelete() {
        await deleteMaintenance().then((result) => {
            if (result) {
                navigate("/admin/maintenances");
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
                            Обслуговування
                        </h1>

                        <p className={styleSheet.textStyles.SMALL}>
                            Видалення обслуговування
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

                <div className={styleSheet.emphasisStyles.BOX_DANGER}>
                    <p className={styleSheet.textStyles.DEFAULT}>
                        Ви дійсно хочете видалити обслуговування <span className={styleSheet.textStyles.BOLD}>{maintenance?.car.mark} {maintenance?.car.model} (ID: {maintenance?.id})</span>?
                    </p>
                    <p className={styleSheet.textStyles.SMALL}>
                        Усі повʼязані дані буде втрачено. Скасувати дію
                        неможливо.
                    </p>
                </div>

                <div className={styleSheet.containerStyles.ROW}>
                    <Link
                        to={`/admin/maintenances/${maintenance?.id}`}
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
