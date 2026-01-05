import React from "react";
import { useNavigate } from "react-router-dom";

import { DefaultLayout } from "@/components/layout/DefaultLayout";
import RegisterForm from "@/components/forms/authorized/RegisterForm";
import { useAuth } from "@/hooks/useAuth";
import type {RegisterSchema} from "@/types/auth";

export default function RegisterPage(): React.ReactElement {
    const navigate = useNavigate();
    const auth = useAuth();

    return (
        <DefaultLayout>
            <section className="max-w-lg mx-auto px-8 py-20">
                <RegisterForm
                    submitHandler={
                        (form: RegisterSchema): void => {
                            const {login, password, first_name, last_name, email, tel_number, city_id} = form;
                            auth.register({
                                login, password, first_name, last_name, email, tel_number, city_id
                            });
                        }
                    }
                />
            </section>
        </DefaultLayout>
    );
}
