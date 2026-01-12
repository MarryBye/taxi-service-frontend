import React from "react";

import { DefaultLayout } from "@/components/layout/DefaultLayout";
import WithdrawCashForm from "@/components/forms/workers/WithdrawCashForm";

import { useWithdrawCash } from "@/hooks/useDrivers";
import type { WithdrawCashSchema } from "@/types/workers";

import { styleSheet } from "@/styles/Form";

export default function WithdrawCashPage(): React.ReactElement {
    const { mutate, loading, error } = useWithdrawCash();

    return (
        <DefaultLayout>
            <section className={styleSheet.contentStyles.SECTION_NARROW}>
                <WithdrawCashForm
                    submitHandler={(form: WithdrawCashSchema): void => {
                        mutate(form);
                    }}
                />
            </section>
        </DefaultLayout>
    );
}
