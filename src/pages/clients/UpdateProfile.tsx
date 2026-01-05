import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { DefaultLayout } from "@/components/layout/DefaultLayout";
import { useUpdateProfile } from "@/hooks/useClients";
import UpdateProfileForm from "@/components/forms/authorized/UpdateProfile";
import type {UpdateProfile} from "@/types/authorized";

export default function UpdateProfilePage(): React.ReactElement {
    const navigate = useNavigate();
    const { mutate, loading, error } = useUpdateProfile();

    return (
        <DefaultLayout>
            <section className="max-w-lg mx-auto px-8 py-20">
                <UpdateProfileForm
                    submitHandler={
                        (form: UpdateProfile): void => {
                            mutate(form);
                        }
                    }
                />
            </section>
        </DefaultLayout>
    );
}
