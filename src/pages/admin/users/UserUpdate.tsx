import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";

import { TEXT } from "@/styles/Text";
import { BUTTON } from "@/styles/Button";

import {
    useUpdateUser,
} from "@/hooks/useAdmin";

import type { UpdateUserSchema } from "@/types/admin";
import UpdateUserForm from "@/components/forms/admin/UpdateUserForm";

export default function AdminUserUpdatePage(): React.ReactElement {
    const navigate = useNavigate();
    const { userId } = useParams<{ userId: string }>();
    const id = userId ? Number(userId) : null;

    const {
        mutate: updateUser,
        loading: updateLoading,
        error: updateError,
    } = useUpdateUser(id!);

    return (
        <AdminLayout>
            <section className="max-w-xl mx-auto px-8 py-16 flex flex-col gap-8">
                <UpdateUserForm
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
                        }
                    }
                />
            </section>
        </AdminLayout>
    );
}
