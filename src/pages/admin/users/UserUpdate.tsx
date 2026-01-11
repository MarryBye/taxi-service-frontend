import React from "react";
import {useParams, useNavigate, Link} from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { styleSheet } from "@/styles/Form";

import {
    useClientStats, useDriverStats,
    useUpdateUser, useUserInfo,
} from "@/hooks/useAdmin";

import type { UpdateUserSchema } from "@/types/admin";
import UpdateUserForm from "@/components/forms/admin/UpdateUserForm";
import {FaBackward} from "react-icons/fa";
import {LoaderBlock} from "@/components/ui/Loader";

export default function AdminUserUpdatePage(): React.ReactElement {
    const navigate = useNavigate();
    const { userId } = useParams<{ userId: string }>();
    const id = userId ? Number(userId) : null;

    const {mutate: updateUser,
        loading: updateLoading,
        error: updateError,
    } = useUpdateUser(id!);

    const { data: user, loading: userLoading, error: userError } = useUserInfo(id);

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
                            Користувачі
                        </h1>

                        <p className={styleSheet.textStyles.SMALL}>
                            Оновлення користувача
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

                <UpdateUserForm
                    startValues={user!}
                    submitHandler={
                        (form: UpdateUserSchema) => {
                            const {
                                first_name,
                                last_name,
                                email,
                                tel_number,
                                city_id,
                                password,
                                role
                            } = form;
                            updateUser({
                                first_name,
                                last_name,
                                email,
                                tel_number,
                                city_id,
                                password,
                                role
                            });
                            navigate('/admin/users')
                        }
                    }
                />
            </section>
        </AdminLayout>
    );
}
