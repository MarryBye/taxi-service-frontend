import React from "react";

import { DefaultLayout } from "@/components/layout/DefaultLayout";
import AddFundsForm from "@/components/forms/authorized/AddFundsForm";

import { useAddFunds } from "@/hooks/useClients";
import type { AddFunds } from "@/types/authorized";

import { styleSheet } from "@/styles/Form";
import {useNavigate} from "react-router-dom";

export default function AddFundsPage(): React.ReactElement {
    const { mutate, loading, error } = useAddFunds();
    const navigate = useNavigate();

    return (
        <DefaultLayout>
            {error && (
                <p
                    className={styleSheet.emphasisStyles.BOX_WARNING}
                >{error.response.data.detail}</p>
            )}
            <section className={styleSheet.contentStyles.SECTION_NARROW}>
                <AddFundsForm
                    submitHandler={(form: AddFunds): void => {
                        mutate(form).then((result) => {
                            if (result) {
                                navigate("/profile");
                            }
                        });
                    }}
                />
            </section>
        </DefaultLayout>
    );
}
