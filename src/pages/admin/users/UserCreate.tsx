import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { AdminLayout } from "@/components/layout/AdminLayout";

import { TEXT } from "@/styles/Text";
import { BUTTON } from "@/styles/Button";

import { useCreateUser } from "@/hooks/useAdmin";
import type { CreateUserSchema } from "@/types/admin";
import CreateUserForm from "@/components/forms/admin/CreateUserForm";

export default function AdminUserCreatePage(): React.ReactElement {
    const navigate = useNavigate();
    const { mutate: createUser, loading, error } = useCreateUser();



    return (
        <AdminLayout>
            <section className="max-w-xl mx-auto px-8 py-16 flex flex-col gap-8">
                <CreateUserForm
                    submitHandler={
                        (form: CreateUserSchema) => {
                            const {
                                login,
                                password,
                                first_name,
                                last_name,
                                email,
                                tel_number,
                                city_id,
                                role
                            } = form;
                            createUser({
                                login,
                                password,
                                first_name,
                                last_name,
                                email,
                                tel_number,
                                city_id,
                                role
                            });
                        }
                    }
                />
            </section>
        </AdminLayout>
    );
}
