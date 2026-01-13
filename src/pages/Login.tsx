import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

import { DefaultLayout } from "@/components/layout/DefaultLayout";
import LoginForm from "@/components/forms/authorized/LoginForm";
import type {LoginSchema} from "@/types/auth";
import {styleSheet} from "@/styles/Form";

export default function LoginPage(): React.ReactElement {
    const navigate = useNavigate();
    const { login, loginError } = useAuth();

    return (
        <DefaultLayout>
            {loginError && (
                <p
                    className={styleSheet.emphasisStyles.BOX_WARNING}
                >{loginError.response.data.detail}</p>
            )}
            <section className="max-w-md mx-auto px-8 py-20">
                <LoginForm
                    submitHandler={
                        (form: LoginSchema) => {
                            login(form);
                        }
                    }
                />
            </section>
        </DefaultLayout>
    );
}
