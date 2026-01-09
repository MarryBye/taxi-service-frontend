import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { DefaultLayout } from "@/components/layout/DefaultLayout";
import { useUpdateProfile } from "@/hooks/useClients";
import UpdateProfileForm from "@/components/forms/authorized/UpdateProfile";
import type { UpdateProfile } from "@/types/authorized";

import { styleSheet } from "@/styles/Form";

export default function UpdateProfilePage(): React.ReactElement {
    const navigate = useNavigate();
    const { mutate, loading, error } = useUpdateProfile();

    return (
        <DefaultLayout>
            <section className={styleSheet.contentStyles.SECTION_NARROW}>
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
