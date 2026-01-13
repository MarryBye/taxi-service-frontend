import React from "react";

import { DefaultLayout } from "@/components/layout/DefaultLayout";
import WithdrawCashForm from "@/components/forms/workers/WithdrawCashForm";

import { useWithdrawCash } from "@/hooks/useDrivers";
import type { WithdrawCashSchema } from "@/types/workers";

import { styleSheet } from "@/styles/Form";
import {useNavigate} from "react-router-dom";

export default function WithdrawCashPage(): React.ReactElement {
    const { mutate, loading, error } = useWithdrawCash();
    const navigate = useNavigate();

    return (
        <DefaultLayout>
            {error && (
                <p
                    className={styleSheet.emphasisStyles.BOX_WARNING}
                >{error.response.data.detail}</p>
            )}
            <section className={styleSheet.contentStyles.SECTION_NARROW}>
                <WithdrawCashForm
                    submitHandler={(form: WithdrawCashSchema): void => {
                        mutate(form).then((result) => {
                            if (result) {
                                navigate("/driver");
                            }
                        });
                    }}
                />
            </section>
        </DefaultLayout>
    );
}
