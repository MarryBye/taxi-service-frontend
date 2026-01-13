import React from "react";
import { useNavigate } from "react-router-dom";

import { DefaultLayout } from "@/components/layout/DefaultLayout";
import { useMakeOrder } from "@/hooks/useClients";
import MakeOrderForm from "@/components/forms/authorized/MakeOrderForm";
import type { MakeOrderSchema } from "@/types/authorized";
import { styleSheet } from "@/styles/Form";

export default function MakeOrderPage(): React.ReactElement {
    const navigate = useNavigate();
    const { mutate: makeOrder, loading, error } = useMakeOrder();

    return (
        <DefaultLayout>
            {error && (
                <p
                    className={styleSheet.emphasisStyles.BOX_WARNING}
                >{error.response.data.detail}</p>
            )}
            <section className={styleSheet.contentStyles.SECTION}>
                <MakeOrderForm
                    submitHandler={
                        (form: MakeOrderSchema): void => {
                            makeOrder(form).then((result) => {
                                if (result) {
                                    navigate("/orders/history");
                                }
                            });
                        }
                    }
                />
            </section>
        </DefaultLayout>
    );
}
