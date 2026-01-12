import React from "react";

import { DefaultLayout } from "@/components/layout/DefaultLayout";
import AddFundsForm from "@/components/forms/authorized/AddFundsForm";

import { useAddFunds } from "@/hooks/useClients";
import type { AddFunds } from "@/types/authorized";

import { styleSheet } from "@/styles/Form";

export default function AddFundsPage(): React.ReactElement {
    const { mutate, loading, error } = useAddFunds();

    return (
        <DefaultLayout>
            <section className={styleSheet.contentStyles.SECTION_NARROW}>
                <AddFundsForm
                    submitHandler={(form: AddFunds): void => {
                        mutate(form);
                    }}
                />
            </section>
        </DefaultLayout>
    );
}
