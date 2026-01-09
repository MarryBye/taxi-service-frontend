import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { styleSheet } from "@/styles/Form";

import {
    useUserInfo,
    useDeleteUser,
} from "@/hooks/useAdmin";

import { FaBackward } from "react-icons/fa";
import { LoaderBlock } from "@/components/ui/Loader";

export default function AdminUserDeletePage(): React.ReactElement {
    const navigate = useNavigate();
    const { userId } = useParams<{ userId: string }>();
    const id = userId ? Number(userId) : null;

    const { data: user, loading: userLoading, error: userError } = useUserInfo(id);
    const { mutate: deleteUser, loading: deleteLoading } = useDeleteUser(id!);

    if (userLoading) {
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

    async function handleDelete() {
        await deleteUser();
        navigate("/admin/users");
    }

    return (
        <AdminLayout>
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
                            Користувачі
                        </h1>

                        <p className={styleSheet.textStyles.SMALL}>
                            Видалення користувача
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

                <div className={styleSheet.emphasisStyles.BOX_DANGER}>
                    <p className={styleSheet.textStyles.DEFAULT}>
                        Ви дійсно хочете видалити користувача <span className={styleSheet.textStyles.BOLD}>{user!.first_name} {user!.last_name} (ID: {user!.id})</span>?
                    </p>
                    <p className={styleSheet.textStyles.SMALL}>
                        Усі повʼязані дані буде втрачено. Скасувати дію
                        неможливо.
                    </p>
                </div>

                <div className={styleSheet.containerStyles.ROW}>
                    <Link
                        to={`/admin/users/${user!.id}`}
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
