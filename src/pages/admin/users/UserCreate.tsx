import React from "react";
import {Link, useNavigate} from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { styleSheet } from "@/styles/Form";
import { FaBackward } from "react-icons/fa";

import { useCreateUser } from "@/hooks/useAdmin";
import type { CreateUserSchema } from "@/types/admin";
import CreateUserForm from "@/components/forms/admin/CreateUserForm";

export default function AdminUserCreatePage(): React.ReactElement {
    const navigate = useNavigate();
    const { mutate: createUser, loading, error } = useCreateUser();

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
                            Користувачі
                        </h1>

                        <p className={styleSheet.textStyles.SMALL}>
                            Створення користувача
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

                <CreateUserForm
                    submitHandler={(form: CreateUserSchema) => {
                        const {
                            login,
                            password,
                            first_name,
                            last_name,
                            email,
                            tel_number,
                            city_id,
                            role,
                        } = form;

                        createUser({
                            login,
                            password,
                            first_name,
                            last_name,
                            email,
                            tel_number,
                            city_id,
                            role,
                        }).then((result) => {
                            if (result) {
                                navigate("/admin/users");
                            }
                        });
                    }}
                />
            </section>
        </AdminLayout>
    );
}
