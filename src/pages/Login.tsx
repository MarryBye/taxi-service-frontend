import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

import { DefaultLayout } from "@/components/layout/DefaultLayout";
import LoginForm from "@/components/forms/authorized/LoginForm";
import type {LoginSchema} from "@/types/auth";

export default function LoginPage(): React.ReactElement {
    const navigate = useNavigate();
    const auth = useAuth();


    return (
        <DefaultLayout>
            <section className="max-w-md mx-auto px-8 py-20">
                <LoginForm
                    submitHandler={
                        (form: LoginSchema) => {
                            auth.login(form);
                        }
                    }
                />
            </section>
        </DefaultLayout>
    );
}
