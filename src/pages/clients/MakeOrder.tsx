import React from "react";
import { useNavigate } from "react-router-dom";

import { DefaultLayout } from "@/components/layout/DefaultLayout";
import { useMakeOrder } from "@/hooks/useClients";
import MakeOrderForm from "@/components/forms/authorized/MakeOrderForm";
import type {MakeOrderSchema} from "@/types/authorized";

export default function MakeOrderPage(): React.ReactElement {
    const navigate = useNavigate();
    const { mutate: makeOrder, loading, error } = useMakeOrder();

    return (
        <DefaultLayout>
            <section className="max-w-3xl mx-auto px-8 py-16">
                <MakeOrderForm
                    submitHandler={
                        (form: MakeOrderSchema): void => {
                            makeOrder(form);
                        }
                    }
                />
            </section>
        </DefaultLayout>
    );
}